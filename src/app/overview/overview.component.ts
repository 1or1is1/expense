import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { OverviewService } from './services/overview.service';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { RouterLink } from '@angular/router';
import {
  NotificationType,
  ToastService,
} from '../shared/services/toast.service';

@Component({
  selector: 'app-overview',
  standalone: true,
  templateUrl: './overview.component.html',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {
  reportDetails: ReportInterface | null = null;
  reportControl = new FormControl<ReportType>('today', {
    nonNullable: true,
  });

  overviewService = inject(OverviewService);
  toastService = inject(ToastService);

  report$ = this.reportControl.valueChanges.pipe(
    startWith(this.reportControl.value),
    switchMap((data) => this.onSelectionChange(data)),
  );

  onSelectionChange(report: ReportType) {
    return this.overviewService.getReport(report).pipe(
      map((data) => {
        let expenses = data[0];
        let incomes = data[1];
        let subscriptions = data[2];
        this.reportDetails = {
          totalAvailableAmount: 0,
          totalSpentAmount: 0,
          totalIncomeAmount: 0,
          totalSubscriptionAmount: 0,
        };
        let expenseTotal = 0;
        expenses.forEach((e) => (expenseTotal += e.price));
        let incomeTotal = 0;
        incomes.forEach((i) => (incomeTotal += i.amount));
        let subscriptionTotal = 0;
        subscriptions.forEach((s) => (subscriptionTotal += s.price));
        this.reportDetails.totalAvailableAmount =
          incomeTotal - expenseTotal - subscriptionTotal;
        this.reportDetails.totalIncomeAmount = incomeTotal;
        this.reportDetails.totalSpentAmount = expenseTotal;
        this.reportDetails.totalSubscriptionAmount = subscriptionTotal;
        return this.reportDetails;
      }),
      catchError(() => {
        this.toastService.showNotification(
          NotificationType.ERROR,
          'Some error occurred while fetching data',
        );
        this.reportDetails = {
          totalAvailableAmount: 0,
          totalSpentAmount: 0,
          totalIncomeAmount: 0,
          totalSubscriptionAmount: 0,
        };
        return of(this.reportDetails);
      }),
    );
  }
}

export type ReportType =
  | 'today'
  | '7days'
  | '30days'
  | 'currentMonth'
  | 'currentYear';

interface ReportInterface {
  totalSpentAmount: number;
  totalIncomeAmount: number;
  totalSubscriptionAmount: number;
  totalAvailableAmount: number;
}
