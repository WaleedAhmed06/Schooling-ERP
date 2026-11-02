/** Minimal one-page, text-only PDF for offline demo downloads; no third-party runtime dependency. */
function ascii(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[^\x20-\x7E]/g, "?")
    .replace(/[\\()]/g, (c) => "\\" + c);
}
export function downloadPdf(filename: string, title: string, lines: string[]) {
  const content = [
    "BT",
    "/F1 18 Tf",
    "48 785 Td",
    `(${ascii(title)}) Tj`,
    "/F1 11 Tf",
  ];
  for (const line of lines.slice(0, 42)) {
    content.push("0 -18 Td", `(${ascii(line).slice(0, 110)}) Tj`);
  }
  content.push("ET");
  const stream = content.join("\n") + "\n";
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${stream.length} >>\nstream\n${stream}endstream`,
  ];
  let result = "%PDF-1.4\n";
  const offsets = [0];
  for (let i = 0; i < objects.length; i++) {
    offsets.push(result.length);
    result += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`;
  }
  const xref = result.length;
  result += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const offset of offsets.slice(1))
    result += `${String(offset).padStart(10, "0")} 00000 n \n`;
  result += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  const url = URL.createObjectURL(
    new Blob([result], { type: "application/pdf" }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
