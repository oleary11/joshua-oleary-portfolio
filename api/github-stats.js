// Vercel serverless function. Holds the GitHub token server-side only
// (read from process.env.GITHUB_TOKEN, never a VITE_-prefixed var, so it's
// never bundled into client code) and exposes two numbers the public REST
// API can't provide for anyone without authentication: true total repo
// count (public + private combined) and commits in the past year.

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
    return res.status(200).json({ totalRepos: null, commitsPastYear: null });
  }

  try {
    const now = new Date();
    const oneYearAgo = new Date(now);
    oneYearAgo.setUTCFullYear(now.getUTCFullYear() - 1);

    const data = await githubGraphQL(
      `query {
        viewer {
          repositories(ownerAffiliations: OWNER) {
            totalCount
          }
          contributionsCollection(from: "${oneYearAgo.toISOString()}", to: "${now.toISOString()}") {
            totalCommitContributions
          }
        }
      }`,
      token
    );

    const totalRepos = data.viewer.repositories.totalCount;
    const commitsPastYear = data.viewer.contributionsCollection.totalCommitContributions;

    return res.status(200).json({ totalRepos, commitsPastYear });
  } catch (err) {
    console.error("api/github-stats error:", err.message);
    return res.status(200).json({ totalRepos: null, commitsPastYear: null });
  }
}
