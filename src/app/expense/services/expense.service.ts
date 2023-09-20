import { Injectable, inject } from '@angular/core';
import {
  CollectionReference,
  DocumentReference,
  Firestore,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  orderBy,
  query,
  where,
} from '@angular/fire/firestore';
import { ExpenseInterface } from '../modal/expense.model';
import { catchError, map, of, tap } from 'rxjs';
import {
  NotificationType,
  ToastService,
} from 'src/app/shared/services/toast.service';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);
  toastService = inject(ToastService);

  getAllExpenses() {
    const data = query(
      collection(
        this.firestore,
        'expenses',
      ) as CollectionReference<ExpenseInterface>,
      where('uid', '==', this.authService.currAuth.currentUser?.uid),
      orderBy('spentDate', 'desc'),
    );
    return collectionData<ExpenseInterface>(data, {
      idField: 'expenseId',
    }).pipe(
      catchError(() => {
        this.toastService.showNotification(
          NotificationType.ERROR,
          'Some error occurred while fetching data',
        );
        return of([]);
      }),
    );
  }

  deleteExpense(id: string | undefined) {
    if (id) {
      const docRef = doc(this.firestore, 'expenses', id);
      return deleteDoc(docRef);
    }
    return new Promise((res, rej) => rej('Expense Id is not available'));
  }

  getExpense(id: string | null) {
    const docRef = doc(
      this.firestore,
      'expenses',
      id || '',
    ) as DocumentReference<ExpenseInterface>;
    return docData(docRef, { idField: 'expenseId' });
  }
}
