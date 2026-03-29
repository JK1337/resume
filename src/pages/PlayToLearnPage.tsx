import { useMemo } from "react";
import {
  creditsEarnedFromCourses,
  MOCK_COURSES,
  type Course,
} from "../data/mockCourses";

function BookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden={true}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.959 8.959 0 016 21c3.314 0 6-2.686 6-6V6.042zM18 3.75a8.967 8.967 0 00-6 2.292m6-2.292v14.25A8.959 8.959 0 0018 21c3.314 0 6-2.686 6-6V6.042A8.959 8.959 0 0018 3.75z"
      />
    </svg>
  );
}

function formatMinutes(m: number): string {
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  const r = m % 60;
  return r ? `${h}h ${r}m` : `${h}h`;
}

function DarkCourseRow({ course, variant }: { course: Course; variant: "active" | "done" }) {
  const isDone = variant === "done";
  return (
    <li className="flex gap-3 rounded-lg border border-white/10 bg-slate-900/60 px-3 py-3">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${
          isDone
            ? "bg-emerald-500/20 text-emerald-300"
            : "bg-violet-500/20 text-violet-300"
        }`}
      >
        <BookIcon className="h-6 w-6" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-display text-sm font-semibold text-white">
          {course.title}
        </p>
        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-slate-400">
          <span>{course.focus}</span>
          <span>·</span>
          <span>{formatMinutes(course.minutes)}</span>
          {!isDone && course.progressPercent != null ? (
            <>
              <span>·</span>
              <span className="text-violet-200/90">
                {course.progressPercent}% complete
              </span>
            </>
          ) : null}
          {isDone ? (
            <>
              <span>·</span>
              <span className="font-medium text-emerald-300/90">
                +{course.creditsReward} credits
              </span>
            </>
          ) : (
            <>
              <span>·</span>
              <span className="text-slate-500">
                up to {course.creditsReward} credits
              </span>
            </>
          )}
        </div>
        {!isDone && course.progressPercent != null ? (
          <div
            className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800"
            role="progressbar"
            aria-valuenow={course.progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500"
              style={{ width: `${course.progressPercent}%` }}
            />
          </div>
        ) : null}
      </div>
    </li>
  );
}

export function PlayToLearnPage() {
  const inProgress = useMemo(
    () => MOCK_COURSES.filter((c) => c.status === "in_progress"),
    []
  );
  const completed = useMemo(
    () => MOCK_COURSES.filter((c) => c.status === "completed"),
    []
  );
  const notStarted = useMemo(
    () => MOCK_COURSES.filter((c) => c.status === "not_started"),
    []
  );
  const creditsEarned = useMemo(
    () => creditsEarnedFromCourses(MOCK_COURSES),
    []
  );

  return (
    <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
      <div className="bg-gradient-to-b from-slate-950 via-violet-950/30 to-slate-950">
        <header className="border-b border-white/10 bg-slate-950/90 px-4 py-4 backdrop-blur sm:px-6">
          <h1 className="font-display text-xl font-bold tracking-tight text-white">
            Play to learn
          </h1>
          <p className="mt-1 text-sm text-violet-200/80">
            Interview prep and career skills—earn credits as you finish courses.
          </p>
        </header>

        <div className="space-y-4 p-4 sm:px-6 sm:pb-6">
          <div className="rounded-xl border border-violet-500/30 bg-slate-900/80 px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-violet-300/80">
              Credits earned
            </p>
            <p className="mt-1 font-display text-3xl font-bold text-white tabular-nums">
              {creditsEarned}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              From {completed.length} completed course
              {completed.length === 1 ? "" : "s"}. Keep learning to unlock more.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <section aria-labelledby="in-progress-heading">
              <h2
                id="in-progress-heading"
                className="mb-3 flex items-center gap-2 font-display text-sm font-semibold text-violet-200"
              >
                <span className="h-2 w-2 animate-pulse rounded-full bg-fuchsia-400" />
                In progress
                <span className="font-normal text-slate-500">
                  ({inProgress.length})
                </span>
              </h2>
              {inProgress.length ? (
                <ul className="space-y-2">
                  {inProgress.map((course) => (
                    <DarkCourseRow
                      key={course.id}
                      course={course}
                      variant="active"
                    />
                  ))}
                </ul>
              ) : (
                <p className="rounded-lg border border-dashed border-white/15 bg-slate-900/40 px-3 py-4 text-sm text-slate-500">
                  No courses in progress. Start one from the list below.
                </p>
              )}
            </section>

            <section aria-labelledby="completed-heading">
              <h2
                id="completed-heading"
                className="mb-3 font-display text-sm font-semibold text-emerald-200/90"
              >
                Completed
                <span className="ml-2 font-normal text-slate-500">
                  ({completed.length})
                </span>
              </h2>
              {completed.length ? (
                <ul className="space-y-2">
                  {completed.map((course) => (
                    <DarkCourseRow
                      key={course.id}
                      course={course}
                      variant="done"
                    />
                  ))}
                </ul>
              ) : (
                <p className="rounded-lg border border-dashed border-white/15 bg-slate-900/40 px-3 py-4 text-sm text-slate-500">
                  Finish a course to see it here and earn credits.
                </p>
              )}
            </section>
          </div>
        </div>
      </div>

      <div className="bg-slate-100">
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
          <h2 className="font-display text-lg font-semibold text-slate-900">
            Courses you haven’t opened yet
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Pick a module to begin. Time estimates and credit rewards apply when
            you complete the full track.
          </p>

          {notStarted.length ? (
            <ul className="mt-6 space-y-4">
              {notStarted.map((course) => (
                <li key={course.id}>
                  <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-lg font-semibold text-slate-900">
                          {course.title}
                        </h3>
                        <p className="mt-0.5 text-sm font-medium text-violet-800">
                          {course.focus}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-amber-900">
                        Not opened
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
                      <span>
                        <span className="text-slate-500">Time: </span>
                        <span className="font-medium text-slate-800">
                          {formatMinutes(course.minutes)}
                        </span>
                      </span>
                      <span className="text-slate-300">·</span>
                      <span>
                        <span className="text-slate-500">Status: </span>
                        <span className="font-medium text-slate-800">
                          Not started
                        </span>
                      </span>
                      <span className="text-slate-300">·</span>
                      <span>
                        <span className="text-slate-500">Credits: </span>
                        <span className="font-medium text-slate-800">
                          {course.creditsReward} on completion
                        </span>
                      </span>
                    </div>
                    <div className="mt-4 border-t border-slate-100 pt-4">
                      <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Description
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-slate-700">
                        {course.description}
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center text-sm text-slate-600">
              You’ve opened every course in this catalog. More modules will
              appear here as they’re added.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
