import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { ExpenseInterface } from '../modal/expense.model';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ExpenseFormService {
  private firestore = inject(Firestore);
  private expensesCollection = collection(this.firestore, 'expenses');
  private auth = inject(AuthService);

  addExpense(expense: ExpenseInterface) {
    let updatedExpense = {
      ...expense,
      spentDate: new Date(expense.spentDate).getTime(),
      uid: this.auth.currAuth.currentUser?.uid,
    };
    return addDoc(this.expensesCollection, updatedExpense);
  }

  updateExpense(expense: ExpenseInterface) {
    if (expense.expenseId) {
      const docRef = doc(this.expensesCollection, expense.expenseId);
      const obj = { ...expense };
      delete obj['expenseId'];
      return updateDoc(docRef, obj);
    }
    return new Promise((res, rej) => rej('Expense Id is not available'));
  }
}
