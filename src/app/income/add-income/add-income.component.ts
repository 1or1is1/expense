import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  NotificationType,
  ToastService,
} from 'src/app/shared/services/toast.service';
import { IncomeInterface } from '../modal/income.interface';
import { IncomeFormService } from '../income-form/income-form.service';
import { IncomeFormComponent } from '../income-form/income-form.component';

@Component({
  selector: 'app-add-income',
  standalone: true,
  imports: [IncomeFormComponent, RouterLink, CommonModule],
  template: `<app-income-form (formSubmit)="onFormSubmit($event)">
    <ng-container addUpdateHeading>Add Income</ng-container>
    <fieldset
      class="d-flex justify-content-end mt-3 column-gap-3"
      [disabled]="loading"
    >
      <a class="btn btn-secondary" role="button" routerLink="/incomes"
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
  </app-income-form>`,
})
export class AddIncomeComponent {
  incomeFormService = inject(IncomeFormService);
  toastService = inject(ToastService);
  router = inject(Router);

  loading = false;
  async onFormSubmit(formData: IncomeInterface) {
    console.log(formData);
    this.loading = true;
    try {
      await this.incomeFormService.addIncome(formData);
      this.toastService.showNotification(
        NotificationType.SUCCESS,
        'Income added.',
      );
      this.router.navigate(['/incomes']);
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
