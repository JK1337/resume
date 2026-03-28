export interface BasicInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  headline: string;
  summary: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  details: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
}

export const defaultBasicInfo: BasicInfo = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  headline: "",
  summary: "",
};

export function emptyWork(): WorkExperience {
  return {
    id: crypto.randomUUID(),
    company: "",
    title: "",
    location: "",
    startDate: "",
    endDate: "",
    bullets: [""],
  };
}

export function emptyEducation(): Education {
  return {
    id: crypto.randomUUID(),
    institution: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
    details: "",
  };
}

export function emptySkill(): Skill {
  return {
    id: crypto.randomUUID(),
    name: "",
    category: "",
  };
}
