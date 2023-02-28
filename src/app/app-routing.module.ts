import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const APP_NAME = 'Expenses';
const routes: Routes = [
  {
    path: 'overview',
    loadChildren: () =>
      import('./overview/overview.module').then((m) => m.OverviewModule),
    title: `${APP_NAME} | Overview`,
  },
  {
    path: 'income',
    loadChildren: () =>
      import('./income/income.module').then((m) => m.IncomeModule),
    title: `${APP_NAME} | Income`,
  },
  {
    path: 'expenses',
    loadChildren: () =>
      import('./expenses/expenses.module').then((m) => m.ExpensesModule),
    title: `${APP_NAME} | Expenses`,
  },
  {
    path: 'investments',
    loadChildren: () =>
      import('./investment/investment.module').then((m) => m.InvestmentModule),
    title: `${APP_NAME} | Investments`,
  },
  {
    path: 'subscriptions',
    loadChildren: () =>
      import('./subscription/subscription.module').then(
        (m) => m.SubscriptionModule
      ),
    title: `${APP_NAME} | Subscription`,
  },
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
