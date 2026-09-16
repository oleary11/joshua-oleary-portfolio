// Vercel serverless function. Holds the GitHub token server-side only
// (read from process.env.GITHUB_TOKEN, never a VITE_-prefixed var, so it's
// never bundled into client code) and exposes just the two numbers the
// public REST API can't provide for anyone without authentication: private
// repo count and true lifetime total commits.

const GITHUB_USERNAME = "oleary11";

async function githubGraphQL(query, token) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": GITHUB_USERNAME,
    },
    body: JSON.stringify({ query }),
  });
  if (!res.ok) throw new Error(`GitHub GraphQL request failed: ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(json.errors.map((e) => e.message).join("; "));
  return json.data;
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "public, max-age=3600, stale-while-revalidate=86400");

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return res.status(200).json({ privateRepos: null, totalCommits: null });
  }

  try {
    const base = await githubGraphQL(
      `query {
        viewer {
          createdAt
          repositories(privacy: PRIVATE) {
            totalCount
          }
        }
      }`,
      token
    );

    const privateRepos = base.viewer.repositories.totalCount;
    const startYear = new Date(base.viewer.createdAt).getUTCFullYear();
    const currentYear = new Date().getUTCFullYear();

    // contributionsCollection is capped at a 1-year span per call, so query
    // one aliased sub-field per calendar year in a single request and sum.
    const yearAliases = [];
    for (let year = startYear; year <= currentYear; year++) {
      yearAliases.push(
        `y${year}: contributionsCollection(from: "${year}-01-01T00:00:00Z", to: "${year}-12-31T23:59:59Z") { totalCommitContributions }`
      );
    }

    const commitsData = await githubGraphQL(`query { viewer { ${yearAliases.join("\n")} } }`, token);

    const totalCommits = Object.values(commitsData.viewer).reduce(
      (sum, year) => sum + (year?.totalCommitContributions ?? 0),
      0
    );

    return res.status(200).json({ privateRepos, totalCommits });
  } catch (err) {
    console.error("api/github-stats error:", err.message);
    return res.status(200).json({ privateRepos: null, totalCommits: null });
  }
}
