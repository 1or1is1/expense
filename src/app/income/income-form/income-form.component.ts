import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ControlsOf } from 'src/app/shared/utils/app.utils';
import { IncomeInterface } from '../modal/income.interface';

@Component({
  selector: 'app-income-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './income-form.component.html',
})
export class IncomeFormComponent {
  #fb = inject(FormBuilder);

  @Output()
  formSubmit = new EventEmitter<IncomeInterface>();

  incomeForm: FormGroup = this.#fb.group<ControlsOf<IncomeInterface>>({
    name: this.#fb.control('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    amount: this.#fb.control(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)],
    }),
    receivedDate: this.#fb.control(new Date().toISOString().split('T')[0], {
      nonNullable: true,
      validators: [Validators.required],
    }),
    category: this.#fb.control('salary', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    notes: this.#fb.control(''),
  });

  onSubmit() {
    this.incomeForm.markAllAsTouched();
    if (this.incomeForm.invalid) {
      return;
    }
    this.formSubmit.emit(this.incomeForm.value);
  }

  get name() {
    return this.incomeForm.get('name');
  }

  get amount() {
    return this.incomeForm.get('amount');
  }

  get receivedDate() {
    return this.incomeForm.get('receivedDate');
  }
}
