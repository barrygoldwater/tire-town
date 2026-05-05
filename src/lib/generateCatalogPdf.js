import { jsPDF } from "jspdf";
import inventory from "@/lib/inventory";

const PRIMARY = [82, 115, 51]; // #527333
const GRAY_BG = [244, 244, 243]; // #f4f4f3
const DARK = [10, 10, 10];
const MID = [83, 83, 83];
const LIGHT_BORDER = [220, 220, 220];

function addPageFooter(doc, pageNum, totalPages) {
  const y = doc.internal.pageSize.height - 10;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(...MID);
  doc.text(
    `Affordable Tires · 619-954-0034 · Page ${pageNum} of ${totalPages}`,
    doc.internal.pageSize.width / 2,
    y,
    { align: "center" }
  );
}

function drawTable(doc, head, rows, startY) {
  const colWidths = head.map(() => (doc.internal.pageSize.width - 28) / head.length);
  const pageW = doc.internal.pageSize.width;
  const pageH = doc.internal.pageSize.height;
  const marginLeft = 14;
  const rowH = 7;
  const headerH = 9;

  let y = startY;

  // Header row
  doc.setFillColor(...DARK);
  doc.rect(marginLeft, y, pageW - 28, headerH, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  head.forEach((h, i) => {
    const x = marginLeft + colWidths.slice(0, i).reduce((a, b) => a + b, 0);
    doc.text(h.toUpperCase(), x + 3, y + 6);
  });
  y += headerH;

  let lastBrand = null;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);

  rows.forEach((row) => {
    // Brand group header
    if (row[0] !== lastBrand) {
      if (y + rowH > pageH - 18) {
        doc.addPage();
        y = 20;
      }
      lastBrand = row[0];
      doc.setFillColor(...GRAY_BG);
      doc.rect(marginLeft, y, pageW - 28, rowH, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(...PRIMARY);
      doc.text(lastBrand.toUpperCase(), marginLeft + 3, y + 5);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(...DARK);
      y += rowH;
    }

    if (y + rowH > pageH - 18) {
      doc.addPage();
      y = 20;
      lastBrand = null; // re-print brand header on new page
    }

    // Alternating row bg
    doc.setFillColor(255, 255, 255);
    doc.rect(marginLeft, y, pageW - 28, rowH, "F");

    // Bottom border
    doc.setDrawColor(...LIGHT_BORDER);
    doc.line(marginLeft, y + rowH, marginLeft + pageW - 28, y + rowH);

    doc.setTextColor(...DARK);
    row.slice(1).forEach((cell, i) => {
      const x = marginLeft + colWidths.slice(0, i + 1).reduce((a, b) => a + b, 0);
      const text = cell != null ? String(cell) : "—";
      doc.text(text, x + 3, y + 5, { maxWidth: colWidths[i + 1] - 4 });
    });
    y += rowH;
  });

  return y;
}

export function generateCatalogPdf() {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "letter" });
  const pw = doc.internal.pageSize.width;

  // ── COVER PAGE ──────────────────────────────────────────────────────────
  doc.setFillColor(...DARK);
  doc.rect(0, 0, pw, 297, "F");

  // Green accent bar
  doc.setFillColor(...PRIMARY);
  doc.rect(0, 0, 6, 297, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(42);
  doc.setTextColor(250, 250, 250);
  doc.text("AFFORDABLE", pw / 2, 90, { align: "center" });
  doc.setFontSize(22);
  doc.setTextColor(...PRIMARY);
  doc.text("TIRES", pw / 2, 104, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(13);
  doc.setTextColor(180, 180, 180);
  doc.text("June 2026 Catalog", pw / 2, 122, { align: "center" });

  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  doc.text("Wholesale Golf Cart Wheels & Tires", pw / 2, 134, { align: "center" });

  doc.setFontSize(9);
  doc.text("Call 619-954-0034  ·  Family-Owned Since 1976", pw / 2, 148, { align: "center" });

  // Brand list
  const brands = ["Excel", "Achieva", "Arisun", "Wanda", "Innova", "Wheel Mate", "Carlisle", "Galaxy", "ITP"];
  doc.setFontSize(8);
  doc.setTextColor(90, 90, 90);
  doc.text("Authorized Distributor · " + brands.join(" · "), pw / 2, 168, { align: "center", maxWidth: pw - 28 });

  // ── WHEELS SECTION ───────────────────────────────────────────────────────
  doc.addPage();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(...DARK);
  doc.text("WHEELS", 14, 20);
  doc.setFillColor(...PRIMARY);
  doc.rect(14, 23, 30, 1.5, "F");

  const wheelHead = ["Brand", "Model", "Size", "Finish / Bolt", "Part Number", "Offset"];
  const wheelRows = [];
  inventory.wheels.forEach((w) => {
    w.variants.forEach((v) => {
      wheelRows.push([
        w.brand,
        w.model,
        v.size || "—",
        v.finish || "—",
        v.part_number || "—",
        v.offset || "—",
      ]);
    });
  });
  // Sort by brand
  wheelRows.sort((a, b) => a[0].localeCompare(b[0]));

  drawTable(doc, wheelHead, wheelRows, 30);

  // ── TIRES SECTION ────────────────────────────────────────────────────────
  doc.addPage();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(...DARK);
  doc.text("TIRES", 14, 20);
  doc.setFillColor(...PRIMARY);
  doc.rect(14, 23, 24, 1.5, "F");

  const tireHead = ["Brand", "Model", "Size", "Type", "Part Number", "Load"];
  const tireRows = [];
  inventory.tires.forEach((t) => {
    t.variants.forEach((v) => {
      tireRows.push([
        t.brand,
        t.model,
        v.size || "—",
        t.type || "—",
        v.part_number || "—",
        v.load_rating || v.ply || "—",
      ]);
    });
  });
  tireRows.sort((a, b) => a[0].localeCompare(b[0]));

  drawTable(doc, tireHead, tireRows, 30);

  // ── CONTACT PAGE ─────────────────────────────────────────────────────────
  doc.addPage();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(...DARK);
  doc.text("CONTACT", 14, 20);
  doc.setFillColor(...PRIMARY);
  doc.rect(14, 23, 36, 1.5, "F");

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...MID);
  doc.text("For pricing, availability, and wholesale programs:", 14, 36);

  const contacts = [
    { role: "Sales", name: "John Gregory", phone: "619-954-0034" },
    { role: "Turf / Golf", name: "Joe Landis", phone: "623-258-8277" },
  ];
  contacts.forEach((c, i) => {
    const y = 50 + i * 22;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...MID);
    doc.text(c.role.toUpperCase(), 14, y);
    doc.setFontSize(13);
    doc.setTextColor(...DARK);
    doc.text(c.name, 14, y + 7);
    doc.setFontSize(11);
    doc.setTextColor(...PRIMARY);
    doc.text(c.phone, 14, y + 14);
  });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...MID);
  doc.text("Same-day quotes · Dealer pricing · Net terms available · Ships nationwide", 14, 110);

  doc.setFontSize(8);
  doc.text("Authorized Distributor: " + brands.join(", "), 14, 122, { maxWidth: pw - 28 });

  // ── PAGE FOOTERS ─────────────────────────────────────────────────────────
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 2; i <= totalPages; i++) {
    doc.setPage(i);
    addPageFooter(doc, i - 1, totalPages - 1);
  }

  doc.save("Affordable-Tires-Catalog-June-2026.pdf");
}