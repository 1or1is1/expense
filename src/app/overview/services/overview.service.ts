import { Injectable, inject } from '@angular/core';
import {
  CollectionReference,
  Firestore,
  collection,
  collectionData,
  query,
  where,
} from '@angular/fire/firestore';
import { Observable, combineLatest } from 'rxjs';
import { ExpenseInterface } from 'src/app/expense/modal/expense.model';
import { IncomeInterface } from 'src/app/income/modal/income.interface';
import { SubscriptionInterface } from 'src/app/subscriptions/modal/subscription.interface';
import { ReportType } from '../overview.component';

@Injectable({
  providedIn: 'root',
})
export class OverviewService {
  #firestore = inject(Firestore);

  private readonly expenseCollection = collection(
    this.#firestore,
    'expenses',
  ) as CollectionReference<ExpenseInterface>;

  private readonly incomeCollection = collection(
    this.#firestore,
    'incomes',
  ) as CollectionReference<IncomeInterface>;

  private readonly subscriptionCollection = collection(
    this.#firestore,
    'subscriptions',
  ) as CollectionReference<SubscriptionInterface>;

  getReport(
    reportType: ReportType,
  ): Observable<
    [ExpenseInterface[], IncomeInterface[], SubscriptionInterface[]]
  > {
    let date;
    switch (reportType) {
      case '7days': {
        date = this.getPreviousDay(7);
        break;
      }
      case '30days': {
        date = this.getPreviousDay(30);
        break;
      }
      case 'currentMonth': {
        let today = new Date();
        date = new Date(today.getFullYear(), today.getMonth(), 1).getTime();
        break;
      }
      case 'currentYear': {
        let today = new Date();
        date = new Date(today.getFullYear(), 0, 1).getTime();
        break;
      }
      default: {
        date = this.getPreviousDay(0);
      }
    }
    let expenseQuery = query(
      this.expenseCollection,
      where('spentDate', '>=', date),
    );
    let incomeQuery = query(
      this.incomeCollection,
      where('receivedDate', '>=', date),
    );
    let subscriptionQuery = query(
      this.subscriptionCollection,
      where('boughtDate', '>=', date),
    );
    return combineLatest<
      [ExpenseInterface[], IncomeInterface[], SubscriptionInterface[]]
    >([
      collectionData(expenseQuery),
      collectionData(incomeQuery),
      collectionData(subscriptionQuery),
    ]);
  }

  private getPreviousDay(day: number): number {
    let today = new Date();
    return (
      new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
      ).getTime() -
      day * 24 * 60 * 60 * 1000
    );
  }
}
