import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import type { RefObject } from "react";
import { useCallback, useState } from "react";

const GAP_MM = 2;

interface PdfExportButtonProps {
  targetRef: RefObject<HTMLDivElement | null>;
}

/** Draw one rasterized block on the PDF, starting at `yMm`. Returns the Y position after this block (bottom edge + optional gap). */
function appendBlockToPdf(
  pdf: jsPDF,
  canvas: HTMLCanvasElement,
  pageW: number,
  pageH: number,
  yMm: number,
  addGapBefore: boolean
): number {
  const imgData = canvas.toDataURL("image/png");
  const imgWidthMm = pageW;
  const imgHeightMm = (canvas.height * imgWidthMm) / canvas.width;

  let y = yMm;
  if (addGapBefore && y > 0) {
    y += GAP_MM;
  }

  const availableOnPage = pageH - y;

  // Fits on current page
  if (imgHeightMm <= availableOnPage + 0.5) {
    pdf.addImage(imgData, "PNG", 0, y, imgWidthMm, imgHeightMm);
    return y + imgHeightMm;
  }

  // Start on a fresh page if there is not enough room and we're not at top
  if (y > 0.5) {
    pdf.addPage();
    y = 0;
    return appendBlockToPdf(pdf, canvas, pageW, pageH, y, false);
  }

  // Block taller than one page: tile vertically (same approach as full-page slice)
  let heightLeft = imgHeightMm;
  let position = 0;

  pdf.addImage(imgData, "PNG", 0, position, imgWidthMm, imgHeightMm);
  heightLeft -= pageH;

  while (heightLeft > 0) {
    position -= pageH;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidthMm, imgHeightMm);
    heightLeft -= pageH;
  }

  return 0;
}

export function PdfExportButton({ targetRef }: PdfExportButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const exportPdf = useCallback(async () => {
    const root = targetRef.current;
    if (!root) {
      setError("Preview not ready.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const blocks = Array.from(
        root.querySelectorAll<HTMLElement>("[data-pdf-block]")
      );

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();

      if (blocks.length === 0) {
        const canvas = await html2canvas(root, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: "#ffffff",
        });
        const imgData = canvas.toDataURL("image/png");
        const imgHeight = (canvas.height * pageW) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
        pdf.addImage(imgData, "PNG", 0, position, pageW, imgHeight);
        heightLeft -= pageH;
        while (heightLeft > 0) {
          position -= pageH;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, pageW, imgHeight);
          heightLeft -= pageH;
        }
        pdf.save("resume.pdf");
        return;
      }

      let yCursor = 0;
      for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        const canvas = await html2canvas(block, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: "#ffffff",
        });
        const addGap = i > 0;
        yCursor = appendBlockToPdf(pdf, canvas, pageW, pageH, yCursor, addGap);
      }

      pdf.save("resume.pdf");
    } catch (e) {
      console.error(e);
      setError("Could not create PDF. Try again or use Print to PDF.");
    } finally {
      setLoading(false);
    }
  }, [targetRef]);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => void exportPdf()}
        disabled={loading}
        className="rounded-lg bg-gradient-to-r from-fuchsia-600 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-900/50 transition hover:from-fuchsia-500 hover:to-violet-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-60"
      >
        {loading ? "Generating…" : "Download PDF"}
      </button>
      {error ? (
        <p className="text-sm text-amber-300" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
