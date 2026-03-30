import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import type { RefObject } from "react";
import { useCallback, useState } from "react";

/**
 * Top inset on each PDF page (mm). Balances print-safe headroom vs blank bands
 * above continuation slices in multi-block export.
 */
const TOP_MARGIN_MM = 12;

/**
 * Bottom inset so the last band of each page is not flush to the sheet edge
 * (avoids raster / JPEG clipping that showed as cut-off rows).
 */
const BOTTOM_MARGIN_MM = 9;

/**
 * Horizontal inset when placing each block raster — aligned with resume paper
 * padding (~18mm) plus a little extra so edges are not clipped when scaling.
 */
const SIDE_MARGIN_MM = 19.5;

/** Space between items inside the same section (e.g. jobs, schools). */
const GAP_MM = 2;

/** Extra space above each major section heading (Summary, Experience, …). */
const SECTION_GAP_MM = 6;

/**
 * Extra space between each major section `<h2>` and the ruler line under it
 * (`border-b` in the preview). Applied only during PDF capture via inline style;
 * does not change `resumeStyles.ts` or on-screen preview after export.
 */
const SECTION_RULER_GAP_MM = 1.7;

/** Float tolerance for height math. */
const FIT_EPSILON_MM = 0.35;

/**
 * Extra slack required vs. “available” height before we treat a block as
 * fitting on the current page (reduces bottom clipping from rounding).
 */
const BLOCK_FIT_BUFFER_MM = 8;

const RASTER_SCALE = 1.25;
const JPEG_QUALITY = 0.78;

interface PdfExportButtonProps {
  targetRef: RefObject<HTMLDivElement | null>;
}

function innerPageHeight(pageH: number): number {
  return pageH - TOP_MARGIN_MM - BOTTOM_MARGIN_MM;
}

function normalizeModulo(value: number, modulus: number): number {
  let m = value % modulus;
  if (m < 0) m += modulus;
  if (m < FIT_EPSILON_MM) return 0;
  if (modulus - m < FIT_EPSILON_MM) return 0;
  return m;
}

function canvasToJpegDataUrl(canvas: HTMLCanvasElement): string {
  return canvas.toDataURL("image/jpeg", JPEG_QUALITY);
}

/**
 * Adds SECTION_RULER_GAP_MM under the first `h2` in each PDF block (and every
 * `h2` when falling back to full-root capture). Returns a function that
 * restores previous inline `padding-bottom`.
 */
function applySectionRulerGapForPdfCapture(
  root: HTMLElement,
  gapMm: number
): () => void {
  const blocks = root.querySelectorAll<HTMLElement>("[data-pdf-block]");
  const h2List: HTMLElement[] = [];
  if (blocks.length > 0) {
    for (const block of blocks) {
      const h2 = block.querySelector<HTMLElement>("h2");
      if (h2) h2List.push(h2);
    }
  } else {
    h2List.push(...root.querySelectorAll<HTMLElement>("h2"));
  }

  const snapshots = h2List.map((el) => {
    const prev = el.style.paddingBottom;
    const computed = getComputedStyle(el).paddingBottom;
    el.style.paddingBottom = `calc(${computed} + ${gapMm}mm)`;
    return { el, prev };
  });

  return () => {
    for (const { el, prev } of snapshots) {
      el.style.paddingBottom = prev;
    }
  };
}

function addImageSlice(
  pdf: jsPDF,
  imgData: string,
  xMm: number,
  wMm: number,
  yMm: number,
  hMm: number
): void {
  pdf.addImage(imgData, "JPEG", xMm, yMm, wMm, hMm, undefined, "MEDIUM");
}

/**
 * Tile one tall image across pages. Uses explicit x/width so margins match
 * the chosen placement (full page vs content column).
 */
function addTiledJpegToPdf(
  pdf: jsPDF,
  imgData: string,
  pageH: number,
  xMm: number,
  wMm: number,
  imgHeightMm: number
): void {
  const innerH = innerPageHeight(pageH);
  let heightLeft = imgHeightMm;
  let yImg = TOP_MARGIN_MM;

  addImageSlice(pdf, imgData, xMm, wMm, yImg, imgHeightMm);
  heightLeft -= innerH;

  while (heightLeft > FIT_EPSILON_MM) {
    yImg -= innerH;
    pdf.addPage();
    addImageSlice(pdf, imgData, xMm, wMm, yImg, imgHeightMm);
    heightLeft -= innerH;
  }
}

/**
 * Place one block (may span multiple PDF pages). `yContentMm` is the vertical
 * offset in mm from the top of the printable area (below any top margin).
 */
function appendBlockToPdf(
  pdf: jsPDF,
  imgData: string,
  contentWmm: number,
  imgHeightMm: number,
  pageH: number,
  sideMm: number,
  yContentMm: number,
  gapBeforeMm: number
): number {
  const innerH = innerPageHeight(pageH);

  let y = yContentMm;
  if (y >= innerH - FIT_EPSILON_MM) {
    pdf.addPage();
    y = 0;
  } else if (gapBeforeMm > 0 && y > 0) {
    y += gapBeforeMm;
  }

  const availableOnPage = innerH - y;
  const drawY = TOP_MARGIN_MM + y;
  const slack =
    FIT_EPSILON_MM + BLOCK_FIT_BUFFER_MM;

  if (imgHeightMm <= availableOnPage - slack) {
    addImageSlice(pdf, imgData, sideMm, contentWmm, drawY, imgHeightMm);
    return y + imgHeightMm;
  }

  if (y > FIT_EPSILON_MM) {
    pdf.addPage();
    return appendBlockToPdf(
      pdf,
      imgData,
      contentWmm,
      imgHeightMm,
      pageH,
      sideMm,
      0,
      0
    );
  }

  let heightLeft = imgHeightMm;
  let yImg = TOP_MARGIN_MM;

  addImageSlice(pdf, imgData, sideMm, contentWmm, yImg, imgHeightMm);
  heightLeft -= innerH;

  while (heightLeft > FIT_EPSILON_MM) {
    yImg -= innerH;
    pdf.addPage();
    addImageSlice(pdf, imgData, sideMm, contentWmm, yImg, imgHeightMm);
    heightLeft -= innerH;
  }

  const remainder = normalizeModulo(imgHeightMm, innerH);
  return remainder === 0 ? innerH : remainder;
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
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const contentWmm = pageW - 2 * SIDE_MARGIN_MM;

      const blocks = Array.from(
        root.querySelectorAll<HTMLElement>("[data-pdf-block]")
      );

      const html2canvasOpts = {
        scale: RASTER_SCALE,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      } as const;

      const restoreRulerGap = applySectionRulerGapForPdfCapture(
        root,
        SECTION_RULER_GAP_MM
      );
      try {
        if (blocks.length === 0) {
          const canvas = await html2canvas(root, html2canvasOpts);
          const imgData = canvasToJpegDataUrl(canvas);
          const imgHeightMm = (canvas.height * pageW) / canvas.width;
          addTiledJpegToPdf(pdf, imgData, pageH, 0, pageW, imgHeightMm);
        } else {
          let yCursor = 0;
          for (let i = 0; i < blocks.length; i++) {
            const canvas = await html2canvas(blocks[i], html2canvasOpts);
            const imgData = canvasToJpegDataUrl(canvas);
            const imgHeightMm = (canvas.height * contentWmm) / canvas.width;
            const gapBefore =
              i === 0
                ? 0
                : blocks[i].hasAttribute("data-pdf-section-start")
                  ? SECTION_GAP_MM
                  : GAP_MM;
            yCursor = appendBlockToPdf(
              pdf,
              imgData,
              contentWmm,
              imgHeightMm,
              pageH,
              SIDE_MARGIN_MM,
              yCursor,
              gapBefore
            );
          }
        }

        pdf.save("resume.pdf");
      } finally {
        restoreRulerGap();
      }
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
