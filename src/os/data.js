// Content for the desktop + phone "OS" portfolio. Both layouts read from here.

export const GITHUB_USERNAME = "oleary11";
export const EMAIL = "contact@olearyhouse.com";
export const LINKEDIN = "https://www.linkedin.com/in/joshua-oleary/";

export const bio = {
  greeting: "Hey, I'm Josh.",
  tagline: "I build things people use.",
  line: "Software engineer and founder of OLeary Software, based in Phoenix, Arizona.",
  paragraphs: [
    "I'm a software engineer who likes shipping whole products: the mobile app, the web dashboard, the backend and the boring-but-important parts like payments, auth and offline sync.",
    "By day I work on a K-12 platform used by schools across the country. Before that I was a network engineer, and before that I spent nine years in restaurants at Chick-fil-A, which is exactly why I ended up building Platrly.",
    "On the side I run OLeary Software, where I build software, websites and automations for small businesses.",
  ],
};

export const featured = [
  {
    id: "platrly",
    name: "Platrly",
    icon: "/os/projects/platrly-icon.png",
    tint: "#1c1c1e",
    kind: "Mobile app + web dashboard",
    tagline: "Restaurant checklists teams actually complete.",
    image: "/os/projects/platrly.webp",
    imageAlt: "Platrly on a laptop dashboard, an iPad kiosk and an iPhone",
    link: { label: "Visit platrly.com", href: "https://www.platrly.com" },
    stack: ["React Native", "Expo", "TypeScript", "Supabase", "Next.js"],
    problem:
      "Restaurant managers run opening, prep and closing checklists on paper. Tasks get skipped, nobody knows who did what, and there's no record when something goes wrong.",
    built: [
      "Shared iPad kiosk where team members clock in with an employee ID",
      "Timed checklists with photo proof, notes and overdue alerts",
      "iPhone and Android app plus a web dashboard for owners",
      "Completion analytics and full history across locations",
      "Import a whole team from a Chick-fil-A PIN report",
    ],
    note: "Built for a Chick-fil-A franchise, where I spent nine years before becoming an engineer.",
  },
  {
    id: "pinpassport",
    name: "Pin Passport",
    icon: "/os/projects/pinpassport-icon.webp",
    tint: "#f3efe6",
    kind: "Golf app for iOS, Android & web",
    tagline: "Every round, stamped.",
    image: "/os/projects/pinpassport-site.png",
    imageAlt: "The Pin Passport website with app screens",
    link: { label: "Visit getpinpassport.com", href: "https://getpinpassport.com" },
    stack: ["React Native", "TypeScript", "Supabase", "Google Maps API"],
    problem:
      "Golfers who travel want a record of every course they've played, and a reason to chase the next one.",
    built: [
      "Log a course and it becomes a stamped visa in your passport",
      "World map of played and dream courses across 32,000+ courses",
      "Friends and world leaderboards in the Clubhouse",
      "GPS check-in so a round only counts if you were really there",
      "The marketing site, brand and stamp artwork",
    ],
  },
  {
    id: "tally",
    name: "Tally",
    icon: "/os/projects/tally-icon.png",
    tint: "#f5f0e8",
    kind: "AI mobile app for iPhone",
    tagline: "Home inventory from a single photo.",
    image: "/os/projects/tally-icon.png",
    imageAlt: "Tally app icon",
    link: { label: "View on the App Store", href: "https://apps.apple.com/us/app/tally-ai-home-inventory/id6795659913" },
    stack: ["React Native", "TypeScript", "Express", "Supabase", "Vision AI", "RevenueCat"],
    problem:
      "Nobody keeps a home inventory until they need one for an insurance claim, and by then it's too late.",
    built: [
      "Scan a room and identify multiple items from one photo",
      "Estimated replacement values and receipts as proof of value",
      "Insurer-ready PDF and CSV reports",
      "Express API with Supabase auth, row-level security and rate-limited AI calls",
      "In-app purchases with RevenueCat",
    ],
    note: "Built for a client; live on the App Store.",
  },
  {
    id: "dcw",
    name: "Desert Candle Works",
    icon: "/os/projects/dcw-icon.png",
    tint: "#f6ece2",
    kind: "E-commerce store + back office",
    tagline: "A full online store for a Scottsdale candle maker.",
    image: "/os/projects/dcw.png",
    imageAlt: "The Desert Candle Works online store",
    link: { label: "Visit desertcandleworks.com", href: "https://desertcandleworks.com" },
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Square", "Resend"],
    problem:
      "A small candle business needed to sell online and in person without two separate inventories to keep in sync.",
    built: [
      "Product catalog with scent and wick options, cart and Stripe checkout",
      "Square POS connected, so in-person sales update the same stock",
      "Customer accounts with order history",
      "Admin dashboard for orders, refunds, promotions, reviews and shipping labels",
      "Sales analytics and transactional email",
    ],
  },
  {
    id: "olearysoftware",
    name: "OLeary Software",
    icon: "/os/projects/ols-icon.svg",
    tint: "#15241d",
    kind: "My software consultancy",
    tagline: "I find what's costing a business time and money, then build the fix.",
    image: "/os/projects/olearysoftware.png",
    imageAlt: "The OLeary Software website",
    link: { label: "Visit olearysoftware.com", href: "https://www.olearysoftware.com" },
    stack: ["Next.js", "TypeScript", "Tailwind", "Resend"],
    problem:
      "Small businesses lose hours to manual work and outdated software but don't know where to start.",
    built: [
      "AI readiness audits, automation and custom software for small businesses",
      "Websites and local SEO for clients like Idaho Stump Grinders",
      "The company site, brand and logo",
    ],
  },
];
