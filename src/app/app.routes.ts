import { Routes } from '@angular/router';
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
    loadChildren: () => import('./expense/expense.route').then((e) => e.route),
  },
  {
    path: 'subscriptions',
    loadChildren: () =>
      import('./subscriptions/subscriptions.route').then((s) => s.route),
  },
  {
    path: 'incomes',
    loadChildren: () => import('./income/income.route').then((i) => i.route),
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
