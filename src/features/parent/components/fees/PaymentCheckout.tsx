"use client";
import { useState } from "react";
import type { FeeVoucher, PaymentMethod } from "../../types/parent.types";
import { useParentStore } from "../../stores/parent.store";
import { currency, feeTotal } from "../../utils/fees";
export function PaymentCheckout({
  voucher,
  onClose,
}: {
  voucher: FeeVoucher;
  onClose: () => void;
}) {
  const pay = useParentStore((s) => s.pay);
  const [method, setMethod] = useState<PaymentMethod>("Credit/Debit Card");
  const [error, setError] = useState("");
  return (
    <div className="parent-checkout">
      <h3>Simulated Checkout</h3>
      <p>
        Pay {currency(feeTotal(voucher))} for {voucher.month}
      </p>
      <label>
        Payment method{" "}
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value as PaymentMethod)}
        >
          {(
            [
              "Credit/Debit Card",
              "Bank Transfer",
              "JazzCash",
              "Easypaisa",
            ] as const
          ).map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </label>
      <p className="parent-disclaimer">
        Demo only — no real money is charged and no payment details are
        collected.
      </p>
      <div className="parent-actions">
        <button
          onClick={() => {
            const id = pay(voucher.id, method);
            if (id) onClose();
            else setError("Unable to process this demo payment.");
          }}
        >
          Confirm Demo Payment
        </button>
        <button className="secondary" onClick={onClose}>
          Cancel
        </button>
      </div>
      {error && <p role="alert">{error}</p>}
    </div>
  );
}
