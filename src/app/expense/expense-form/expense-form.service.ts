import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Expense } from '../expense.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  #firestore = inject(Firestore);
  #expensesCollection = collection(this.#firestore, 'expenses');

  addExpense(expense: Expense) {
    return addDoc(this.#expensesCollection, expense);
  }
}
