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
  query,
} from '@angular/fire/firestore';
import { IncomeInterface } from '../modal/income.interface';
import { catchError, of } from 'rxjs';
import {
  NotificationType,
  ToastService,
} from 'src/app/shared/services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class IncomeService {
  #firestore = inject(Firestore);
  toastService = inject(ToastService);

  getAllIncomes() {
    const data = query(
      collection(
        this.#firestore,
        'incomes',
      ) as CollectionReference<IncomeInterface>,
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
    const docRef = doc(this.#firestore, 'incomes', incomeId);
    return deleteDoc(docRef);
  }

  getIncomeById(id: string | null) {
    const docRef = doc(
      this.#firestore,
      'incomes',
      id || '',
    ) as DocumentReference<IncomeInterface>;
    return docData(docRef, { idField: 'incomeId' });
  }
}
