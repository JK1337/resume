import type { ReactNode } from "react";

interface SplitLayoutProps {
  editor: ReactNode;
  preview: ReactNode;
}

export function SplitLayout({ editor, preview }: SplitLayoutProps) {
  return (
    <div className="flex h-full min-h-0 flex-1 flex-col lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-0">
      <div className="flex min-h-[40vh] flex-col border-b border-violet-500/20 lg:min-h-0 lg:border-b-0 lg:border-r">
        {editor}
      </div>
      <div className="flex min-h-[40vh] flex-1 flex-col bg-slate-900/50 lg:min-h-0">
        {preview}
      </div>
    </div>
  );
}
