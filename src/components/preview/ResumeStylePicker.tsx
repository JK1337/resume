import {
  RESUME_STYLE_OPTIONS,
  type ResumeStyleId,
} from "../../constants/resumeStyles";
import { useResumeStore } from "../../store/resumeStore";

export function ResumeStylePicker() {
  const previewStyle = useResumeStore((s) => s.previewStyle);
  const setPreviewStyle = useResumeStore((s) => s.setPreviewStyle);

  return (
    <label className="flex flex-wrap items-center gap-2 text-sm text-slate-300">
      <span className="font-medium text-violet-200/90">PDF style</span>
      <select
        value={previewStyle}
        onChange={(e) => setPreviewStyle(e.target.value as ResumeStyleId)}
        className="min-w-[9rem] rounded-lg border border-violet-500/40 bg-slate-900 px-3 py-2 text-slate-100 shadow-inner focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
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
