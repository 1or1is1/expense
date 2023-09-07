import { Component, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  NotificationType,
  ToastService,
} from 'src/app/shared/services/toast.service';
import { IncomeFormComponent } from '../income-form/income-form.component';
import { IncomeFormService } from '../income-form/income-form.service';
import { IncomeInterface } from '../modal/income.interface';

@Component({
  selector: 'app-add-subscription',
  standalone: true,
  imports: [IncomeFormComponent, RouterLink, CommonModule],
  template: `<app-income-form (formSubmit)="onFormSubmit($event)">
    <ng-container addUpdateHeading>Edit Income</ng-container>
    <fieldset
      class="d-flex justify-content-end mt-3 column-gap-3"
      [disabled]="loading"
    >
      <a class="btn btn-secondary" role="button" routerLink="/incomes"
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
  </app-income-form>`,
})
export class EditIncomeComponent {
  #activatedRoute = inject(ActivatedRoute);
  #router = inject(Router);
  incomeFormService = inject(IncomeFormService);
  toastService = inject(ToastService);
  router = inject(Router);

  loading = false;
  income: IncomeInterface | undefined;

  @ViewChild(IncomeFormComponent)
  incomeForm!: IncomeFormComponent;

  ngOnInit(): void {
    this.income = this.#activatedRoute.snapshot.data['income'];
    if (!this.income) {
      this.toastService.showNotification(
        NotificationType.ERROR,
        'Some error occurred while fetching income details!',
      );
      this.#router.navigate(['/incomes']);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.income) {
        this.incomeForm.incomeForm.patchValue({
          ...this.income,
          receivedDate: new Date(this.income.receivedDate)
            .toISOString()
            .split('T')[0],
        });
      }
    });
  }

  async onFormSubmit(formData: IncomeInterface) {
    this.loading = true;
    formData.incomeId = this.income?.incomeId;
    formData.receivedDate = new Date(formData.receivedDate).getTime();
    try {
      await this.incomeFormService.updateIncome(formData);
      this.toastService.showNotification(
        NotificationType.SUCCESS,
        'Income updated.',
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
