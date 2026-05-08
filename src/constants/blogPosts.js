const blogPosts = [
  {
    slug: "osint-for-physical-social-engineers",
    title: "OSINT for Physical Social Engineers",
    subtitle: "Know Before You Go",
    date: "May 6, 2026",
    category: "Reconnaissance",
    readTime: "6 min read",
    tags: ["OSINT", "Reconnaissance", "Physical Security"],
    excerpt:
      "Before you ever set foot on a target's property, open-source intelligence can tell you everything from building layouts to employee schedules. Here's how to build a complete operational picture before a physical engagement.",
    content: [
      {
        type: "p",
        text: "Physical social engineering engagements live or die in the reconnaissance phase. The more you know before you walk through that door, the more confident and convincing you'll be when it counts. OSINT — open-source intelligence — is the discipline of gathering actionable information from publicly available sources, and for physical red teamers, it's an indispensable part of the toolkit.",
      },
      {
        type: "h2",
        text: "LinkedIn: Your Org Chart Generator",
      },
      {
        type: "p",
        text: "LinkedIn is a goldmine. A few targeted searches against a company's employee directory can reveal department structures, reporting chains, and the names of key personnel you might want to impersonate or reference in a pretext. IT managers, facilities leads, and executive assistants are particularly valuable targets — they're the people most likely to have building access or be asked to verify visitors.",
      },
      {
        type: "p",
        text: "Pay attention to badge photos in profile pictures, especially on LinkedIn Premium where images are higher resolution. Company lanyards, access card colors, and even building lobby backgrounds visible in headshots have helped red teamers replicate the right look before an engagement.",
      },
      {
        type: "h2",
        text: "Job Postings Reveal More Than You'd Think",
      },
      {
        type: "p",
        text: "A company's open job listings are a surprisingly detailed window into their internal infrastructure. A posting for a 'Facilities Coordinator' mentions the building management system they use. A 'SOC Analyst' listing names their SIEM platform. An IT Support role specifies their ticketing system and endpoint management tools. All of this feeds your pretext — 'I'm from [vendor], here to service your [named system]' is far more convincing than a generic cover story.",
      },
      {
        type: "h2",
        text: "Google Maps and Street View",
      },
      {
        type: "p",
        text: "Never walk up to a building for the first time on the day of an engagement. Google Maps Street View lets you do a dry run remotely — identify entry points, parking lots, smoking areas (often a low-friction tailgate opportunity), loading docks, and the general rhythm of foot traffic. Satellite view gives you the full campus layout. If the building has been photographed recently, you may even be able to see signage, badge readers, or reception desk layouts through glass lobbies.",
      },
      {
        type: "h2",
        text: "Social Media and Employee Posts",
      },
      {
        type: "p",
        text: "Employees post more than they should. Team lunch photos, 'excited to start my new role' selfies in the lobby, and office event photos on Instagram and X can reveal badge design, visitor processes, internal office layouts, and even the dress code. This level of detail is what separates a convincing engagement from an obvious one.",
      },
      {
        type: "h2",
        text: "Putting It All Together",
      },
      {
        type: "p",
        text: "The goal of OSINT isn't to gather data for its own sake — it's to build a story. By the time you arrive on site, you should know the name of the IT manager you're 'coordinating with,' the system you're 'there to service,' what the badge looks like, where the smoking area is, and what time the lobby gets busy. That operational picture is what turns a physical engagement from a gamble into a repeatable methodology.",
      },
    ],
  },
  {
    slug: "the-art-of-the-pretext",
    title: "The Art of the Pretext",
    subtitle: "Crafting Scenarios That Get You Through the Door",
    date: "April 22, 2026",
    category: "Social Engineering",
    readTime: "8 min read",
    tags: ["Social Engineering", "Pretext", "Red Team"],
    excerpt:
      "A convincing pretext is the difference between walking right in and getting escorted out. This post breaks down the anatomy of a strong pretext and the psychology behind why they work.",
    content: [
      {
        type: "p",
        text: "A pretext is the constructed identity, story, and justification you use to gain access or extract information during a social engineering engagement. It's not lying for its own sake — it's a methodically built narrative that exploits how people naturally respond to authority, urgency, and social proof. Done well, a pretext makes the target feel like helping you is the obvious and correct thing to do.",
      },
      {
        type: "h2",
        text: "The Psychology Behind Why Pretexts Work",
      },
      {
        type: "p",
        text: "Robert Cialdini's principles of influence — authority, social proof, reciprocity, liking, scarcity, and commitment — are the operating manual for any social engineer. Authority is the most powerful lever in a physical context. Someone in a uniform, carrying equipment, and speaking confidently with industry-specific vocabulary triggers an immediate compliance response in most people. We're conditioned to defer to perceived experts.",
      },
      {
        type: "p",
        text: "Urgency compounds authority. 'I need to get to the server room — the monitoring system just flagged a critical alert' creates time pressure that short-circuits the target's ability to think critically. The more rushed the scenario feels, the less likely someone is to follow proper verification procedures.",
      },
      {
        type: "h2",
        text: "Anatomy of a Strong Pretext",
      },
      {
        type: "p",
        text: "A good pretext has four layers: identity (who you are), affiliation (who you work for), purpose (why you're here), and authorization (who approved it). Each layer needs to be specific enough to be convincing but simple enough that you can deliver it naturally under pressure.",
      },
      {
        type: "ul",
        items: [
          "Identity: Use a real-sounding name, carry a prop ID if the engagement allows it, have a business card ready.",
          "Affiliation: Reference a vendor, contractor, or partner company the target is likely familiar with — ideally one you surfaced during OSINT.",
          "Purpose: Be specific. 'Quarterly maintenance on the UPS units in the server room' beats 'IT work' every time.",
          "Authorization: Name-drop an internal contact. 'Mark from facilities said to check in at the front desk' ties your pretext to a real person and shifts verification responsibility.",
        ],
      },
      {
        type: "h2",
        text: "Common High-Percentage Pretexts",
      },
      {
        type: "p",
        text: "Certain pretexts consistently perform well across industries because they invoke authority archetypes that employees are trained to facilitate, not question. IT support ('I'm here for the scheduled firewall maintenance'), delivery personnel ('I have a time-sensitive delivery that requires a signature from someone in finance'), and third-party contractors ('We're doing the annual fire suppression inspection') all fit this mold. They're normal, expected, and non-threatening.",
      },
      {
        type: "h2",
        text: "Rehearse Until It's Reflexive",
      },
      {
        type: "p",
        text: "The biggest tell in any pretext is hesitation. If someone asks an unexpected question and you pause, break eye contact, or stumble over your answer, the illusion cracks. Rehearse your scenario until you can deliver it in any order, answer follow-up questions naturally, and handle pushback without breaking character. Record yourself. The difference between reading notes and genuine confidence is what separates a good red teamer from a great one.",
      },
    ],
  },
  {
    slug: "tailgating-101",
    title: "Tailgating 101",
    subtitle: "Physical Penetration Testing Fundamentals",
    date: "April 10, 2026",
    category: "Physical Security",
    readTime: "5 min read",
    tags: ["Physical Pentest", "Tailgating", "Access Control"],
    excerpt:
      "Tailgating remains one of the most consistently successful physical penetration techniques — and one of the most underestimated by defenders. Here's a breakdown of the technique, why organizations keep failing to stop it, and what actually works.",
    content: [
      {
        type: "p",
        text: "Ask any physical penetration tester which technique has the highest success rate across engagements and the answer is almost always tailgating. Not sophisticated lock bypass, not cloned access cards — just following someone through a door they held open. It's embarrassingly simple and embarrassingly effective, and understanding why is the first step toward building defenses that actually work.",
      },
      {
        type: "h2",
        text: "Why Tailgating Works",
      },
      {
        type: "p",
        text: "The reason tailgating works isn't technical — it's social. Humans are wired for politeness and aversion to confrontation. Holding a door open for the person behind you is a deeply ingrained social reflex. Challenging someone who looks like they belong — dressed appropriately, carrying equipment, walking with purpose — feels rude and presumptuous. Most employees would rather risk a security breach than create an awkward moment.",
      },
      {
        type: "p",
        text: "This is compounded by diffusion of responsibility. In a busy lobby or parking garage entrance, everyone assumes someone else has verified the unknown person's credentials. No single individual feels personally responsible, so no one acts.",
      },
      {
        type: "h2",
        text: "High-Value Entry Points",
      },
      {
        type: "p",
        text: "Not all entry points are equal. Smoking areas, cafeteria exits propped open for deliveries, and back entrances used by facilities teams are consistently more exploitable than main lobbies. Main entrances often have reception desks and cameras that increase perceived scrutiny. Secondary access points have lower social friction — the employee coming back from a smoke break doesn't expect to see a badge reader, they just want back in.",
      },
      {
        type: "ul",
        items: [
          "Smoking areas: Employees prop doors or hold them for returning colleagues instinctively.",
          "Loading docks: Regular vendor traffic normalizes unknown faces and props.",
          "Cafeteria exits: Busy, high-traffic, and socially awkward to challenge someone carrying food.",
          "Parking garage stairwells: Camera coverage is often sparse and tailgating is especially normalized.",
        ],
      },
      {
        type: "h2",
        text: "What Doesn't Work (and What Does)",
      },
      {
        type: "p",
        text: "Posted security policies don't stop tailgating. Awareness posters in the lobby don't stop tailgating. Access card requirements don't stop tailgating if employees routinely override the friction by holding doors. What does work is a combination of physical controls and genuine security culture — mantrap vestibules, turnstiles that enforce one-person-per-badge, and critically, a culture where challenging unknown individuals is expected and rewarded rather than considered hostile.",
      },
      {
        type: "p",
        text: "The most effective organizations I've encountered during engagements had one thing in common: employees who politely but confidently said 'I don't recognize you — let me get you checked in.' Not confrontational, not aggressive, just normalized. That single behavioral shift closes the tailgating vulnerability more reliably than any technology.",
      },
      {
        type: "h2",
        text: "The Takeaway for Red Teamers",
      },
      {
        type: "p",
        text: "If you're scoping a physical engagement and want a reliable first-access technique, tailgating should be in your playbook. Load up on props that match the environment — a laptop bag, a clipboard, a branded polo if you can source one — dress like you belong, and walk like you own the place. Confidence is the most important prop you carry. The people who get stopped are the ones who look uncertain.",
      },
    ],
  },
];

export default blogPosts;
