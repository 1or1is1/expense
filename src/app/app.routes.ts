import { Routes } from '@angular/router';
import { AddExpenseComponent } from './expense/add-expense/add-expense.component';
import { EditExpenseComponent } from './expense/edit-expense/edit-expense.component';
import { expenseResolver } from './expense/resolvers/expense.resolver';
import { ExpenseComponent } from './expense/expense.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { AddSubscriptionComponent } from './subscriptions/add-subscription/add-subscription.component';
import { EditSubscriptionComponent } from './subscriptions/edit-subscription/edit-subscription.component';
import { subscriptionResolver } from './subscriptions/resolvers/subscription.resolver';
import { IncomeComponent } from './income/income.component';
import { AddIncomeComponent } from './income/add-income/add-income.component';
import { incomeResolver } from './income/resolvers/income.resolvers';
import { EditIncomeComponent } from './income/edit-income/edit-income.component';
import { OverviewComponent } from './overview/overview.component';

export const routes: Routes = [
  {
    path: 'overview',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: OverviewComponent,
      },
    ],
  },
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
    path: 'incomes',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: IncomeComponent,
      },
      {
        path: 'addIncome',
        component: AddIncomeComponent,
      },
      {
        path: 'editIncome/:id',
        component: EditIncomeComponent,
        resolve: {
          income: incomeResolver,
        },
      },
    ],
  },
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'overview',
  },
];
