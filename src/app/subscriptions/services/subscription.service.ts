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
import { catchError, of } from 'rxjs';
import {
  NotificationType,
  ToastService,
} from 'src/app/shared/services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  #firestore = inject(Firestore);
  toastService = inject(ToastService);

  getAllSubscriptions() {
    const data = query(
      collection(
        this.#firestore,
        'subscriptions',
      ) as CollectionReference<SubscriptionInterface>,
    );
    return collectionData<SubscriptionInterface>(data, {
      idField: 'subscriptionId',
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
