import type { EditorSection } from "../../store/resumeStore";

const SECTIONS: { id: EditorSection; label: string; accent: string }[] = [
  { id: "basic", label: "Basic", accent: "from-violet-500 to-fuchsia-500" },
  { id: "work", label: "Experience", accent: "from-cyan-500 to-blue-500" },
  { id: "education", label: "Education", accent: "from-amber-500 to-orange-500" },
  { id: "skills", label: "Skills", accent: "from-emerald-500 to-teal-500" },
];

interface SectionTabsProps {
  active: EditorSection;
  onChange: (s: EditorSection) => void;
}

export function SectionTabs({ active, onChange }: SectionTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 border-b border-white/10 bg-slate-900/80 p-3">
      {SECTIONS.map(({ id, label, accent }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2 focus:ring-offset-slate-900 ${
              isActive
                ? `bg-gradient-to-r ${accent} text-white shadow-lg shadow-violet-900/40`
                : "bg-slate-800/80 text-slate-300 hover:bg-slate-700/80"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
