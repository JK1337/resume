import { useResumeStore } from "../../store/resumeStore";
import { BasicInfoForm } from "./BasicInfoForm";
import { EducationSection } from "./EducationSection";
import { SectionTabs } from "./SectionTabs";
import { SkillsSection } from "./SkillsSection";
import { WorkExperienceSection } from "./WorkExperienceSection";

export function EditorPanel() {
  const activeSection = useResumeStore((s) => s.activeSection);
  const setActiveSection = useResumeStore((s) => s.setActiveSection);

  return (
    <div className="flex h-full min-h-0 flex-col bg-gradient-to-b from-slate-950 via-violet-950/30 to-slate-950">
      <header className="border-b border-white/10 bg-slate-950/90 px-4 py-4 backdrop-blur">
        <h1 className="font-display text-xl font-bold tracking-tight text-white">
          Resume Builder
        </h1>
        <p className="mt-1 text-sm text-violet-200/80">
          Edits auto-save in this browser. Export when you are ready.
        </p>
      </header>
      <SectionTabs active={activeSection} onChange={setActiveSection} />
      <div className="min-h-0 flex-1 overflow-y-auto">
        {activeSection === "basic" && <BasicInfoForm />}
        {activeSection === "work" && <WorkExperienceSection />}
        {activeSection === "education" && <EducationSection />}
        {activeSection === "skills" && <SkillsSection />}
      </div>
    </div>
  );
}
