import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { IncomeInterface } from '../modal/income.interface';
import { IncomeService } from '../services/income.service';

export const incomeResolver: ResolveFn<IncomeInterface> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const incomeId = route.paramMap.get('id');
  return inject(IncomeService).getIncomeById(incomeId);
};
