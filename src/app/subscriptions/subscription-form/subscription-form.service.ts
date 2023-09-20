import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { SubscriptionInterface } from '../modal/subscription.interface';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionFormService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);
  #subscriptionCollection = collection(this.firestore, 'subscriptions');

  addSubscription(subscription: SubscriptionInterface) {
    let updatedSubs = {
      ...subscription,
      boughtDate: new Date(subscription.boughtDate).getTime(),
      uid: this.authService.currAuth.currentUser?.uid,
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
