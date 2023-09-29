import {
  ActivatedRouteSnapshot,
  ResolveFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { SubscriptionInterface } from '../modal/subscription.interface';
import { SubscriptionService } from '../services/subscription.service';
import { EMPTY, catchError } from 'rxjs';

export const subscriptionResolver: ResolveFn<SubscriptionInterface> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const subscriptionId = route.paramMap.get('id');
  const router = inject(Router);
  return inject(SubscriptionService)
    .getSubscriptionById(subscriptionId)
    .pipe(
      catchError(() => {
        router.navigate(['/']);
        return EMPTY;
      }),
    );
};
