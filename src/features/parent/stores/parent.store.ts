"use client";
import { create } from "zustand";
import type { ParentData, PaymentMethod } from "../types/parent.types";
import { parentSeed } from "../data/parent.seed";
import { parentRepository } from "../services/parent.service";
type State = {
  selectedChildId: string;
  hydrated: boolean;
  data: ParentData;
  initialize: () => void;
  selectChild: (id: string) => void;
  pay: (voucherId: string, method: PaymentMethod) => string | null;
  sendMessage: (studentId: string, to: string, body: string) => void;
};
export const useParentStore = create<State>((set, get) => ({
  selectedChildId: "s1",
  hydrated: false,
  data: parentSeed,
  initialize: () => {
    set({ data: parentRepository.load(), hydrated: true });
  },
  selectChild: (id) => set({ selectedChildId: id }),
  pay: (voucherId, method) => {
    const voucher = get().data.vouchers.find((v) => v.id === voucherId);
    if (!voucher || voucher.status === "Paid") return null;
    const transactionId = `DEMO-${Date.now()}-${Math.floor(Math.random() * 900 + 100)}`;
    const data = {
      ...get().data,
      vouchers: get().data.vouchers.map((v) =>
        v.id === voucherId
          ? {
              ...v,
              status: "Paid" as const,
              method,
              transactionId,
              paidAt: new Date().toISOString(),
            }
          : v,
      ),
    };
    parentRepository.save(data);
    set({ data });
    if (typeof window !== "undefined")
      window.dispatchEvent(new Event("school-erp:parent-updated"));
    return transactionId;
  },
  sendMessage: (studentId, to, body) => {
    const data = {
      ...get().data,
      messages: [
        {
          id: `msg-${Date.now()}`,
          studentId,
          to,
          body,
          from: "Parent" as const,
          createdAt: new Date().toISOString(),
        },
        ...get().data.messages,
      ],
    };
    parentRepository.save(data);
    set({ data });
    if (typeof window !== "undefined")
      window.dispatchEvent(new Event("school-erp:parent-updated"));
  },
}));
