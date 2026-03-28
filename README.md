# Resume Builder

A browser-only resume editor with a split layout: forms on the left, live preview on the right. Data persists in `localStorage` (auto-save). You can download a PDF generated from the preview (html2canvas + jsPDF).

## Requirements

- Node.js 20+ and npm (or compatible package manager)

## Install

```bash
cd resume
npm install
```

## Development

```bash
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

## Usage

- Switch sections with **Basic**, **Experience**, **Education**, and **Skills** tabs.
- Edits save automatically in this browser.
- **Download PDF** captures the white preview card and saves `resume.pdf`. For pixel-perfect output you can also use the browser’s **Print → Save as PDF** on the preview if needed.
- **Reset all** clears stored resume data after confirmation.

## Tech stack

Vite, React 19, TypeScript, Tailwind CSS, Zustand (persist), html2canvas, jsPDF.
