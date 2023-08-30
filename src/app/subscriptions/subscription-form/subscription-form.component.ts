import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ControlsOf } from 'src/app/shared/utils/app.utils';
import {
  RecurType,
  StatusType,
  SubscriptionInterface,
} from '../modal/subscription.interface';

@Component({
  selector: 'app-subscription-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './subscription-form.component.html',
})
export class SubscriptionFormComponent {
  #fb = inject(FormBuilder);

  @Output()
  formSubmit = new EventEmitter<SubscriptionInterface>();

  subscriptionForm: FormGroup = this.#fb.group<
    ControlsOf<SubscriptionInterface>
  >({
    name: this.#fb.control('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    website: this.#fb.control('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(
          /^(https?:\/\/)(www.)?([a-zA-Z0-9]+)(\.)([a-zA-Z]{2,3})$/,
        ),
      ],
    }),
    price: this.#fb.control(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)],
    }),
    boughtDate: this.#fb.control(new Date().toISOString().split('T')[0], {
      nonNullable: true,
      validators: [Validators.required],
    }),
    paying: this.#fb.control(RecurType.MONTHLY, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    status: this.#fb.control(StatusType.ACTIVE, { nonNullable: true }),
    notes: this.#fb.control(''),
  });

  onSubmit() {
    this.subscriptionForm.markAllAsTouched();
    if (this.subscriptionForm.invalid) {
      return;
    }
    this.formSubmit.emit(this.subscriptionForm.value);
  }

  get name() {
    return this.subscriptionForm.get('name');
  }

  get website() {
    return this.subscriptionForm.get('website');
  }

  get price() {
    return this.subscriptionForm.get('price');
  }

  get boughtDate() {
    return this.subscriptionForm.get('boughtDate');
  }
}
