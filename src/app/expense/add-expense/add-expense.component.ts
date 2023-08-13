import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseFormComponent } from '../expense-form/expense-form.component';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [CommonModule, ExpenseFormComponent],
  template: `
    <app-expense-form>
      <ng-container addUpdateHeading>Add Expense</ng-container>
    </app-expense-form>
  `,
})
export class AddExpenseComponent {}
