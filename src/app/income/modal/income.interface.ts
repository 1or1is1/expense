export interface IncomeInterface {
  name: string;
  amount: number;
  receivedDate: string | number;
  category: string;
  notes?: string | null;
  uid?: string;
  incomeId?: string;
}
