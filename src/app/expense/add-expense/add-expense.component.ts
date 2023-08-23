import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseFormComponent } from '../expense-form/expense-form.component';
import { ExpenseFormService } from '../expense-form/expense-form.service';
import { Expense } from '../modal/expense.model';
import { ToastService } from 'src/app/toast.service';
import { Router, RouterLink } from '@angular/router';
import { NotificationType } from 'src/app/app.utils';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [CommonModule, ExpenseFormComponent, RouterLink],
  template: `
    <app-expense-form (formSubmit)="addExpense($event)">
      <ng-container addUpdateHeading>Add Expense</ng-container>
      <fieldset
        class="d-flex justify-content-end mt-3 column-gap-3"
        [disabled]="loading"
      >
        <a class="btn btn-secondary" role="button" routerLink="/expenses"
          >Cancel</a
        >
        <button class="btn btn-primary" type="submit">
          Save&nbsp;
          <div
            class="spinner-border spinner-border-sm"
            role="status"
            *ngIf="loading"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        </button>
      </fieldset>
    </app-expense-form>
  `,
})
export class AddExpenseComponent {
  expenseFormService = inject(ExpenseFormService);
  toastService = inject(ToastService);
  #router = inject(Router);

  loading = false;

  addExpense(expenseForm: Expense) {
    this.loading = true;
    this.expenseFormService
      .addExpense(expenseForm)
      .then((res) => {
        this.#router.navigate(['/expenses']);
        this.toastService.showNotification(
          NotificationType.SUCCESS,
          'Expense added Successfully',
        );
      })
      .catch((err) => {
        console.log(err);
        this.toastService.showNotification(
          NotificationType.ERROR,
          'Some error occurred!',
        );
      })
      .finally(() => (this.loading = false));
  }
}
