import { Component, ViewChild, inject } from '@angular/core';
import { SubscriptionFormComponent } from '../subscription-form/subscription-form.component';
import { SubscriptionInterface } from '../modal/subscription.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
    <ng-container addUpdateHeading>Edit Subscription</ng-container>
    <fieldset
      class="d-flex justify-content-end mt-3 column-gap-3"
      [disabled]="loading"
    >
      <a class="btn btn-secondary" role="button" routerLink="/subscriptions"
        >Cancel</a
      >
      <button class="btn btn-primary" type="submit">
        Update&nbsp;
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
export class EditSubscriptionComponent {
  #activatedRoute = inject(ActivatedRoute);
  #router = inject(Router);
  subscriptionFormService = inject(SubscriptionFormService);
  toastService = inject(ToastService);
  router = inject(Router);

  loading = false;
  subscription: SubscriptionInterface | undefined;

  @ViewChild(SubscriptionFormComponent)
  subscriptionForm!: SubscriptionFormComponent;

  ngOnInit(): void {
    this.subscription = this.#activatedRoute.snapshot.data['subscription'];
    if (!this.subscription) {
      this.toastService.showNotification(
        NotificationType.ERROR,
        'Some error occurred while fetching subscription details!',
      );
      this.#router.navigate(['/subscriptions']);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.subscription) {
        this.subscriptionForm.subscriptionForm.patchValue({
          ...this.subscription,
          boughtDate: new Date(this.subscription.boughtDate)
            .toISOString()
            .split('T')[0],
        });
      }
    });
  }

  async onFormSubmit(formData: SubscriptionInterface) {
    this.loading = true;
    formData.subscriptionId = this.subscription?.subscriptionId;
    formData.boughtDate = new Date(formData.boughtDate).getTime();
    try {
      await this.subscriptionFormService.updateSubscription(formData);
      this.toastService.showNotification(
        NotificationType.SUCCESS,
        'Subscription updated.',
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
