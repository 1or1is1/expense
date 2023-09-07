export interface ExpenseInterface {
  name: string;
  price: number;
  spentDate: string | number;
  category: string;
  paidVia: string;
  notes: string | null;
  uid?: string;
  expenseId?: string;
}
