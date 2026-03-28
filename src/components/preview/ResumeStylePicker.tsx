import {
  RESUME_STYLE_OPTIONS,
  type ResumeStyleId,
} from "../../constants/resumeStyles";
import { useResumeStore } from "../../store/resumeStore";

const SELECT_CHEVRON =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23a78bfa' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")";

export function ResumeStylePicker() {
  const previewStyle = useResumeStore((s) => s.previewStyle);
  const setPreviewStyle = useResumeStore((s) => s.setPreviewStyle);

  return (
    <label className="flex flex-wrap items-center gap-2 text-sm text-slate-300">
      <span className="font-medium text-violet-200/90">PDF style</span>
      <select
        value={previewStyle}
        onChange={(e) => setPreviewStyle(e.target.value as ResumeStyleId)}
        style={{
          backgroundImage: SELECT_CHEVRON,
          backgroundPosition: "right calc(0.75rem + 5px) center",
        }}
        className="min-w-[9rem] appearance-none rounded-lg border border-violet-500/40 bg-slate-900 bg-[length:1rem] bg-no-repeat py-2 pl-3 pr-9 text-slate-100 shadow-inner focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
      >
        {RESUME_STYLE_OPTIONS.map(({ id, label }) => (
          <option key={id} value={id}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
}
