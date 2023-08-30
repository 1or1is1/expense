import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { SubscriptionInterface } from '../modal/subscription.interface';
import { SubscriptionService } from '../services/subscription.service';

export const subscriptionResolver: ResolveFn<SubscriptionInterface> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const subscriptionId = route.paramMap.get('id');
  return inject(SubscriptionService).getSubscriptionById(subscriptionId);
};
