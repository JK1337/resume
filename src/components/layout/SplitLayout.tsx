import type { ReactNode } from "react";

interface SplitLayoutProps {
  editor: ReactNode;
  preview: ReactNode;
}

export function SplitLayout({ editor, preview }: SplitLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-0">
      <div className="flex min-h-[50vh] flex-col border-b border-violet-500/20 lg:min-h-screen lg:border-b-0 lg:border-r">
        {editor}
      </div>
      <div className="min-h-[50vh] flex-1 bg-slate-900/50 lg:min-h-screen">{preview}</div>
    </div>
  );
}
