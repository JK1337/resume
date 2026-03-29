import { useMemo, useState, type FormEvent } from "react";
import { MOCK_JOBS, type JobListing } from "../data/mockJobs";

function jobMatches(job: JobListing, query: string, locationQ: string): boolean {
  const lq = locationQ.trim().toLowerCase();
  if (lq && !job.location.toLowerCase().includes(lq)) return false;

  const q = query.trim().toLowerCase();
  if (!q) return true;

  const blob = [
    job.title,
    job.company,
    job.location,
    job.description,
    job.workStyle,
    ...job.tags,
  ]
    .join(" ")
    .toLowerCase();

  const words = q.split(/\s+/).filter(Boolean);
  if (words.length === 0) return true;
  return words.every((w) => blob.includes(w));
}

export function BrowseJobsPage() {
  const [query, setQuery] = useState("");
  const [locationQ, setLocationQ] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [submittedLocation, setSubmittedLocation] = useState("");

  const results = useMemo(() => {
    return MOCK_JOBS.filter((job) =>
      jobMatches(job, submittedQuery, submittedLocation)
    );
  }, [submittedQuery, submittedLocation]);

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    setSubmittedQuery(query);
    setSubmittedLocation(locationQ);
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="shrink-0 bg-gradient-to-b from-slate-950 via-violet-950/30 to-slate-950">
        <header className="border-b border-white/10 bg-slate-950/90 px-4 py-4 backdrop-blur sm:px-6">
          <h1 className="font-display text-xl font-bold tracking-tight text-white">
            Find a role
          </h1>
          <p className="mt-1 text-sm text-violet-200/80">
            Search sample listings. Try keywords like React, remote, or Berlin.
          </p>
        </header>

        <form
          onSubmit={handleSearch}
          className="space-y-4 p-4 sm:px-6 sm:pb-6"
          role="search"
          aria-label="Job search"
        >
          <div className="grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
            <label className="block min-w-0 sm:col-span-1">
              <span className="mb-1 block text-sm font-medium text-slate-300">
                Keywords
              </span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Title, company, skills…"
                className="w-full rounded-lg border border-violet-500/30 bg-slate-900/80 px-3 py-2.5 text-slate-100 placeholder-slate-500 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                autoComplete="off"
              />
            </label>
            <label className="block min-w-0 sm:col-span-1">
              <span className="mb-1 block text-sm font-medium text-slate-300">
                Location
              </span>
              <input
                type="text"
                value={locationQ}
                onChange={(e) => setLocationQ(e.target.value)}
                placeholder="City, country, or remote"
                className="w-full rounded-lg border border-violet-500/30 bg-slate-900/80 px-3 py-2.5 text-slate-100 placeholder-slate-500 focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                autoComplete="off"
              />
            </label>
            <div className="flex sm:pb-0.5">
              <button
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-fuchsia-600 to-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-900/50 transition hover:from-fuchsia-500 hover:to-violet-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:ring-offset-2 focus:ring-offset-slate-950 sm:w-auto"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto bg-slate-100">
        <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
          <p className="mb-4 text-sm text-slate-600">
            {results.length === MOCK_JOBS.length &&
            !submittedQuery &&
            !submittedLocation ? (
              <>Showing all {MOCK_JOBS.length} listings — use search to narrow.</>
            ) : (
              <>
                {results.length} result{results.length === 1 ? "" : "s"}
                {submittedQuery || submittedLocation ? (
                  <>
                    {" "}
                    for
                    {submittedQuery ? (
                      <>
                        {" "}
                        <span className="font-medium text-slate-800">
                          “{submittedQuery}”
                        </span>
                      </>
                    ) : null}
                    {submittedQuery && submittedLocation ? " · " : null}
                    {submittedLocation ? (
                      <span className="font-medium text-slate-800">
                        {submittedQuery ? "" : " "}
                        {submittedLocation}
                      </span>
                    ) : null}
                  </>
                ) : null}
              </>
            )}
          </p>

          <ul className="space-y-4">
            {results.map((job) => (
              <li key={job.id}>
                <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="font-display text-lg font-semibold text-slate-900">
                        {job.title}
                      </h2>
                      <p className="mt-0.5 text-sm font-medium text-violet-800">
                        {job.company}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                      {job.workStyle}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-slate-600">
                    <span>{job.location}</span>
                    <span className="text-slate-400">·</span>
                    <span>{job.posted}</span>
                    {job.salaryRange ? (
                      <>
                        <span className="text-slate-400">·</span>
                        <span className="text-slate-700">{job.salaryRange}</span>
                      </>
                    ) : null}
                  </div>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-md bg-violet-50 px-2 py-0.5 text-xs font-medium text-violet-900"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 border-t border-slate-100 pt-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Description
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      {job.description}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          {results.length === 0 ? (
            <p className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-sm text-slate-600">
              No jobs match your search. Try different keywords or clear
              location.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
