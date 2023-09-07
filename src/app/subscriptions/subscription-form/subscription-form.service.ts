import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { SubscriptionInterface } from '../modal/subscription.interface';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionFormService {
  #firestore = inject(Firestore);
  #subscriptionCollection = collection(this.#firestore, 'subscriptions');

  addSubscription(subscription: SubscriptionInterface) {
    let updatedSubs = {
      ...subscription,
      boughtDate: new Date(subscription.boughtDate).getTime(),
    };
    return addDoc(this.#subscriptionCollection, updatedSubs);
  }

  updateSubscription(subscription: SubscriptionInterface) {
    if (subscription.subscriptionId) {
      const docRef = doc(
        this.#subscriptionCollection,
        subscription.subscriptionId,
      );
      const obj = { ...subscription };
      delete obj['subscriptionId'];
      return updateDoc(docRef, obj);
    }
    return new Promise((res, rej) => rej('Subscription Id is not available'));
  }
}
