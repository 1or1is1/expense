export interface Expense {
  name: string;
  price: number;
  spentDate: Date;
  category: string;
  paidVia: string;
  notes: string;
  uid?: string;
}
