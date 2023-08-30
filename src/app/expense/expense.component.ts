import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ExpenseService } from './services/expense.service';
import { tap } from 'rxjs';
import { ExpenseInterface } from './modal/expense.model';
import {
  NotificationType,
  ToastService,
} from '../shared/services/toast.service';
import { GenericTableSkeletonComponent } from '../shared/components/generic-table/generic-table-skeleton.component';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [CommonModule, RouterLink, GenericTableSkeletonComponent],
  templateUrl: './expense.component.html',
})
export class ExpenseComponent {
  #expenseService = inject(ExpenseService);
  #router = inject(Router);
  #activatedRoute = inject(ActivatedRoute);
  toastService = inject(ToastService);

  totalExpenses: number | null = null;
  totalExpensesCost: number | null = null;
  loadingDelete = false;

  expenses$ = this.#expenseService.getAllExpenses().pipe(
    tap((expenses) => {
      this.totalExpenses = expenses.length;
      this.totalExpensesCost = 0;
      expenses.forEach((expense) => {
        if (this.totalExpensesCost !== null) {
          this.totalExpensesCost += expense.price;
        }
      });
    }),
  );

  editExpense(expense: ExpenseInterface) {
    if (!expense?.expenseId) {
      this.toastService.showNotification(
        NotificationType.ERROR,
        'Some error occurred...',
      );
      return;
    }
    this.#router.navigate(['editExpense', expense.expenseId], {
      relativeTo: this.#activatedRoute,
    });
  }

  async deleteExpense(id: string | undefined) {
    this.loadingDelete = true;
    try {
      await this.#expenseService.deleteExpense(id);
      this.toastService.showNotification(
        NotificationType.SUCCESS,
        'Expense deleted successfully!',
      );
    } catch (err) {
      console.log(err);
      this.toastService.showNotification(
        NotificationType.ERROR,
        'Some error occurred!',
      );
    } finally {
      this.loadingDelete = false;
    }
  }
}
