"use client";
import { useState } from "react";
import { useParentPortal } from "../../hooks/useParentPortal";
import { ParentPage, ParentPanel } from "../shared/ParentPanel";
import { ChildSelector } from "../shared/ChildSelector";
import { FeeSummary } from "./FeeSummary";
import { FeeVoucherCard } from "./FeeVoucherCard";
import { FeeHistory } from "./FeeHistory";
export function FeesPage() {
  const { child, data } = useParentPortal();
  const [checkout, setCheckout] = useState<string | null>(null);
  const vouchers = data.vouchers.filter((v) => v.studentId === child.id);
  return (
    <ParentPage
      title="Fees & Payments"
      description="Fee vouchers, breakdowns, simulated payments and transaction history."
    >
      <ChildSelector />
      <FeeSummary vouchers={vouchers} />
      <ParentPanel title="Monthly Fee Vouchers">
        {vouchers.map((v) => (
          <FeeVoucherCard
            key={v.id}
            voucher={v}
            studentName={child.name}
            checkoutOpen={checkout === v.id}
            onCheckout={() => setCheckout(v.id)}
            onClose={() => setCheckout(null)}
          />
        ))}
      </ParentPanel>
      <FeeHistory vouchers={vouchers} />
    </ParentPage>
  );
}
