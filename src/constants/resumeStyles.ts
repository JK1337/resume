import type { CSSProperties } from "react";

export const RESUME_STYLE_IDS = [
  "standard",
  "minimal",
  "executive",
  "modern",
  "academic",
] as const;

export type ResumeStyleId = (typeof RESUME_STYLE_IDS)[number];

export const RESUME_STYLE_OPTIONS: { id: ResumeStyleId; label: string }[] = [
  { id: "standard", label: "Standard" },
  { id: "minimal", label: "Minimal" },
  { id: "executive", label: "Executive" },
  { id: "modern", label: "Modern" },
  { id: "academic", label: "Academic" },
];

export const DEFAULT_RESUME_STYLE: ResumeStyleId = "standard";

/** Tailwind + layout tokens per style (preview + PDF capture) */
export type ResumeStyleTokens = {
  paper: string;
  paperInline: CSSProperties;
  header: string;
  name: string;
  headline: string;
  contact: string;
  sectionTitle: string;
  summaryText: string;
  jobTitle: string;
  jobCompany: string;
  jobDates: string;
  bulletList: string;
  bulletItem: string;
  eduInst: string;
  eduLine: string;
  eduDates: string;
  eduDetails: string;
  skillsCategory: string;
  skillsLine: string;
};

export const RESUME_STYLE_TOKENS: Record<ResumeStyleId, ResumeStyleTokens> = {
  standard: {
    paper: "bg-white text-slate-900 shadow-2xl shadow-black/40",
    paperInline: {
      fontFamily: "Georgia, 'Times New Roman', serif",
    },
    header: "border-b-2 border-violet-700 pb-3",
    name: "text-3xl font-bold tracking-tight text-slate-900 font-display",
    headline: "mt-1 text-lg text-violet-800 font-display",
    contact: "mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600",
    sectionTitle:
      "mb-2 border-b border-slate-300 pb-1 text-sm font-bold uppercase tracking-wider text-violet-900 font-display",
    summaryText: "whitespace-pre-wrap text-sm leading-relaxed text-slate-800",
    jobTitle: "font-semibold text-slate-900",
    jobCompany: "text-slate-800",
    jobDates: "text-sm text-slate-600",
    bulletList: "mt-2 list-disc pl-5 text-sm leading-relaxed text-slate-800",
    bulletItem: "",
    eduInst: "font-semibold text-slate-900",
    eduLine: "text-sm text-slate-800",
    eduDates: "text-sm text-slate-600",
    eduDetails: "mt-1 whitespace-pre-wrap text-sm text-slate-700",
    skillsCategory: "font-semibold text-slate-900",
    skillsLine: "text-sm text-slate-800",
  },
  minimal: {
    paper: "bg-white text-slate-800 shadow-md shadow-slate-300/50",
    paperInline: {
      fontFamily: "'DM Sans', system-ui, sans-serif",
    },
    header: "border-b border-slate-200 pb-4",
    name: "text-2xl font-light tracking-tight text-slate-900",
    headline: "mt-1 text-sm font-normal text-slate-500",
    contact: "mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-slate-500",
    sectionTitle:
      "mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-400",
    summaryText: "whitespace-pre-wrap text-sm leading-relaxed text-slate-600",
    jobTitle: "text-sm font-semibold text-slate-900",
    jobCompany: "text-sm text-slate-600",
    jobDates: "text-xs text-slate-400 tabular-nums",
    bulletList: "mt-2 list-disc pl-5 text-sm leading-relaxed text-slate-600",
    bulletItem: "",
    eduInst: "text-sm font-semibold text-slate-900",
    eduLine: "text-sm text-slate-600",
    eduDates: "text-xs text-slate-400 tabular-nums",
    eduDetails: "mt-1 whitespace-pre-wrap text-sm text-slate-500",
    skillsCategory: "text-xs font-semibold uppercase tracking-wide text-slate-500",
    skillsLine: "text-sm text-slate-600",
  },
  executive: {
    paper: "bg-white text-slate-800 shadow-2xl shadow-slate-900/20",
    paperInline: {
      fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
    },
    header:
      "-mx-[18mm] -mt-[14mm] mb-4 bg-slate-900 px-[18mm] py-5 text-white",
    name: "text-3xl font-bold tracking-tight text-white font-display",
    headline: "mt-1 text-sm font-medium uppercase tracking-widest text-amber-200/90",
    contact: "mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-slate-300",
    sectionTitle:
      "mb-2 border-b-2 border-slate-800 pb-1 text-xs font-bold uppercase tracking-[0.15em] text-slate-900",
    summaryText: "whitespace-pre-wrap text-sm leading-relaxed text-slate-700",
    jobTitle: "font-bold text-slate-900",
    jobCompany: "text-slate-700",
    jobDates: "text-xs text-slate-500 uppercase tracking-wide",
    bulletList: "mt-2 list-disc pl-5 text-sm leading-relaxed text-slate-700",
    bulletItem: "",
    eduInst: "font-bold text-slate-900",
    eduLine: "text-sm text-slate-700",
    eduDates: "text-xs text-slate-500",
    eduDetails: "mt-1 whitespace-pre-wrap text-sm text-slate-600",
    skillsCategory: "font-bold text-slate-900 text-sm",
    skillsLine: "text-sm text-slate-700",
  },
  modern: {
    paper: "bg-slate-50 text-slate-800 shadow-xl shadow-teal-900/10",
    paperInline: {
      fontFamily: "'Outfit', system-ui, sans-serif",
    },
    header: "rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 px-5 py-4 text-white",
    name: "text-2xl font-bold tracking-tight",
    headline: "mt-1 text-sm font-medium text-teal-100",
    contact: "mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-teal-50/90",
    sectionTitle:
      "mb-2 inline-block rounded-md bg-teal-100 px-2 py-1 text-xs font-bold uppercase tracking-wide text-teal-900",
    summaryText: "whitespace-pre-wrap text-sm leading-relaxed text-slate-600",
    jobTitle: "font-bold text-slate-900",
    jobCompany: "text-slate-600",
    jobDates: "text-xs font-medium text-teal-700 tabular-nums",
    bulletList: "mt-2 list-none space-y-1 pl-0 text-sm leading-relaxed text-slate-600",
    bulletItem: "pl-3 before:mr-2 before:inline-block before:w-2 before:text-teal-500 before:content-['▸']",
    eduInst: "font-bold text-slate-900",
    eduLine: "text-sm text-slate-600",
    eduDates: "text-xs font-medium text-teal-700",
    eduDetails: "mt-1 whitespace-pre-wrap text-sm text-slate-500",
    skillsCategory: "text-sm font-bold text-teal-800",
    skillsLine: "text-sm text-slate-600",
  },
  academic: {
    paper: "bg-white text-black shadow-lg",
    paperInline: {
      fontFamily: "Cambria, 'Times New Roman', Times, serif",
    },
    header: "border-b border-black pb-3",
    name: "text-2xl font-normal tracking-tight text-black",
    headline: "mt-1 text-base italic text-neutral-700",
    contact: "mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-neutral-800",
    sectionTitle:
      "mb-2 text-center text-sm font-bold uppercase tracking-wide text-black border-b border-black pb-0.5",
    summaryText: "whitespace-pre-wrap text-sm leading-relaxed text-neutral-900 text-justify",
    jobTitle: "font-bold text-black",
    jobCompany: "text-neutral-900",
    jobDates: "text-sm text-neutral-600",
    bulletList: "mt-1.5 list-disc pl-6 text-sm leading-snug text-neutral-900",
    bulletItem: "",
    eduInst: "font-bold text-black",
    eduLine: "text-sm text-neutral-900",
    eduDates: "text-sm text-neutral-600",
    eduDetails: "mt-1 whitespace-pre-wrap text-sm text-neutral-800",
    skillsCategory: "font-semibold text-black text-sm",
    skillsLine: "text-sm text-neutral-900",
  },
};
