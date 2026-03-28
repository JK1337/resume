import { useResumeStore } from "../../store/resumeStore";

export function WorkExperienceSection() {
  const workExperience = useResumeStore((s) => s.workExperience);
  const addWork = useResumeStore((s) => s.addWork);
  const updateWork = useResumeStore((s) => s.updateWork);
  const removeWork = useResumeStore((s) => s.removeWork);
  const updateWorkBullets = useResumeStore((s) => s.updateWorkBullets);

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-display text-lg font-semibold text-white">
          Work experience
        </h2>
        <button
          type="button"
          onClick={() => addWork()}
          className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-3 py-2 text-sm font-medium text-white shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          Add position
        </button>
      </div>

      {workExperience.map((job, index) => (
        <article
          key={job.id}
          className="rounded-xl border border-cyan-500/25 bg-slate-900/60 p-4 shadow-inner"
        >
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-cyan-400/90">
              Role {index + 1}
            </span>
            <button
              type="button"
              onClick={() => removeWork(job.id)}
              className="text-sm text-rose-400 hover:text-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-400 rounded"
            >
              Remove
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field
              label="Job title"
              value={job.title}
              onChange={(v) => updateWork(job.id, { title: v })}
            />
            <Field
              label="Company"
              value={job.company}
              onChange={(v) => updateWork(job.id, { company: v })}
            />
            <Field
              label="Location"
              value={job.location}
              onChange={(v) => updateWork(job.id, { location: v })}
            />
            <Field
              label="Start"
              value={job.startDate}
              onChange={(v) => updateWork(job.id, { startDate: v })}
            />
            <Field
              label="End"
              value={job.endDate}
              onChange={(v) => updateWork(job.id, { endDate: v })}
              hint="Use “Present” if current"
            />
          </div>
          <div className="mt-4">
            <span className="mb-2 block text-sm font-medium text-slate-300">
              Bullets (one per line)
            </span>
            <textarea
              value={job.bullets.join("\n")}
              onChange={(e) =>
                updateWorkBullets(
                  job.id,
                  e.target.value.split("\n").map((l) => l.trimEnd())
                )
              }
              rows={5}
              className="w-full rounded-lg border border-cyan-500/30 bg-slate-950/80 px-3 py-2 font-mono text-sm text-slate-100 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              placeholder="Impact and responsibilities…"
            />
          </div>
        </article>
      ))}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
}) {
  return (
    <label className="block sm:col-span-1">
      <span className="mb-1 block text-sm font-medium text-slate-300">
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-cyan-500/30 bg-slate-900/80 px-3 py-2 text-slate-100 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
      />
      {hint ? <span className="mt-1 block text-xs text-slate-500">{hint}</span> : null}
    </label>
  );
}
