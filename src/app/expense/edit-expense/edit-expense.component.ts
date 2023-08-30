import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ExpenseFormComponent } from '../expense-form/expense-form.component';
import { ExpenseInterface } from '../modal/expense.model';
import { ExpenseFormService } from '../expense-form/expense-form.service';
import {
  NotificationType,
  ToastService,
} from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-edit-expense',
  standalone: true,
  imports: [CommonModule, ExpenseFormComponent, RouterLink],
  template: `
    <app-expense-form (formSubmit)="updateExpense($event)">
      <ng-container addUpdateHeading>Edit Expense</ng-container>
      <fieldset
        class="d-flex justify-content-end mt-3 column-gap-3"
        [disabled]="loading"
      >
        <a class="btn btn-secondary" role="button" routerLink="/expenses"
          >Cancel</a
        >
        <button class="btn btn-primary" type="submit">
          Update&nbsp;
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
export class EditExpenseComponent implements AfterViewInit, OnInit {
  #activatedRoute = inject(ActivatedRoute);
  #router = inject(Router);
  expenseFormService = inject(ExpenseFormService);
  toastService = inject(ToastService);

  loading = false;
  expense: ExpenseInterface | undefined;

  @ViewChild(ExpenseFormComponent)
  expenseFormComponent!: ExpenseFormComponent;

  ngOnInit(): void {
    this.expense = this.#activatedRoute.snapshot.data['expense'];
    if (!this.expense) {
      this.toastService.showNotification(
        NotificationType.ERROR,
        'Some error occurred while fetching expense details!',
      );
      this.#router.navigate(['/expenses']);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.expenseFormComponent.expenseForm.patchValue({
        ...this.expense,
      });
    });
  }

  async updateExpense(expense: ExpenseInterface) {
    this.loading = true;
    try {
      expense.expenseId = this.expense?.expenseId;
      await this.expenseFormService.updateExpense(expense);
      this.toastService.showNotification(
        NotificationType.SUCCESS,
        'Expense updated successfully',
      );
      this.#router.navigate(['/expenses']);
    } catch (err) {
      console.log(err);
      this.toastService.showNotification(
        NotificationType.ERROR,
        'Some error occurred!',
      );
    } finally {
      this.loading = false;
    }
  }
}
