import { useResumeStore } from "../../store/resumeStore";

export function EducationSection() {
  const education = useResumeStore((s) => s.education);
  const addEducation = useResumeStore((s) => s.addEducation);
  const updateEducation = useResumeStore((s) => s.updateEducation);
  const removeEducation = useResumeStore((s) => s.removeEducation);

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-display text-lg font-semibold text-white">
          Education
        </h2>
        <button
          type="button"
          onClick={() => addEducation()}
          className="rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 px-3 py-2 text-sm font-medium text-white shadow-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          Add education
        </button>
      </div>

      {education.map((edu, index) => (
        <article
          key={edu.id}
          className="rounded-xl border border-amber-500/25 bg-slate-900/60 p-4 shadow-inner"
        >
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-amber-400/90">
              School {index + 1}
            </span>
            <button
              type="button"
              onClick={() => removeEducation(edu.id)}
              className="text-sm text-rose-400 hover:text-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-400 rounded"
            >
              Remove
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="sm:col-span-2">
              <span className="mb-1 block text-sm font-medium text-slate-300">
                Institution
              </span>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) =>
                  updateEducation(edu.id, { institution: e.target.value })
                }
                className="w-full rounded-lg border border-amber-500/30 bg-slate-900/80 px-3 py-2 text-slate-100 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </label>
            <label>
              <span className="mb-1 block text-sm font-medium text-slate-300">
                Degree
              </span>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) =>
                  updateEducation(edu.id, { degree: e.target.value })
                }
                className="w-full rounded-lg border border-amber-500/30 bg-slate-900/80 px-3 py-2 text-slate-100 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </label>
            <label>
              <span className="mb-1 block text-sm font-medium text-slate-300">
                Field of study
              </span>
              <input
                type="text"
                value={edu.field}
                onChange={(e) =>
                  updateEducation(edu.id, { field: e.target.value })
                }
                className="w-full rounded-lg border border-amber-500/30 bg-slate-900/80 px-3 py-2 text-slate-100 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </label>
            <label>
              <span className="mb-1 block text-sm font-medium text-slate-300">
                Start
              </span>
              <input
                type="text"
                value={edu.startDate}
                onChange={(e) =>
                  updateEducation(edu.id, { startDate: e.target.value })
                }
                className="w-full rounded-lg border border-amber-500/30 bg-slate-900/80 px-3 py-2 text-slate-100 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </label>
            <label>
              <span className="mb-1 block text-sm font-medium text-slate-300">
                End
              </span>
              <input
                type="text"
                value={edu.endDate}
                onChange={(e) =>
                  updateEducation(edu.id, { endDate: e.target.value })
                }
                className="w-full rounded-lg border border-amber-500/30 bg-slate-900/80 px-3 py-2 text-slate-100 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </label>
            <label className="sm:col-span-2">
              <span className="mb-1 block text-sm font-medium text-slate-300">
                Details (optional)
              </span>
              <textarea
                value={edu.details}
                onChange={(e) =>
                  updateEducation(edu.id, { details: e.target.value })
                }
                rows={3}
                className="w-full rounded-lg border border-amber-500/30 bg-slate-900/80 px-3 py-2 text-slate-100 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </label>
          </div>
        </article>
      ))}
    </div>
  );
}
