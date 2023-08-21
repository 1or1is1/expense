import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { Expense } from '../modal/expense.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseFormService {
  #firestore = inject(Firestore);
  #expensesCollection = collection(this.#firestore, 'expenses');

  addExpense(expense: Expense) {
    return addDoc(this.#expensesCollection, expense);
  }

  updateExpense(expense: Expense) {
    if (expense.expenseId) {
      const docRef = doc(this.#expensesCollection, expense.expenseId);
      return updateDoc(docRef, { ...expense });
    }
    return new Promise((res, rej) => rej('Expense Id is not available'));
  }
}
