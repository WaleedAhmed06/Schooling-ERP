import type { FeeVoucher } from "../types/parent.types";
export const feeTotal = (v: FeeVoucher) =>
  v.tuition + v.computer + v.transport - v.discount;
export const currency = (n: number) => `Rs. ${n.toLocaleString("en-PK")}`;
