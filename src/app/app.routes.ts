import { Routes } from '@angular/router';
import { AddExpenseComponent } from './expense/add-expense/add-expense.component';
import { EditExpenseComponent } from './expense/edit-expense/edit-expense.component';
import { expenseResolver } from './expense/resolvers/expense.resolver';
import { ExpenseComponent } from './expense/expense.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { AddSubscriptionComponent } from './subscriptions/add-subscription/add-subscription.component';
import { EditSubscriptionComponent } from './subscriptions/edit-subscription/edit-subscription.component';
import { subscriptionResolver } from './subscriptions/resolvers/subscription.resolver';

export const routes: Routes = [
  {
    path: 'expenses',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ExpenseComponent,
      },
      {
        path: 'addExpense',
        component: AddExpenseComponent,
      },
      {
        path: 'editExpense/:id',
        component: EditExpenseComponent,
        resolve: {
          expense: expenseResolver,
        },
      },
    ],
  },
  {
    path: 'subscriptions',
    children: [
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
    ],
  },
  {
    path: '',
    redirectTo: 'expenses',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'expenses',
  },
];
