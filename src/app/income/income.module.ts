import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IncomeComponent } from './income.component';

const routes: Routes = [{ path: '', component: IncomeComponent }];

@NgModule({
  declarations: [IncomeComponent],
  imports: [RouterModule.forChild(routes)],
})
export class IncomeModule {}
