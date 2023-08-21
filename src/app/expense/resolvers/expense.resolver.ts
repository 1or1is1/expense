import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Expense } from '../modal/expense.model';
import { inject } from '@angular/core';
import { ExpenseService } from '../expense.service';

export const expenseResolver: ResolveFn<Expense> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const expenseId = route.paramMap.get('id');
  return inject(ExpenseService).getExpense(expenseId);
};
