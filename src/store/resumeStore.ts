import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  DEFAULT_RESUME_STYLE,
  type ResumeStyleId,
} from "../constants/resumeStyles";
import type { BasicInfo, Education, Skill, WorkExperience } from "../types/resume";
import {
  defaultBasicInfo,
  emptyEducation,
  emptySkill,
  emptyWork,
} from "../types/resume";

export type EditorSection = "basic" | "work" | "education" | "skills";

export interface ResumeState {
  basicInfo: BasicInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  activeSection: EditorSection;
  setActiveSection: (s: EditorSection) => void;
  setBasicInfo: (patch: Partial<BasicInfo>) => void;
  addWork: () => void;
  updateWork: (id: string, patch: Partial<WorkExperience>) => void;
  removeWork: (id: string) => void;
  updateWorkBullets: (id: string, bullets: string[]) => void;
  addEducation: () => void;
  updateEducation: (id: string, patch: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addSkill: () => void;
  updateSkill: (id: string, patch: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  previewStyle: ResumeStyleId;
  setPreviewStyle: (style: ResumeStyleId) => void;
}

const initialState = {
  basicInfo: { ...defaultBasicInfo },
  workExperience: [emptyWork()],
  education: [emptyEducation()],
  skills: [emptySkill()],
  activeSection: "basic" as EditorSection,
  previewStyle: DEFAULT_RESUME_STYLE,
};

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      ...initialState,
      setActiveSection: (activeSection) => set({ activeSection }),
      setBasicInfo: (patch) =>
        set((s) => ({ basicInfo: { ...s.basicInfo, ...patch } })),
      addWork: () =>
        set((s) => ({ workExperience: [...s.workExperience, emptyWork()] })),
      updateWork: (id, patch) =>
        set((s) => ({
          workExperience: s.workExperience.map((w) =>
            w.id === id ? { ...w, ...patch } : w
          ),
        })),
      removeWork: (id) =>
        set((s) => {
          const next = s.workExperience.filter((w) => w.id !== id);
          return {
            workExperience: next.length ? next : [emptyWork()],
          };
        }),
      updateWorkBullets: (id, bullets) =>
        set((s) => ({
          workExperience: s.workExperience.map((w) =>
            w.id === id ? { ...w, bullets } : w
          ),
        })),
      addEducation: () =>
        set((s) => ({
          education: [...s.education, emptyEducation()],
        })),
      updateEducation: (id, patch) =>
        set((s) => ({
          education: s.education.map((e) =>
            e.id === id ? { ...e, ...patch } : e
          ),
        })),
      removeEducation: (id) =>
        set((s) => {
          const next = s.education.filter((e) => e.id !== id);
          return { education: next.length ? next : [emptyEducation()] };
        }),
      addSkill: () =>
        set((s) => ({ skills: [...s.skills, emptySkill()] })),
      updateSkill: (id, patch) =>
        set((s) => ({
          skills: s.skills.map((sk) =>
            sk.id === id ? { ...sk, ...patch } : sk
          ),
        })),
      removeSkill: (id) =>
        set((s) => {
          const next = s.skills.filter((sk) => sk.id !== id);
          return { skills: next.length ? next : [emptySkill()] };
        }),
      setPreviewStyle: (previewStyle) => set({ previewStyle }),
    }),
    {
      name: "resume-builder-storage",
      partialize: (s) => ({
        basicInfo: s.basicInfo,
        workExperience: s.workExperience,
        education: s.education,
        skills: s.skills,
        previewStyle: s.previewStyle,
      }),
    }
  )
);
