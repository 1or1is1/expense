import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseFormComponent } from '../expense-form/expense-form.component';

@Component({
  selector: 'app-edit-expense',
  standalone: true,
  imports: [CommonModule, ExpenseFormComponent],
  template: `
    <app-expense-form [isEdit]="true">
      <ng-container addUpdateHeading>Edit Expense</ng-container>
    </app-expense-form>
  `,
})
export class EditExpenseComponent {}
