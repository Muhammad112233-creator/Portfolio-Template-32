/* ──────────────────────────────────────────────────────────────
   SITE CONTENT
   Everything a visitor reads lives in this one file.
   Change the words here and the whole site follows.
   (The person, studios and quotes below are sample content.)
   ────────────────────────────────────────────────────────────── */

export const person = {
  name: "Zayan Malik",
  initials: "ZM",
  role: "Designer & front-end developer",
  line: "Brand-led websites for hospitality, architecture & culture",
  city: "Lahore",
  country: "Pakistan",
  email: "hello@zayanmalik.studio",
  phone: "+92 300 000 0000",
  availability: "Taking two projects a quarter",
  reply: "A reply within two working days",
  socials: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Instagram", href: "https://www.instagram.com/" },
  ],
};

export const hero = {
  eyebrow: "Catalogue entry · Lahore",
  lines: ["Drawn by hand.", "Built in code."],
  stand:
    "I design and build websites for restaurants, studios and cultural houses that would rather be remembered than merely found. I start with pencil and paper. The code comes after, and it stays fast and calm and easy to look after.",
  callNo: "741.6 MAL",
};

/* I — The Catalogue: what I do, recorded against what it produced */
export const catalogue = [
  {
    call: "001.4",
    subject: "Brand identity carried onto the screen without losing its manners",
    produced: "Two identity systems turned into full websites, type and colour intact",
    note: "Identity → interface",
    year: "2021—",
    vol: 12,
  },
  {
    call: "005.7",
    subject: "Front-end engineering in Next.js, React and plain, honest CSS",
    produced: "Sites that score above 95 on Lighthouse and stay there after launch",
    note: "Performance kept, not chased",
    year: "2019—",
    vol: 38,
  },
  {
    call: "152.1",
    subject: "Motion design used for meaning rather than for decoration",
    produced: "Scroll stories, page transitions and small interactions that explain",
    note: "Every animation has a job",
    year: "2020—",
    vol: 21,
  },
  {
    call: "658.8",
    subject: "Content structure and plain-language copy for busy readers",
    produced: "Menus, booking paths and enquiry forms rewritten so people finish them",
    note: "Completion over clicks",
    year: "2022—",
    vol: 9,
  },
  {
    call: "720.9",
    subject: "A degree in architecture, and the habit of drawing before building",
    produced: "Every project begins as a hand-drawn plan before a pixel is placed",
    note: "Plan first",
    year: "2014—2019",
    vol: 5,
  },
];

/* II — Exhibited work */
export type Project = {
  slug: string;
  no: string;
  name: string;
  kind: string;
  sector: string;
  year: string;
  live: string;
  url: string;
  client: string;
  stack: string;
  delivered: string;
  quote: string;
  quoteBy: string;
  shots: { desktop: string; desktopAlt: string; phone: string };
  brief: string;
  approach: string[];
  outcome: { value: string; label: string }[];
};

export const projects: Project[] = [
  {
    slug: "saffron-and-salt",
    no: "02",
    name: "Saffron & Salt",
    kind: "Website and booking flow for a Lahori dining room",
    sector: "Hospitality",
    year: "2026",
    live: "saffronandsalt.pk",
    url: "https://example.com/",
    client: "Saffron & Salt, Gulberg",
    stack: "Next.js, GSAP, a headless menu editor",
    delivered: "Art direction · Build · Motion · Menu system · Reservations",
    quote: "“…the first time our website has felt like walking into the room itself…”",
    quoteBy: "Mehreen Aslam, Saffron & Salt",
    shots: {
      desktop: "/images/work/saffron-desktop.jpg",
      desktopAlt: "/images/work/saffron-desktop-2.jpg",
      phone: "/images/work/saffron-phone.jpg",
    },
    brief:
      "A much-loved dining room with a website that looked like a template and a booking path that ran through WhatsApp. On a Friday night the staff were answering messages instead of serving tables.",
    approach: [
      "Spent two evenings in the restaurant watching how guests actually arrived, ordered and asked questions, then wrote the site around those questions.",
      "Built the menu as structured content so the chef can change a dish from his phone without anyone calling the developer.",
      "Replaced the WhatsApp booking with a three-step reservation flow that confirms by SMS and drops into the floor manager's sheet.",
    ],
    outcome: [
      { value: "3×", label: "online reservations in the first month" },
      { value: "−70%", label: "booking messages on WhatsApp" },
      { value: "98", label: "Lighthouse performance score" },
    ],
  },
  {
    slug: "kohsar-architects",
    no: "01",
    name: "Kohsar Architects",
    kind: "Portfolio site for a brick-and-courtyard architecture practice",
    sector: "Architecture",
    year: "2026",
    live: "kohsar.studio",
    url: "https://example.com/",
    client: "Kohsar Architects, Islamabad",
    stack: "Hand-written HTML, CSS and JavaScript",
    delivered: "Design · Build · Image direction · Project archive · Enquiries",
    quote: "“…he drew our site the way we draw a house — from the plan outwards…”",
    quoteBy: "Hamza Qureshi, Kohsar Architects",
    shots: {
      desktop: "/images/work/kohsar-desktop.jpg",
      desktopAlt: "/images/work/kohsar-desktop-2.jpg",
      phone: "/images/work/kohsar-phone.jpg",
    },
    brief:
      "An award-winning practice whose work lived in a PDF that nobody opened. Prospective clients were judging the studio from three Instagram posts.",
    approach: [
      "Organised the archive by the way clients talk about a commission (site, budget, climate) rather than by year.",
      "Shot list and image direction agreed before design, so every page has photography that earns its place.",
      "No framework: a few kilobytes of hand-written code, so the site loads well even on a weak mobile connection out of town.",
    ],
    outcome: [
      { value: "14", label: "qualified enquiries in the first quarter" },
      { value: "41 kb", label: "of JavaScript, all in" },
      { value: "2.1s", label: "to first view on a 3G connection" },
    ],
  },
];

/* Practice areas (rows with roman numerals) */
export const practice = [
  {
    n: "I",
    title: "Hospitality",
    summary:
      "Restaurants lose more guests to a broken menu PDF than to a bad review. I build menus as real pages and booking paths short enough to finish one-handed while you walk.",
    discipline: "Menus · Reservations",
    outcome: "Fewer phone calls",
  },
  {
    n: "II",
    title: "Architecture & interiors",
    summary:
      "Practices are judged on their photographs before anyone reads a word. I set the images first, then lay a quiet grid around them and keep the type out of the way.",
    discipline: "Archive · Image direction",
    outcome: "Work shown at full size",
  },
  {
    n: "III",
    title: "Cultural houses",
    summary:
      "Galleries and festivals juggle programmes, tickets and three kinds of visitor at once. They get one calendar to manage and an obvious first click for every kind of visitor.",
    discipline: "Programming · Ticketing",
    outcome: "One calendar, not five",
  },
  {
    n: "IV",
    title: "Education",
    summary:
      "Parents read a school's website at eleven at night, worried. The fees, the dates and the admissions steps go on page one, and the brochure copy goes further down.",
    discipline: "Structure · Plain language",
    outcome: "Answers first",
  },
  {
    n: "V",
    title: "Fashion & craft",
    summary:
      "Makers need a shop that sells and still feels like the workshop. Product pages lead with the process, the hands and the material, and checkout keeps them out of the way.",
    discipline: "Commerce · Storytelling",
    outcome: "Craft before cart",
  },
  {
    n: "VI",
    title: "Non-profit",
    summary:
      "Donors give to people they can picture. I put stories ahead of statistics, keep the donate button steady, and make it simple to give again next month.",
    discipline: "Narrative · Giving flow",
    outcome: "Repeat giving",
  },
];

/* III — Figures */
export const figures = [
  {
    label: "Websites designed and shipped since leaving architecture school",
    note: "Hospitality, architecture, culture and education · 2019—2026",
    value: 48,
    suffix: "",
  },
  {
    label: "Average Lighthouse performance score across live client sites",
    note: "Measured on mobile, three months after launch",
    value: 97,
    suffix: "",
  },
  {
    label: "Clients who came back for a second project",
    note: "The number I watch more closely than any other",
    value: 82,
    suffix: "%",
  },
];

/* IV — Correspondence (testimonials) */
export const letters = [
  {
    n: "I",
    quote:
      "Zayan sat in our restaurant for two evenings before he drew anything. The site he made answers the questions our guests used to ask the waiters. Bookings went up and the phone went quiet, and I didn't expect either.",
    name: "Mehreen Aslam",
    role: "Owner · Saffron & Salt",
    stamp: "LHR",
  },
  {
    n: "II",
    quote:
      "He understood that our photographs were the point and everything else had to step back. Calm, precise and always early. We have recommended him to three practices since.",
    name: "Hamza Qureshi",
    role: "Principal · Kohsar Architects",
    stamp: "ISB",
  },
  {
    n: "III",
    quote:
      "Clear about what he would do, clearer still about what he wouldn't. The festival site survived ticket day without a single wobble.",
    name: "Sana Farooq",
    role: "Director · Lahore Book Fortnight",
    stamp: "LHR",
  },
  {
    n: "IV",
    quote:
      "Our admissions page used to generate forty emails a week asking the same thing. Now it generates applications.",
    name: "Imran Siddiqui",
    role: "Bursar · Ravi Valley School",
    stamp: "FSD",
  },
  {
    n: "V",
    quote:
      "The shop feels like our workshop smells: wood shavings and tea. I don't know how he did that with code.",
    name: "Ayesha Rauf",
    role: "Founder · Kaath Woodworks",
    stamp: "KHI",
  },
];

/* V — Recognition */
export const recognition = {
  year: "2026",
  features: 4,
  talks: 2,
  note: "Four features this year and two talks. Two more are in review.",
  won: [
    { title: "Site of the Month", body: "The Paper Index", date: "Mar 2026", tone: "#3f6b4a" },
    { title: "Best Use of Type", body: "North Light Web Awards", date: "May 2026", tone: "#4b4a8a" },
    { title: "Honourable Mention", body: "Studio Ledger Annual", date: "Aug 2026", tone: "#a6512d" },
  ],
  listed: [
    { body: "Lahore Design Week", award: "Speaker: “Drawing before Coding”", standing: "Talk", year: "2026" },
    { body: "Frontend Karachi", award: "Workshop: Motion with Meaning", standing: "Talk", year: "2026" },
    { body: "Typewise Journal", award: "Feature: Urdu & Latin pairing", standing: "In review", year: "2026" },
  ],
  notices: [
    { left: "Dawn — Images", title: "The architect who builds websites", right: "Interview" },
    { left: "Design Diaries", title: "Ten Pakistani studios to watch", right: "Listed" },
    { left: "The Paper Index", title: "Saffron & Salt — a case study", right: "Feature" },
  ],
};

/* The dark contact board */
export const board = {
  eyebrow: "The Reading Room",
  title: "Start a conversation",
  lead:
    "Tell me what you are making and who it is for. If I'm not the right fit, I will say so and point you to someone who is.",
  tape: [
    "ZM · DESIGN & FRONT-END",
    "DRAWN BY HAND · BUILT IN CODE",
    "48 SITES SHIPPED",
    "LIGHTHOUSE 97 AVERAGE",
    "82% RETURN CLIENTS",
    "LAHORE · ISLAMABAD · REMOTE",
    "TWO PROJECTS A QUARTER",
  ],
};

/* Biography page */
export const biography = {
  intro:
    "I trained as an architect in Lahore and spent my thesis year drawing courtyards. Somewhere in the middle of it I built a website for a friend's café, and I have not stopped since.",
  paragraphs: [
    "Architecture gave me a way of working I have never wanted to lose. I go to the site first and look at how people actually use it. I draw the plan by hand, and I only add an ornament when it carries some weight. A website is a smaller building, but I still start it the same way.",
    "These days I work alone, with a small circle of photographers, copywriters and back-end developers I trust. Keeping the studio small keeps it honest. You talk to the person who draws the plan and writes the code, and that person answers the phone.",
    "Away from the desk I collect old Urdu type specimens, cook badly for friends and walk the old city on Sunday mornings with a sketchbook that is mostly doors.",
  ],
  timeline: [
    { year: "2026", text: "Two talks on drawing before coding; studio fully booked to the end of the year." },
    { year: "2023", text: "Went independent. First client: a dining room in Gulberg that is still a client." },
    { year: "2020", text: "Front-end developer at a Lahore agency, leading motion and design systems." },
    { year: "2019", text: "Graduated in architecture; thesis on courtyard houses and shade." },
  ],
};

/* Résumé page */
export const resume = {
  summary:
    "Designer and front-end developer with an architecture degree and seven years of building fast, careful websites for brands that care how they are seen.",
  experience: [
    {
      when: "2023 — present",
      title: "Independent designer & developer",
      where: "Zayan Malik Studio · Lahore",
      points: [
        "Design and build of 20+ websites for hospitality, architecture and cultural clients.",
        "Average Lighthouse performance of 97 across live sites; 82% of clients return.",
      ],
    },
    {
      when: "2020 — 2023",
      title: "Senior front-end developer",
      where: "Northfold Digital · Lahore",
      points: [
        "Led the motion and component system used across 30+ client builds.",
        "Introduced design reviews with drawn wireframes before any code.",
      ],
    },
    {
      when: "2019 — 2020",
      title: "Junior designer",
      where: "Courtyard Collective · Islamabad",
      points: ["Presentation drawings, competition boards and the studio's first website."],
    },
  ],
  education: [
    { when: "2014 — 2019", title: "B.Arch, Architecture", where: "National College of Arts, Lahore" },
  ],
  skills: [
    ["Design", "Art direction, typography, layout, Figma, hand sketching"],
    ["Front-end", "Next.js, React, TypeScript, CSS, accessibility"],
    ["Motion", "GSAP, ScrollTrigger, Lenis, SVG animation"],
    ["Content", "Information architecture, plain-language copy, CMS setup"],
    ["Languages", "English, Urdu, Punjabi"],
  ],
};

export const navLinks = [
  { label: "Biography", href: "/about/" },
  { label: "Résumé", href: "/cv/" },
  { label: "Selected work", href: "/#work" },
];
