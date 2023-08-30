import { Component, inject } from '@angular/core';
import { SubscriptionFormComponent } from '../subscription-form/subscription-form.component';
import { SubscriptionInterface } from '../modal/subscription.interface';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SubscriptionFormService } from '../subscription-form/subscription-form.service';
import {
  NotificationType,
  ToastService,
} from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-add-subscription',
  standalone: true,
  imports: [SubscriptionFormComponent, RouterLink, CommonModule],
  template: `<app-subscription-form (formSubmit)="onFormSubmit($event)">
    <ng-container addUpdateHeading>Add Subscription</ng-container>
    <fieldset
      class="d-flex justify-content-end mt-3 column-gap-3"
      [disabled]="loading"
    >
      <a class="btn btn-secondary" role="button" routerLink="/subscriptions"
        >Cancel</a
      >
      <button class="btn btn-primary" type="submit">
        Save&nbsp;
        <div
          class="spinner-border spinner-border-sm"
          role="status"
          *ngIf="loading"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
      </button>
    </fieldset>
  </app-subscription-form>`,
})
export class AddSubscriptionComponent {
  subscriptionFormService = inject(SubscriptionFormService);
  toastService = inject(ToastService);
  router = inject(Router);

  loading = false;
  async onFormSubmit(formData: SubscriptionInterface) {
    console.log(formData);
    this.loading = true;
    try {
      await this.subscriptionFormService.addSubscription(formData);
      this.toastService.showNotification(
        NotificationType.SUCCESS,
        'Subscription added.',
      );
      this.router.navigate(['/subscriptions']);
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
