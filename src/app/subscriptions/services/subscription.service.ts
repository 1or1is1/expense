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
import {
  StatusType,
  SubscriptionInterface,
} from '../modal/subscription.interface';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  #firestore = inject(Firestore);

  getAllSubscriptions() {
    const data = query(
      collection(
        this.#firestore,
        'subscriptions',
      ) as CollectionReference<SubscriptionInterface>,
    );
    return collectionData<SubscriptionInterface>(data, {
      idField: 'subscriptionId',
    });
  }

  toggleSubscriptionStatus(subId: string, status: StatusType) {
    const docRef = doc(this.#firestore, 'subscriptions', subId);
    return updateDoc(docRef, { status: status });
  }

  deleteSubscription(subId: string) {
    const docRef = doc(this.#firestore, 'subscriptions', subId);
    return deleteDoc(docRef);
  }

  getSubscriptionById(id: string | null) {
    const docRef = doc(
      this.#firestore,
      'subscriptions',
      id || '',
    ) as DocumentReference<SubscriptionInterface>;
    return docData(docRef, { idField: 'subscriptionId' });
  }
}
