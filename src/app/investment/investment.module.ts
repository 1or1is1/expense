import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvestmentComponent } from './investment.component';

const routes: Routes = [{ path: '', component: InvestmentComponent }];

@NgModule({
  declarations: [InvestmentComponent],
  imports: [RouterModule.forChild(routes)],
})
export class InvestmentModule {}
