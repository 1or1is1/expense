import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { ExpenseInterface } from '../modal/expense.model';
import { inject } from '@angular/core';
import { ExpenseService } from '../services/expense.service';
import { EMPTY, catchError } from 'rxjs';

export const expenseResolver: ResolveFn<ExpenseInterface> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const expenseId = route.paramMap.get('id');
  const router = inject(Router);
  return inject(ExpenseService)
    .getExpense(expenseId)
    .pipe(
      catchError(() => {
        router.navigate(['/']);
        return EMPTY;
      }),
    );
};
