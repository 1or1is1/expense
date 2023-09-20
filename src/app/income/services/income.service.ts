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
import { IncomeInterface } from '../modal/income.interface';
import { catchError, map, of } from 'rxjs';
import {
  NotificationType,
  ToastService,
} from 'src/app/shared/services/toast.service';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class IncomeService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);
  toastService = inject(ToastService);

  getAllIncomes() {
    const data = query(
      collection(
        this.firestore,
        'incomes',
      ) as CollectionReference<IncomeInterface>,
      where('uid', '==', this.authService.currAuth.currentUser?.uid),
      orderBy('receivedDate', 'desc'),
    );
    return collectionData<IncomeInterface>(data, {
      idField: 'incomeId',
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

  deleteIncome(incomeId: string) {
    const docRef = doc(this.firestore, 'incomes', incomeId);
    return deleteDoc(docRef);
  }

  getIncomeById(id: string | null) {
    const docRef = doc(
      this.firestore,
      'incomes',
      id || '',
    ) as DocumentReference<IncomeInterface>;
    return docData(docRef, { idField: 'incomeId' });
  }
}
