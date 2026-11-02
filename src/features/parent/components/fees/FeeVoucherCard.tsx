"use client";
import type { FeeVoucher } from "../../types/parent.types";
import { currency, feeTotal } from "../../utils/fees";
import { downloadPdf } from "../../utils/pdf";
import { Receipt } from "./Receipt";
import { PaymentCheckout } from "./PaymentCheckout";
export function FeeVoucherCard({
  voucher,
  studentName,
  checkoutOpen,
  onCheckout,
  onClose,
}: {
  voucher: FeeVoucher;
  studentName: string;
  checkoutOpen: boolean;
  onCheckout: () => void;
  onClose: () => void;
}) {
  const downloadChallan = () =>
    downloadPdf(`challan-${voucher.id}.pdf`, "SCHOOL ERP - FEE CHALLAN", [
      `Student: ${studentName}`,
      `Month: ${voucher.month}`,
      `Due: ${voucher.dueDate}`,
      `Tuition: ${currency(voucher.tuition)}`,
      `Computer: ${currency(voucher.computer)}`,
      `Transport: ${currency(voucher.transport)}`,
      `Discount: ${currency(voucher.discount)}`,
      `Total: ${currency(feeTotal(voucher))}`,
      "DEMO CHALLAN",
    ]);
  return (
    <article className="parent-record">
      <div className="parent-record-title">
        <strong>{voucher.month}</strong>
        <span>{voucher.status}</span>
      </div>
      <p>Due: {voucher.dueDate}</p>
      <p>
        Tuition {currency(voucher.tuition)} · Computer{" "}
        {currency(voucher.computer)} · Transport {currency(voucher.transport)} ·
        Discount −{currency(voucher.discount)}
      </p>
      <strong>Total {currency(feeTotal(voucher))}</strong>
      <div className="parent-actions">
        <button type="button" className="secondary" onClick={downloadChallan}>
          Download Challan (PDF)
        </button>
        {voucher.status === "Pending" && (
          <button type="button" onClick={onCheckout}>
            Pay Now
          </button>
        )}
      </div>
      {checkoutOpen && <PaymentCheckout voucher={voucher} onClose={onClose} />}
      {voucher.status === "Paid" && (
        <Receipt voucher={voucher} studentName={studentName} />
      )}
    </article>
  );
}
