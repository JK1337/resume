import { useResumeStore } from "../../store/resumeStore";

const fields: {
  key: keyof import("../../types/resume").BasicInfo;
  label: string;
  multiline?: boolean;
}[] = [
  { key: "fullName", label: "Full name" },
  { key: "headline", label: "Headline" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "location", label: "Location" },
  { key: "summary", label: "Summary", multiline: true },
];

export function BasicInfoForm() {
  const basicInfo = useResumeStore((s) => s.basicInfo);
  const setBasicInfo = useResumeStore((s) => s.setBasicInfo);

  return (
    <div className="space-y-4 p-4">
      <h2 className="font-display text-lg font-semibold text-white">
        Basic information
      </h2>
      <p className="text-sm text-slate-400">
        Updates save automatically as you type.
      </p>
      {fields.map(({ key, label, multiline }) => (
        <label key={key} className="block">
          <span className="mb-1 block text-sm font-medium text-slate-300">
            {label}
          </span>
          {multiline ? (
            <textarea
              value={basicInfo[key]}
              onChange={(e) => setBasicInfo({ [key]: e.target.value })}
              rows={4}
              className="w-full rounded-lg border border-violet-500/30 bg-slate-900/80 px-3 py-2 text-slate-100 placeholder-slate-500 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              placeholder={`Your ${label.toLowerCase()}`}
            />
          ) : (
            <input
              type="text"
              value={basicInfo[key]}
              onChange={(e) => setBasicInfo({ [key]: e.target.value })}
              className="w-full rounded-lg border border-violet-500/30 bg-slate-900/80 px-3 py-2 text-slate-100 placeholder-slate-500 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              placeholder={`Your ${label.toLowerCase()}`}
            />
          )}
        </label>
      ))}
    </div>
  );
}
