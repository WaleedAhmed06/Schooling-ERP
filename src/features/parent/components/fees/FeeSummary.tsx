import type { FeeVoucher } from "../../types/parent.types";
import { currency, feeTotal } from "../../utils/fees";
import { ParentPanel } from "../shared/ParentPanel";
export function FeeSummary({ vouchers }: { vouchers: FeeVoucher[] }) {
  const outstanding = vouchers
    .filter((v) => v.status === "Pending")
    .reduce((sum, v) => sum + feeTotal(v), 0);
  return (
    <div className="parent-cards">
      <ParentPanel title="Outstanding balance">
        <strong>{currency(outstanding)}</strong>
      </ParentPanel>
      <ParentPanel title="Paid vouchers">
        <strong>{vouchers.filter((v) => v.status === "Paid").length}</strong>
      </ParentPanel>
    </div>
  );
}
