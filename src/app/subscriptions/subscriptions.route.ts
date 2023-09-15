import { Routes } from '@angular/router';
import { AddSubscriptionComponent } from '../subscriptions/add-subscription/add-subscription.component';
import { EditSubscriptionComponent } from '../subscriptions/edit-subscription/edit-subscription.component';
import { subscriptionResolver } from '../subscriptions/resolvers/subscription.resolver';
import { SubscriptionsComponent } from '../subscriptions/subscriptions.component';

export const route: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SubscriptionsComponent,
  },
  {
    path: 'addSubscription',
    component: AddSubscriptionComponent,
  },
  {
    path: 'editSubscription/:id',
    component: EditSubscriptionComponent,
    resolve: {
      subscription: subscriptionResolver,
    },
  },
];
