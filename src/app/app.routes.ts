import { Routes } from '@angular/router';
import { OverviewComponent } from './overview/overview.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from '@angular/fire/auth-guard';
import {
  redirectLoggedInToOverview,
  redirectUnauthorizedToAuth,
} from './auth/auth.config';
export const routes: Routes = [
  {
    path: 'overview',
    component: OverviewComponent,
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToAuth,
    },
  },
  {
    path: 'expenses',
    loadChildren: () => import('./expense/expense.route').then((e) => e.route),
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToAuth,
    },
  },
  {
    path: 'subscriptions',
    loadChildren: () =>
      import('./subscriptions/subscriptions.route').then((s) => s.route),
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToAuth,
    },
  },
  {
    path: 'incomes',
    loadChildren: () => import('./income/income.route').then((i) => i.route),
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToAuth,
    },
  },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: redirectLoggedInToOverview,
    },
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
