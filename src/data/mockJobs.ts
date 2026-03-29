export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  workStyle: "Remote" | "Hybrid" | "On-site";
  posted: string;
  salaryRange?: string;
  tags: string[];
  description: string;
}

export const MOCK_JOBS: JobListing[] = [
  {
    id: "1",
    title: "Senior Frontend Engineer",
    company: "Nimbus Labs",
    location: "Amsterdam, NL",
    workStyle: "Hybrid",
    posted: "2 days ago",
    salaryRange: "€85k – €105k",
    tags: ["React", "TypeScript", "Design systems"],
    description:
      "Lead UI architecture for our analytics platform. You will partner with design to ship accessible components, improve performance (Core Web Vitals), and mentor junior engineers. We use React 19, Vite, and a shared component library. Expect code review culture, quarterly hack weeks, and budget for conferences.",
  },
  {
    id: "2",
    title: "Product Designer",
    company: "Riverstone Health",
    location: "Berlin, DE",
    workStyle: "Remote",
    posted: "5 days ago",
    salaryRange: "€70k – €88k",
    tags: ["Figma", "UX research", "Healthcare"],
    description:
      "Shape clinician-facing tools from discovery to handoff. Run usability sessions with hospitals, maintain our design system in Figma, and work embedded with two product squads. Strong portfolio showing complex workflows; experience in regulated environments is a plus.",
  },
  {
    id: "3",
    title: "Backend Engineer (Go)",
    company: "Crest Data",
    location: "London, UK",
    workStyle: "Hybrid",
    posted: "1 week ago",
    tags: ["Go", "PostgreSQL", "Kubernetes"],
    description:
      "Build ingestion pipelines and APIs that power real-time dashboards for fintech clients. Stack: Go, Postgres, Kafka, k8s on GCP. On-call is shared fairly; we invest in observability and blameless postmortems. EU work authorization required for hybrid days.",
  },
  {
    id: "4",
    title: "DevRel Engineer",
    company: "OpenPipe",
    location: "Remote (EU)",
    workStyle: "Remote",
    posted: "3 days ago",
    tags: ["Content", "SDKs", "Community"],
    description:
      "Grow our developer community through docs, sample apps, conference talks, and Discord. You should enjoy coding (we ship CLI tools in Rust and TS) and explaining ideas clearly. Travel ~6 weeks per year for events; home office stipend included.",
  },
  {
    id: "5",
    title: "ML Engineer",
    company: "Aurora Vision",
    location: "Zurich, CH",
    workStyle: "On-site",
    posted: "4 days ago",
    salaryRange: "CHF 120k – 150k",
    tags: ["PyTorch", "CV", "Edge devices"],
    description:
      "Train and deploy vision models for industrial inspection hardware. Close collaboration with hardware and field engineers. PhD or equivalent experience preferred; we publish at top venues and open-source tooling when possible.",
  },
  {
    id: "6",
    title: "Full-stack Engineer",
    company: "Harbor Education",
    location: "Remote (US/EU overlap)",
    workStyle: "Remote",
    posted: "6 days ago",
    tags: ["Next.js", "Prisma", "Postgres"],
    description:
      "Ship features for our LMS used by universities worldwide. Small team, high ownership: you might own auth one sprint and grading workflows the next. We value pragmatic testing, feature flags, and clear RFCs before big changes.",
  },
  {
    id: "7",
    title: "Platform Engineer",
    company: "Lattice Grid",
    location: "Dublin, IE",
    workStyle: "Hybrid",
    posted: "Today",
    tags: ["Terraform", "AWS", "SRE"],
    description:
      "Improve developer experience for 80+ engineers: CI/CD, ephemeral environments, cost visibility, and golden paths. We are migrating the last services to EKS; you should be comfortable writing IaC and pairing with app teams on reliability goals.",
  },
  {
    id: "8",
    title: "Technical Writer",
    company: "SignalPath",
    location: "Remote",
    workStyle: "Remote",
    posted: "1 week ago",
    tags: ["API docs", "OpenAPI", "Developer portals"],
    description:
      "Own public API reference, tutorials, and changelog. Work from OpenAPI specs and alongside engineers shipping weekly. Experience with static site generators and a sharp eye for clarity matter more than a specific stack.",
  },
];
