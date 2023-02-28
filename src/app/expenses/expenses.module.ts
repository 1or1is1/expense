import { NgModule } from '@angular/core';
import { ExpensesComponent } from './expenses.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: '', component: ExpensesComponent }];

@NgModule({
  declarations: [ExpensesComponent],
  imports: [RouterModule.forChild(routes)],
})
export class ExpensesModule {}
