import { Routes } from '@angular/router';
import { AddIncomeComponent } from './add-income/add-income.component';
import { EditIncomeComponent } from './edit-income/edit-income.component';
import { IncomeComponent } from './income.component';
import { incomeResolver } from './resolvers/income.resolvers';

export const route: Routes = [
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
];
