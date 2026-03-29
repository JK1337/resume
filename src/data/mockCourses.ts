export type CourseStatus = "not_started" | "in_progress" | "completed";

export interface Course {
  id: string;
  title: string;
  description: string;
  /** Estimated time to complete */
  minutes: number;
  /** Credits granted when the course is fully completed */
  creditsReward: number;
  status: CourseStatus;
  /** 1–99 when status is in_progress */
  progressPercent?: number;
  focus: string;
}

export const MOCK_COURSES: Course[] = [
  {
    id: "c1",
    title: "First impression: phone screens",
    description:
      "Structure concise answers, handle “tell me about yourself,” and avoid common pitfalls recruiters listen for. Includes practice prompts and a checklist for every call.",
    minutes: 45,
    creditsReward: 25,
    status: "completed",
    focus: "Screening",
  },
  {
    id: "c2",
    title: "STAR stories that land offers",
    description:
      "Turn experience into memorable stories: Situation, Task, Action, Result—with metrics. Works for behavioral rounds at any level.",
    minutes: 60,
    creditsReward: 30,
    status: "completed",
    focus: "Behavioral",
  },
  {
    id: "c3",
    title: "Salary and benefits negotiation",
    description:
      "Research ranges, anchor confidently, and respond to first offers without leaving money on the table. Scripts for email and live conversations.",
    minutes: 40,
    creditsReward: 20,
    status: "completed",
    focus: "Offer stage",
  },
  {
    id: "c4",
    title: "Technical deep-dives for senior roles",
    description:
      "System design talking points, trade-off language, and how to drive the whiteboard when the interviewer goes quiet.",
    minutes: 90,
    status: "in_progress",
    progressPercent: 62,
    creditsReward: 40,
    focus: "Technical interview",
  },
  {
    id: "c5",
    title: "Case interviews in under an hour",
    description:
      "Framework-light approach for consulting-style cases: clarify, structure, math checks, and a strong close.",
    minutes: 55,
    status: "in_progress",
    progressPercent: 28,
    creditsReward: 35,
    focus: "Case prep",
  },
  {
    id: "c6",
    title: "Your narrative: career pivots explained",
    description:
      "Reframe non-linear paths so they feel intentional. Works for résumé gaps, industry changes, and return-to-work stories.",
    minutes: 35,
    creditsReward: 15,
    status: "not_started",
    focus: "Storytelling",
  },
  {
    id: "c7",
    title: "Panel interviews & group dynamics",
    description:
      "Eye contact patterns, who to address first, and how to follow up when four people ask different questions at once.",
    minutes: 50,
    creditsReward: 22,
    status: "not_started",
    focus: "Format",
  },
  {
    id: "c8",
    title: "Async take-homes without burning out",
    description:
      "Scope the task, communicate assumptions, and ship something reviewable in the time box—plus email templates for extensions.",
    minutes: 70,
    creditsReward: 45,
    status: "not_started",
    focus: "Take-home",
  },
  {
    id: "c9",
    title: "Confidence under stress",
    description:
      "Breathing resets, reframing anxiety as energy, and quick resets between back-to-back rounds.",
    minutes: 30,
    creditsReward: 12,
    status: "not_started",
    focus: "Mindset",
  },
];

export function creditsEarnedFromCourses(courses: Course[]): number {
  return courses
    .filter((c) => c.status === "completed")
    .reduce((sum, c) => sum + c.creditsReward, 0);
}
