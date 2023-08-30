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
  updateDoc,
} from '@angular/fire/firestore';
import { ExpenseInterface } from '../modal/expense.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  #firestore = inject(Firestore);

  getAllExpenses() {
    const data = query(
      collection(
        this.#firestore,
        'expenses',
      ) as CollectionReference<ExpenseInterface>,
    );
    return collectionData<ExpenseInterface>(data, { idField: 'expenseId' });
  }

  deleteExpense(id: string | undefined) {
    if (id) {
      const docRef = doc(this.#firestore, 'expenses', id);
      return deleteDoc(docRef);
    }
    return new Promise((res, rej) => rej('Expense Id is not available'));
  }

  getExpense(id: string | null) {
    const docRef = doc(
      this.#firestore,
      'expenses',
      id || '',
    ) as DocumentReference<ExpenseInterface>;
    return docData(docRef, { idField: 'expenseId' });
  }
}