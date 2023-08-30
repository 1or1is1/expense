import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { GenericTableSkeletonComponent } from '../shared/components/generic-table/generic-table-skeleton.component';
import { RouterLink } from '@angular/router';
import { SubscriptionService } from './services/subscription.service';
import { tap } from 'rxjs';
import {
  NotificationType,
  ToastService,
} from '../shared/services/toast.service';
import { StatusType, RecurType } from './modal/subscription.interface';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  standalone: true,
  imports: [CommonModule, GenericTableSkeletonComponent, RouterLink],
})
export class SubscriptionsComponent {
  subscriptionService = inject(SubscriptionService);
  toastService = inject(ToastService);

  totalSubscriptions: number | null = null;
  activeSubscriptions: number | null = null;
  cancelledSubscriptions: number | null = null;
  monthlyActiveSubscriptions: number | null = null;
  yearlyActiveSubscriptions: number | null = null;
  totalSubscriptionsCost: number | null = null;

  loading = false;

  subscriptions$ = this.subscriptionService.getAllSubscriptions().pipe(
    tap((subscriptions) => {
      this.totalSubscriptions = subscriptions.length;
      this.activeSubscriptions = 0;
      this.cancelledSubscriptions = 0;
      this.monthlyActiveSubscriptions = 0;
      this.yearlyActiveSubscriptions = 0;
      this.totalSubscriptionsCost = 0;
      subscriptions.forEach((sub) => {
        if (sub.status === StatusType.ACTIVE) {
          this.activeSubscriptions! += 1;
          this.totalSubscriptionsCost! += sub.price;
        } else {
          this.cancelledSubscriptions! += 1;
        }
        if (sub.paying === RecurType.MONTHLY) {
          this.monthlyActiveSubscriptions! += 1;
        } else {
          this.yearlyActiveSubscriptions! += 1;
        }
      });
    }),
  );

  async onToggleStatus(subId: string | undefined, status: StatusType) {
    if (!subId) {
      this.toastService.showNotification(
        NotificationType.ERROR,
        'Some error occurred!',
      );
      return;
    }
    this.loading = true;
    try {
      let newStatus =
        status === StatusType.ACTIVE ? StatusType.INACTIVE : StatusType.ACTIVE;
      await this.subscriptionService.toggleSubscriptionStatus(subId, newStatus);
    } catch (err) {
      console.log(err);
      this.toastService.showNotification(
        NotificationType.ERROR,
        'Some error occurred!',
      );
    } finally {
      this.loading = false;
    }
  }

  async deleteSubscription(subId: string | undefined) {
    if (!subId) {
      this.toastService.showNotification(
        NotificationType.ERROR,
        'Some error occurred!',
      );
      return;
    }
    this.loading = true;
    try {
      await this.subscriptionService.deleteSubscription(subId);
      this.toastService.showNotification(
        NotificationType.SUCCESS,
        'Deleted successfully',
      );
    } catch (err) {
      console.log(err);
      this.toastService.showNotification(
        NotificationType.ERROR,
        'Some error occurred!',
      );
    } finally {
      this.loading = false;
    }
  }
}
