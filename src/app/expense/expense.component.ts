import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ExpenseService } from './expense.service';
import { tap } from 'rxjs';
import { ToastService } from '../toast.service';
import { Expense } from './modal/expense.model';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
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

  editExpense(expense: Expense) {
    if (!expense?.expenseId) {
      this.toastService.showFailure('Some error occurred...');
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
      this.toastService.showSuccess('Expense deleted successfully!');
    } catch (err) {
      console.log(err);
      this.toastService.showFailure('Some error occurred!');
    } finally {
      this.loadingDelete = false;
    }
  }
}
