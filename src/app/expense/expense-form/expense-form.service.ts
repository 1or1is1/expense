import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { ExpenseInterface } from '../modal/expense.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseFormService {
  #firestore = inject(Firestore);
  #expensesCollection = collection(this.#firestore, 'expenses');

  addExpense(expense: ExpenseInterface) {
    return addDoc(this.#expensesCollection, expense);
  }

  updateExpense(expense: ExpenseInterface) {
    if (expense.expenseId) {
      const docRef = doc(this.#expensesCollection, expense.expenseId);
      const obj = { ...expense };
      delete obj['expenseId'];
      return updateDoc(docRef, obj);
    }
    return new Promise((res, rej) => rej('Expense Id is not available'));
  }
}
