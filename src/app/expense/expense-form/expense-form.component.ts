import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { ExpenseService } from './expense-form.service';
import { ToastService } from 'src/app/toast.service';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss'],
})
export class ExpenseFormComponent implements OnInit {
  #fb = inject(FormBuilder);
  expenseService = inject(ExpenseService);
  toastService = inject(ToastService);

  @Input({ required: true })
  isEdit = false;

  loading = false;
  expenseForm!: FormGroup;

  ngOnInit(): void {
    this.expenseForm = this.#fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      spentDate: [
        new Date().toISOString().split('T')[0],
        [Validators.required],
      ],
      category: ['food', [Validators.required]],
      paidVia: ['cash', [Validators.required]],
      notes: [''],
    });
  }

  onSubmit() {
    this.expenseForm.markAllAsTouched();
    if (this.expenseForm.invalid) {
      return;
    }
    if (!this.isEdit) {
      this.addExpense();
    }
  }

  async addExpense() {
    this.loading = true;
    await this.expenseService
      .addExpense(this.expenseForm.value)
      .then((res) => {
        this.toastService.showSuccess('Expense added Successfully');
        this.expenseForm.reset({
          spentDate: new Date().toISOString().split('T')[0],
          category: 'food',
          paidVia: 'cash',
        });
      })
      .catch((err) => {
        console.log(err);
        this.toastService.showFailure('Some error occurred!');
      })
      .finally(() => (this.loading = false));
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
