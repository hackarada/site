export type SectionId = "home" | "about" | "craft" | "lab" | "work" | "signal";

export type NavItem = {
  id: SectionId;
  label: string;
  short: string;
};

export const navItems: NavItem[] = [
  { id: "home", label: "Home", short: "00" },
  { id: "about", label: "Construct", short: "01" },
  { id: "craft", label: "Surfaces", short: "02" },
  { id: "lab", label: "Lab", short: "03" },
  { id: "work", label: "Productions", short: "04" },
  { id: "signal", label: "Channel", short: "05" },
];

export function sectionLabel(id: SectionId): string {
  switch (id) {
    case "home":
      return "Home";
    case "about":
      return "Construct";
    case "craft":
      return "Surfaces";
    case "lab":
      return "Lab";
    case "work":
      return "Productions";
    case "signal":
      return "Channel";
    default: {
      const _exhaustive: never = id;
      return _exhaustive;
    }
  }
}

export const profile = {
  name: "Ermias Bayu",
  first: "Ermias",
  last: "Bayu",
  role: "Senior Staff Security Engineer",
  studio: "Disney Studios · Content Security",
  location: "Los Angeles",
  email: "",
  linkedin: "https://www.linkedin.com/in/hackarada",
  github: "https://github.com/hackarada",
  resume: `${import.meta.env.BASE_URL}Ermias_resume.pdf`,
  headline: "Security for products, clouds, and unreleased worlds.",
  lede:
    "I design the trust models behind applications, distributed platforms, and high-sensitivity content — then stand up the teams, pipelines, and tooling that keep those models alive after the review ends.",
};

export const about = {
  kicker: "01  /  The construct",
  title: "Architecture under adversarial pressure.",
  body: [
    "I work where product, cloud, and content collide: systems that have to ship, stay available, and still survive a motivated attacker. At Walt Disney Studios I operate as a senior technical authority across applications, identity, distributed services, and AI workflows that handle pre-release work.",
    "The through-line is the same whether the surface is a streaming API, an EKS mesh, a DRM stack, or an agent in an IDE. Map the trust boundaries. Reduce implicit faith. Make the secure path the one engineering actually wants to take.",
    "A review that dies in a slide deck is not security. I stand up product security functions, put SAST/DAST/SCA and policy into CI/CD, and leave behind tooling that routes risk to owners. I came up through red teaming and exploit research, then spent years hardening cloud and streaming platforms at AWS and Disney. The craft is still offensive in spirit: think like the adversary, then make the fix operational.",
  ],
  facts: [
    { label: "Base", value: "Los Angeles" },
    { label: "Focus", value: "Product · Cloud · Pipeline · Content · AI" },
    { label: "Depth", value: "Red team to architecture" },
    { label: "Mode", value: "Secure by design" },
  ],
};

export type CraftArea = {
  code: string;
  title: string;
  summary: string;
  points: string[];
  wide?: boolean;
};

export const craft: CraftArea[] = [
  {
    code: "PRD",
    title: "Product security",
    summary:
      "Stand up the function, then get into the design before production enablement: frontend, APIs, identity, and the contracts between them.",
    points: [
      "Product security team design",
      "Authn vs authz and API threat models",
      "Secure-by-design patterns teams reuse",
    ],
  },
  {
    code: "CLD",
    title: "Cloud architecture",
    summary:
      "Zero Trust on AWS, Azure, and GCP. Workload identity, segmentation, and least privilege across distributed systems.",
    points: [
      "EKS and service identity",
      "Hybrid cloud governance",
      "CSPM and control design",
    ],
  },
  {
    code: "CNT",
    title: "Content protection",
    summary:
      "The vault around the story: DRM, watermarking, forensic traceability, device trust, and the paths content tries to escape.",
    points: [
      "Widevine · PlayReady · FairPlay",
      "Watermarking and screen-capture",
      "Exfiltration investigations",
    ],
  },
  {
    code: "AI",
    title: "AI & agent security",
    summary:
      "Guardrails for LLMs, agentic workflows, and AI-assisted development. Prompt handling, plugins, and supply chain risk.",
    points: [
      "Agent over-permissioning",
      "Prompt injection and exfil",
      "IDE and CI/CD controls",
    ],
  },
  {
    code: "PIP",
    title: "DevSecOps & tooling",
    summary:
      "A finding that never reaches an owner is theater. I put SAST, DAST, SCA, and policy into CI/CD, and build the glue that makes security a delivery path instead of a gate that engineering learns to walk around.",
    points: [
      "Pipeline guardrails and break-glass design",
      "SAST / DAST / SCA with owner routing",
      "Security automation that ships with the product",
    ],
    wide: true,
  },
];

export type Production = {
  venue: string;
  role: string;
  period: string;
  status?: string;
  beats: string[];
};

export const productions: Production[] = [
  {
    venue: "Walt Disney Studios  ·  Content Security",
    role: "Senior Staff Security Engineer, App & Cloud",
    period: "2023 — Present",
    status: "Now",
    beats: [
      "Senior architectural and risk authority for product security across applications, cloud platforms, distributed services, and AI systems handling pre-release content.",
      "Shape the product-security practice: review rituals, reference architectures, and the tooling engineering actually runs — including interim team lead for FTE and contractor engineers.",
      "Define Zero Trust patterns: identity-aware service communication, workload segmentation, and least-privilege enforcement on Kubernetes and hybrid cloud.",
      "Own AI security reviews for LLMs, agents, and AI-assisted coding; contribute to enterprise red teaming of prompt, plugin, and supply-chain risk.",
      "Lead content-protection investigations spanning DRM bypass, watermarking failures, and device-trust gaps.",
    ],
  },
  {
    venue: "Amazon Web Services  ·  Professional Services",
    role: "Security Consultant",
    period: "2022 — 2023",
    beats: [
      "Designed enterprise cloud security architectures for customers migrating across AWS, Azure, GCP, and OCI.",
      "Led assessments of distributed systems and authored reference architectures and automation for engineering teams.",
    ],
  },
  {
    venue: "Disney Streaming  /  DMED",
    role: "Security Engineer",
    period: "2018 — 2022",
    beats: [
      "Architecture reviews, penetration testing, and vulnerability work across streaming and content systems.",
      "Reverse-engineered piracy applications and firmware; led DRM-bypass and hardware-level investigations into vendor remediation.",
      "Built security automation and pipeline checks that improved testing efficiency by 40%, moving assessment out of one-off reviews and into delivery.",
    ],
  },
  {
    venue: "INSA  ·  Tiger Team",
    role: "Lead Security Researcher",
    period: "2012 — 2018",
    beats: [
      "Led a team of 30 securing infrastructure for 60M+ users, and 200+ red team engagements across critical systems.",
      "Designed a hybrid fuzzing platform for zero-day and n-day discovery; built tooling for crash triage and exploit research.",
    ],
  },
];

export type Artifact = {
  code: string;
  title: string;
  year: string;
  stack: string;
  summary: string;
  href: string;
};

export const artifacts: Artifact[] = [
  {
    code: "SAST",
    title: "sast_blame",
    year: "2025",
    stack: "Python · Semgrep · GitHub / GitLab",
    summary:
      "Route a static finding to the person who wrote the line. Ties Semgrep output to git blame so pipeline noise becomes an owner, not a ticket graveyard.",
    href: "https://github.com/hackarada/sast_blame",
  },
  {
    code: "LOC",
    title: "blueear",
    year: "2026",
    stack: "Rust · Core Audio · WASAPI",
    summary:
      "Local-first capture for Teams and Zoom. Isolated meeting audio, optional mic, synchronized WAVs. Nothing is uploaded — a small study in keeping sensitive signal on-device.",
    href: "https://github.com/hackarada/blueear",
  },
  {
    code: "RES",
    title: "OfficeClick4Me",
    year: "2017",
    stack: "C++ · Windows",
    summary:
      "Unattended helper for Word 2007 dialogs during fuzzing campaigns. Research tooling: keep the loop running when the target tries to stop for a popup.",
    href: "https://github.com/hackarada/OfficeClick4Me",
  },
];

export const signals = [
  {
    kind: "Talk",
    title: "The Journey to Zero Trust and Adoption of AI",
    place: "Content Security Summit",
    note: "Translating AI, cloud, and security architecture into guidance engineering organizations can actually use.",
  },
  {
    kind: "Practice",
    title: "Product security as a delivery path",
    place: "Teams · tooling · CI/CD",
    note: "Stand up the function, put SAST/DAST/SCA and policy in the pipeline, and make the secure path the default for engineering.",
  },
  {
    kind: "Creds",
    title: "AWS Security Specialty · CCZT · Black Hat AI Red Teaming",
    place: "Continuing craft",
    note: "Cloud architecture, Zero Trust, and adversarial testing against modern AI systems.",
  },
];

export const stack = [
  "Zero Trust",
  "Product security programs",
  "DevSecOps",
  "SAST · DAST · SCA",
  "CI/CD guardrails",
  "Workload identity",
  "AWS · Azure · GCP",
  "Kubernetes / EKS",
  "DRM & watermarking",
  "Threat modeling",
  "AI red teaming",
  "Python",
  "FRIDA · IDA · Ghidra",
];
