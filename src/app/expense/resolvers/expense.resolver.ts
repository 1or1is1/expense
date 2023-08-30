import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { ExpenseInterface } from '../modal/expense.model';
import { inject } from '@angular/core';
import { ExpenseService } from '../services/expense.service';

export const expenseResolver: ResolveFn<ExpenseInterface> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const expenseId = route.paramMap.get('id');
  return inject(ExpenseService).getExpense(expenseId);
};
