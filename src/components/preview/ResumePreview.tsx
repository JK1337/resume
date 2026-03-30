import { forwardRef } from "react";
import {
  RESUME_STYLE_TOKENS,
} from "../../constants/resumeStyles";
import { useResumeStore } from "../../store/resumeStore";

export const ResumePreview = forwardRef<HTMLDivElement>(function ResumePreview(
  _,
  ref
) {
  const basicInfo = useResumeStore((s) => s.basicInfo);
  const workExperience = useResumeStore((s) => s.workExperience);
  const education = useResumeStore((s) => s.education);
  const skills = useResumeStore((s) => s.skills);
  const previewStyle = useResumeStore((s) => s.previewStyle);

  const skillGroups = groupSkills(skills);
  const t = RESUME_STYLE_TOKENS[previewStyle];

  return (
    <div className="flex justify-center p-4 sm:p-6">
      <div
        ref={ref}
        className={`resume-paper w-full max-w-[210mm] ${t.paper}`}
        style={{
          minHeight: "297mm",
          padding: "14mm 18mm",
          ...t.paperInline,
        }}
      >
        <header className={t.header} data-pdf-block>
          <h1 className={t.name}>{basicInfo.fullName || "Your name"}</h1>
          {basicInfo.headline ? (
            <p className={t.headline}>{basicInfo.headline}</p>
          ) : null}
          <div className={t.contact}>
            {basicInfo.email ? <span>{basicInfo.email}</span> : null}
            {basicInfo.phone ? <span>{basicInfo.phone}</span> : null}
            {basicInfo.location ? <span>{basicInfo.location}</span> : null}
          </div>
        </header>

        {basicInfo.summary ? (
          <section
            className="mt-4"
            data-pdf-block
            data-pdf-section-start
          >
            <h2 className={t.sectionTitle}>Summary</h2>
            <p className={t.summaryText}>{basicInfo.summary}</p>
          </section>
        ) : null}

        {workExperience.some(
          (w) =>
            w.company ||
            w.title ||
            w.bullets.some((b) => b.trim()) ||
            w.startDate ||
            w.endDate
        ) ? (
          <section className="mt-5">
            <ul className="space-y-4">
              {workExperience.map((job, idx) => (
                <li
                  key={job.id}
                  data-pdf-block
                  {...(idx === 0 ? { "data-pdf-section-start": "" } : {})}
                >
                  {idx === 0 ? (
                    <h2 className={`${t.sectionTitle} mb-2`}>Experience</h2>
                  ) : null}
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <span className={t.jobTitle}>{job.title || "Role"}</span>
                      {job.company ? (
                        <span className={t.jobCompany}>
                          {" "}
                          — {job.company}
                          {job.location ? `, ${job.location}` : ""}
                        </span>
                      ) : null}
                    </div>
                    <span className={t.jobDates}>
                      {[job.startDate, job.endDate].filter(Boolean).join(" – ")}
                    </span>
                  </div>
                  <ul className={t.bulletList}>
                    {job.bullets
                      .map((b) => b.trim())
                      .filter(Boolean)
                      .map((b, i) => (
                        <li key={i} className={t.bulletItem}>
                          {b}
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {education.some(
          (e) =>
            e.institution ||
            e.degree ||
            e.field ||
            e.details ||
            e.startDate ||
            e.endDate
        ) ? (
          <section className="mt-5">
            <ul className="space-y-3">
              {education.map((edu, idx) => (
                <li
                  key={edu.id}
                  data-pdf-block
                  {...(idx === 0 ? { "data-pdf-section-start": "" } : {})}
                >
                  {idx === 0 ? (
                    <h2 className={`${t.sectionTitle} mb-2`}>Education</h2>
                  ) : null}
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <span className={t.eduInst}>
                        {edu.institution || "School"}
                      </span>
                      {(edu.degree || edu.field) && (
                        <div className={t.eduLine}>
                          {[edu.degree, edu.field].filter(Boolean).join(" — ")}
                        </div>
                      )}
                    </div>
                    <span className={t.eduDates}>
                      {[edu.startDate, edu.endDate].filter(Boolean).join(" – ")}
                    </span>
                  </div>
                  {edu.details.trim() ? (
                    <p className={t.eduDetails}>{edu.details}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {skills.some((s) => s.name.trim()) ? (
          <section
            className="mt-5"
            data-pdf-block
            data-pdf-section-start
          >
            <h2 className={t.sectionTitle}>Skills</h2>
            <div className="space-y-3">
              {skillGroups.map(([category, names]) => (
                <div key={category}>
                  {category !== "__default__" ? (
                    <p className={t.skillsCategory}>{category}</p>
                  ) : null}
                  <p
                    className={
                      category !== "__default__"
                        ? `${t.skillsLine} mt-1 pl-0`
                        : t.skillsLine
                    }
                  >
                    {names.join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
});

function groupSkills(
  skills: { name: string; category: string }[]
): [string, string[]][] {
  const map = new Map<string, string[]>();
  for (const s of skills) {
    const n = s.name.trim();
    if (!n) continue;
    const cat = s.category.trim() || "__default__";
    const list = map.get(cat) ?? [];
    list.push(n);
    map.set(cat, list);
  }
  return Array.from(map.entries());
}
