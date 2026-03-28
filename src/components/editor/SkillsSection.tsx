import { useResumeStore } from "../../store/resumeStore";

export function SkillsSection() {
  const skills = useResumeStore((s) => s.skills);
  const addSkill = useResumeStore((s) => s.addSkill);
  const updateSkill = useResumeStore((s) => s.updateSkill);
  const removeSkill = useResumeStore((s) => s.removeSkill);

  return (
    <div className="space-y-4 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-display text-lg font-semibold text-white">Skills</h2>
        <button
          type="button"
          onClick={() => addSkill()}
          className="rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 px-3 py-2 text-sm font-medium text-white shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          Add skill
        </button>
      </div>

      <ul className="space-y-3">
        {skills.map((skill, index) => (
          <li
            key={skill.id}
            className="flex flex-col gap-2 rounded-xl border border-emerald-500/25 bg-slate-900/60 p-3 sm:flex-row sm:items-end"
          >
            <label className="min-w-0 flex-1">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-emerald-400/90">
                Skill {index + 1}
              </span>
              <input
                type="text"
                value={skill.name}
                onChange={(e) =>
                  updateSkill(skill.id, { name: e.target.value })
                }
                className="w-full rounded-lg border border-emerald-500/30 bg-slate-900/80 px-3 py-2 text-slate-100 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                placeholder="e.g. TypeScript"
              />
            </label>
            <label className="min-w-0 flex-1">
              <span className="mb-1 block text-sm font-medium text-slate-300">
                Category (optional)
              </span>
              <input
                type="text"
                value={skill.category}
                onChange={(e) =>
                  updateSkill(skill.id, { category: e.target.value })
                }
                className="w-full rounded-lg border border-emerald-500/30 bg-slate-900/80 px-3 py-2 text-slate-100 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                placeholder="e.g. Languages"
              />
            </label>
            <button
              type="button"
              onClick={() => removeSkill(skill.id)}
              className="shrink-0 rounded-lg border border-rose-500/40 px-3 py-2 text-sm text-rose-300 hover:bg-rose-500/10 focus:outline-none focus:ring-2 focus:ring-rose-400"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
