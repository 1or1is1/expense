import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ControlsOf } from 'src/app/shared/utils/app.utils';
import { ExpenseInterface } from '../modal/expense.model';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss'],
})
export class ExpenseFormComponent {
  #fb = inject(FormBuilder);

  @Output()
  formSubmit = new EventEmitter<ExpenseInterface>();

  expenseForm: FormGroup = this.#fb.group<ControlsOf<ExpenseInterface>>({
    name: this.#fb.control('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    price: this.#fb.control(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)],
    }),
    spentDate: this.#fb.control(new Date().toISOString().split('T')[0], {
      nonNullable: true,
      validators: [Validators.required],
    }),
    category: this.#fb.control('food', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    paidVia: this.#fb.control('cash', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    notes: this.#fb.control(''),
  });

  onSubmit() {
    this.expenseForm.markAllAsTouched();
    if (this.expenseForm.invalid) {
      return;
    }
    this.formSubmit.emit(this.expenseForm.value);
  }

  get name() {
    return this.expenseForm.get('name');
  }

  get price() {
    return this.expenseForm.get('price');
  }

  get spentDate() {
    return this.expenseForm.get('spentDate');
  }
}
