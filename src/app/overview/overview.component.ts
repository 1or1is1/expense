import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { catchError, map, max, of, startWith, switchMap, tap } from 'rxjs';
import { ChartModule } from '../chart.module';
import { ExpenseInterface } from '../expense/modal/expense.model';
import {
  NotificationType,
  ToastService,
} from '../shared/services/toast.service';
import { OverviewService } from './services/overview.service';

@Component({
  selector: 'app-overview',
  standalone: true,
  templateUrl: './overview.component.html',
  imports: [CommonModule, RouterLink, ReactiveFormsModule, ChartModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {
  reportDetails: ReportInterface | null = null;
  reportControl = new FormControl<ReportType>('30days', {
    nonNullable: true,
  });

  expenseChartInstance: any;

  chartOptions: AnyObject = {
    theme: 'dark1',
    title: {
      text: 'Expenses',
    },
    axisY: {
      valueFormatString: '#,##0.##',
      prefix: '₹',
    },
    axisX: {
      labelMaxWidth: 100,
      labelWrap: true,
    },
    animationEnabled: true,
    // backgroundColor: '#d1dfeb',
    data: [],
  };

  overviewService = inject(OverviewService);
  toastService = inject(ToastService);

  report$ = this.reportControl.valueChanges.pipe(
    startWith(this.reportControl.value),
    switchMap((data) => this.onSelectionChange(data)),
  );

  onSelectionChange(report: ReportType) {
    return this.overviewService.getReport(report).pipe(
      tap((data) => {
        let expenses = data[0];
        let incomes = data[1];
        let subscriptions = data[2];
        this.updateExpenseChartOptions(expenses);
        let expenseTotal = 0;
        expenses.forEach((e) => (expenseTotal += e.price));
        let incomeTotal = 0;
        incomes.forEach((i) => (incomeTotal += i.amount));
        let subscriptionTotal = 0;
        subscriptions.forEach((s) => (subscriptionTotal += s.price));
        this.reportDetails = {
          totalAvailableAmount: incomeTotal - expenseTotal - subscriptionTotal,
          totalSpentAmount: expenseTotal,
          totalIncomeAmount: incomeTotal,
          totalSubscriptionAmount: subscriptionTotal,
        };
        return this.reportDetails;
      }),
      catchError((err) => {
        console.log(err);
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

  updateExpenseChartOptions(expenses: ExpenseInterface[]) {
    const expenseDateMap = this.createExpenseDateMap(expenses);

    let totalMaxExpenseCostInOneDay = 0;
    let maxNumberOfExpensesInOneDay = 0;
    expenseDateMap.forEach((e) => {
      maxNumberOfExpensesInOneDay = Math.max(
        maxNumberOfExpensesInOneDay,
        e.length,
      );
      totalMaxExpenseCostInOneDay = Math.max(
        totalMaxExpenseCostInOneDay,
        e.map((exp) => exp.price).reduce((prev, curr) => prev + curr, 0),
      );
    });

    expenseDateMap.forEach((e) => {
      while (e.length < maxNumberOfExpensesInOneDay) {
        e.push({ ...e[0], price: 0 });
      }
    });

    let data: Data[] = new Array(maxNumberOfExpensesInOneDay)
      .fill(undefined)
      .map((_) => {
        return {
          type: 'stackedColumn',
          dataPoints: new Array(expenseDateMap.size).fill(undefined),
        };
      });

    for (let i = 0; i < maxNumberOfExpensesInOneDay; i++) {
      let count = 0;
      expenseDateMap.forEach((exp) => {
        data[i].dataPoints[count] = {
          y: exp[i].price,
          label: new DatePipe('en-US', 'GMT+5:30')
            .transform(exp[i].spentDate)
            ?.toString(),
        };
        data[i].yValueFormatString = `₹#,##0.##`;
        count++;
      });
    }
    this.chartOptions['data'] = data;
    this.expenseChartInstance.render();
  }

  private createExpenseDateMap(expenses: ExpenseInterface[]) {
    const expenseDateMap = new Map<number | string, ExpenseInterface[]>();
    expenses.forEach((e) => {
      if (expenseDateMap.has(e.spentDate)) {
        expenseDateMap.get(e.spentDate)?.push(e);
      } else {
        expenseDateMap.set(e.spentDate, [e]);
      }
    });
    return expenseDateMap;
  }

  getChartInstance(chart: object) {
    this.expenseChartInstance = chart;
  }
}

type DataPoints = { y: number; label: string | undefined; name?: string };
type Data = {
  type: string;
  dataPoints: DataPoints[];
  yValueFormatString?: string;
  name?: string;
};
type AnyObject = Record<string, any>;

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
