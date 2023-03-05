import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AddInvestmentComponent } from './add-investment/add-investment.component';
import { InvestmentComponent } from './investment.component';

const routes: Routes = [{ path: '', component: InvestmentComponent }];

@NgModule({
  declarations: [InvestmentComponent, AddInvestmentComponent],
  imports: [RouterModule.forChild(routes), CommonModule, ReactiveFormsModule],
})
export class InvestmentModule {}
