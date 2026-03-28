import { useRef } from "react";
import { EditorPanel } from "./components/editor/EditorPanel";
import { PdfExportButton } from "./components/export/PdfExportButton";
import { SplitLayout } from "./components/layout/SplitLayout";
import { ResumePreview } from "./components/preview/ResumePreview";
import { ResumeStylePicker } from "./components/preview/ResumeStylePicker";

function App() {
  const previewRef = useRef<HTMLDivElement>(null);

  return (
    <SplitLayout
      editor={<EditorPanel />}
      preview={
        <div className="flex h-full min-h-0 flex-col">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-slate-950/80 px-4 py-3">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-violet-200/90">
              Live preview
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              <ResumeStylePicker />
              <PdfExportButton targetRef={previewRef} />
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">
            <ResumePreview ref={previewRef} />
          </div>
        </div>
      }
    />
  );
}

export default App;
