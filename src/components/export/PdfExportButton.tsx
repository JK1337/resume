import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import type { RefObject } from "react";
import { useCallback, useState } from "react";

/** ~20 CSS px at 96dpi → mm (minimum top margin on every PDF page). */
const TOP_MARGIN_MM = (20 * 25.4) / 96;

/**
 * Small gap between stacked blocks (mm). Keep small to avoid white bands that
 * look like they overlap or split text.
 */
const GAP_MM = 0.5;

/** Tolerance for float / raster rounding so we do not clip or double-place content. */
const FIT_EPSILON_MM = 0.35;

interface PdfExportButtonProps {
  targetRef: RefObject<HTMLDivElement | null>;
}

function innerPageHeight(pageH: number): number {
  return pageH - TOP_MARGIN_MM;
}

function normalizeModulo(value: number, modulus: number): number {
  let m = value % modulus;
  if (m < 0) m += modulus;
  if (m < FIT_EPSILON_MM) return 0;
  if (modulus - m < FIT_EPSILON_MM) return 0;
  return m;
}

/**
 * Draw one rasterized block. `yContentMm` is the vertical offset inside the
 * content area (below {@link TOP_MARGIN_MM}), 0 … innerPageHeight.
 * Returns the content-space Y after this block (bottom edge), or `innerH` when
 * the last stripe filled the content area exactly.
 */
function appendBlockToPdf(
  pdf: jsPDF,
  canvas: HTMLCanvasElement,
  pageW: number,
  pageH: number,
  yContentMm: number,
  addGapBefore: boolean
): number {
  const innerH = innerPageHeight(pageH);
  const imgData = canvas.toDataURL("image/png");
  const imgWidthMm = pageW;
  const imgHeightMm = (canvas.height * imgWidthMm) / canvas.width;

  let y = yContentMm;
  if (y >= innerH - FIT_EPSILON_MM) {
    pdf.addPage();
    y = 0;
  } else if (addGapBefore && y > 0) {
    y += GAP_MM;
  }

  const availableOnPage = innerH - y;
  const drawY = TOP_MARGIN_MM + y;

  if (imgHeightMm <= availableOnPage - FIT_EPSILON_MM) {
    pdf.addImage(imgData, "PNG", 0, drawY, imgWidthMm, imgHeightMm);
    return y + imgHeightMm;
  }

  if (y > FIT_EPSILON_MM) {
    pdf.addPage();
    return appendBlockToPdf(pdf, canvas, pageW, pageH, 0, false);
  }

  let heightLeft = imgHeightMm;
  let yImg = TOP_MARGIN_MM;

  pdf.addImage(imgData, "PNG", 0, yImg, imgWidthMm, imgHeightMm);
  heightLeft -= innerH;

  while (heightLeft > FIT_EPSILON_MM) {
    yImg -= innerH;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, yImg, imgWidthMm, imgHeightMm);
    heightLeft -= innerH;
  }

  const remainder = normalizeModulo(imgHeightMm, innerH);
  return remainder === 0 ? innerH : remainder;
}

/** Full-document capture: tile using the same top margin and content height. */
function addTiledImageToPdf(
  pdf: jsPDF,
  imgData: string,
  pageW: number,
  pageH: number,
  imgHeightMm: number
): void {
  const innerH = innerPageHeight(pageH);
  let heightLeft = imgHeightMm;
  let yImg = TOP_MARGIN_MM;

  pdf.addImage(imgData, "PNG", 0, yImg, pageW, imgHeightMm);
  heightLeft -= innerH;

  while (heightLeft > FIT_EPSILON_MM) {
    yImg -= innerH;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, yImg, pageW, imgHeightMm);
    heightLeft -= innerH;
  }
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
        const imgHeightMm = (canvas.height * pageW) / canvas.width;
        addTiledImageToPdf(pdf, imgData, pageW, pageH, imgHeightMm);
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
        yCursor = appendBlockToPdf(
          pdf,
          canvas,
          pageW,
          pageH,
          yCursor,
          addGap
        );
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
