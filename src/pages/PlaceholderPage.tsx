interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col items-center justify-center bg-slate-50 px-6 py-16 text-center">
      <h1 className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600">
          {description}
        </p>
      ) : (
        <p className="mt-3 max-w-md text-sm text-slate-500">
          This section is coming soon.
        </p>
      )}
    </div>
  );
}
