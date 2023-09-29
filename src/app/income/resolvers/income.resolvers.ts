import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { IncomeInterface } from '../modal/income.interface';
import { IncomeService } from '../services/income.service';
import { EMPTY, catchError } from 'rxjs';

export const incomeResolver: ResolveFn<IncomeInterface> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const incomeId = route.paramMap.get('id');
  const router = inject(Router);
  return inject(IncomeService)
    .getIncomeById(incomeId)
    .pipe(
      catchError(() => {
        router.navigate(['/']);
        return EMPTY;
      }),
    );
};
