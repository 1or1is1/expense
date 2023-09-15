import { Routes } from '@angular/router';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { EditExpenseComponent } from './edit-expense/edit-expense.component';
import { ExpenseComponent } from './expense.component';
import { expenseResolver } from './resolvers/expense.resolver';

export const route: Routes = [
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
];
