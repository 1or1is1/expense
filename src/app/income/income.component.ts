import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { GenericTableSkeletonComponent } from '../shared/components/generic-table/generic-table-skeleton.component';
import { RouterLink } from '@angular/router';
import { IncomeService } from './services/income.service';
import {
  NotificationType,
  ToastService,
} from '../shared/services/toast.service';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs';

@Component({
  selector: 'app-income',
  standalone: true,
  templateUrl: './income.component.html',
  imports: [GenericTableSkeletonComponent, RouterLink, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncomeComponent {
  incomeService = inject(IncomeService);
  toastService = inject(ToastService);
  cdr = inject(ChangeDetectorRef);

  totalIncomeCount: number | null = null;
  totalIncomeAmount: number | null = null;

  loading = false;

  incomes$ = this.incomeService.getAllIncomes().pipe(
    tap((incomes) => {
      this.totalIncomeCount = incomes.length;
      this.totalIncomeAmount = 0;
      incomes.forEach((income) => {
        this.totalIncomeAmount! += income.amount;
      });
    }),
  );

  async deleteIncome(incomeId: string | undefined) {
    if (!incomeId) {
      this.toastService.showNotification(
        NotificationType.ERROR,
        'Some error occurred!',
      );
      return;
    }
    this.loading = true;
    try {
      await this.incomeService.deleteIncome(incomeId);
      this.toastService.showNotification(
        NotificationType.SUCCESS,
        'Deleted successfully',
      );
    } catch (err) {
      console.log(err);
      this.toastService.showNotification(
        NotificationType.ERROR,
        'Some error occurred!',
      );
    } finally {
      this.loading = false;
      this.cdr.markForCheck();
    }
  }
}
