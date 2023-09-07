import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { IncomeInterface } from '../modal/income.interface';

@Injectable({
  providedIn: 'root',
})
export class IncomeFormService {
  #firestore = inject(Firestore);
  #incomeCollection = collection(this.#firestore, 'incomes');

  addIncome(income: IncomeInterface) {
    let updatedIncome = {
      ...income,
      receivedDate: new Date(income.receivedDate).getTime(),
    };
    return addDoc(this.#incomeCollection, updatedIncome);
  }

  updateIncome(income: IncomeInterface) {
    if (income.incomeId) {
      const docRef = doc(this.#incomeCollection, income.incomeId);
      const obj = { ...income };
      delete obj['incomeId'];
      return updateDoc(docRef, obj);
    }
    return new Promise((res, rej) => rej('Income Id is not available'));
  }
}
