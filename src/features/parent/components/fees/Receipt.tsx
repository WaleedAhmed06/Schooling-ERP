"use client";
import type { FeeVoucher } from "../../types/parent.types";
import { currency, feeTotal } from "../../utils/fees";
import { downloadPdf } from "../../utils/pdf";
export function Receipt({
  voucher,
  studentName,
}: {
  voucher: FeeVoucher;
  studentName: string;
}) {
  const download = () =>
    downloadPdf(`receipt-${voucher.id}.pdf`, "SCHOOL ERP - PAYMENT RECEIPT", [
      `Student: ${studentName}`,
      `Month: ${voucher.month}`,
      `Amount: ${currency(feeTotal(voucher))}`,
      `Method: ${voucher.method}`,
      `Transaction: ${voucher.transactionId}`,
      `Paid at: ${voucher.paidAt}`,
      "DEMO PAYMENT - NO REAL FUNDS TRANSFERRED",
    ]);
  return (
    <div className="parent-record">
      <strong>Payment confirmed</strong>
      <p>Transaction: {voucher.transactionId}</p>
      <p>
        Amount: {currency(feeTotal(voucher))} · {voucher.method}
      </p>
      <button type="button" onClick={download}>
        Download Receipt (PDF)
      </button>
    </div>
  );
}
