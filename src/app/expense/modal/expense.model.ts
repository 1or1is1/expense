export interface Expense {
  name: string;
  price: number;
  spentDate: string;
  category: string;
  paidVia: string;
  notes: string | null;
  uid?: string;
  expenseId?: string;
}