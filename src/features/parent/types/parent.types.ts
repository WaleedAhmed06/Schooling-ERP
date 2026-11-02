export type PaymentMethod =
  "Credit/Debit Card" | "Bank Transfer" | "JazzCash" | "Easypaisa";
export type PaymentStatus = "Pending" | "Paid";
export interface FeeVoucher {
  id: string;
  studentId: string;
  month: string;
  dueDate: string;
  tuition: number;
  computer: number;
  transport: number;
  discount: number;
  status: PaymentStatus;
  transactionId?: string;
  paidAt?: string;
  method?: PaymentMethod;
}
export interface ParentMessage {
  id: string;
  studentId: string;
  to: string;
  body: string;
  from: "Parent" | "Teacher" | "Administration";
  createdAt: string;
}
export interface CalendarEvent {
  id: string;
  date: string;
  title: string;
  kind: "Holiday" | "Examination" | "Meeting" | "Event";
}
export interface ParentData {
  vouchers: FeeVoucher[];
  messages: ParentMessage[];
  events: CalendarEvent[];
}
