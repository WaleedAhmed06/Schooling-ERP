import type { FeeVoucher } from "../../types/parent.types";
import { currency, feeTotal } from "../../utils/fees";
import { ParentPanel } from "../shared/ParentPanel";
export function FeeHistory({ vouchers }: { vouchers: FeeVoucher[] }) {
  return (
    <ParentPanel title="Transaction History">
      {vouchers
        .filter((v) => v.status === "Paid")
        .map((v) => (
          <p key={v.id}>
            {v.month} · {currency(feeTotal(v))} · {v.method} · {v.transactionId}
          </p>
        ))}
    </ParentPanel>
  );
}
