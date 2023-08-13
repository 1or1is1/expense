import { Routes } from '@angular/router';
import { AddExpenseComponent } from './expense/add-expense/add-expense.component';
import { EditExpenseComponent } from './expense/edit-expense/edit-expense.component';

export const routes: Routes = [
  {
    path: 'expenses',
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./expense/expense.component').then((c) => c.ExpenseComponent),
      },
      {
        path: 'addExpense',
        component: AddExpenseComponent,
      },
      {
        path: 'editExpense/:id',
        component: EditExpenseComponent,
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
