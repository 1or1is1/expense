import { CommonModule } from '@angular/common';
import { Component, Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  #toasts: Toast[] = [];
  #toastsSubject = new BehaviorSubject<Toast[]>([]);
  toasts = this.#toastsSubject.asObservable();

  showSuccess(message: string, duration: number = 4000) {
    const id = this.#generateRandomId();
    this.#toasts.push({ id: id, isSuccess: true, message: message });
    this.#emitToasts();
    const timeout = setTimeout(() => {
      this.removeToast(id);
      clearTimeout(timeout);
    }, duration);
  }

  showFailure(message: string, duration: number = 4000) {
    const id = this.#generateRandomId();
    this.#toasts.push({ id: id, isSuccess: false, message: message });
    this.#emitToasts();
    const timeout = setTimeout(() => {
      this.removeToast(id);
      clearTimeout(timeout);
    }, duration);
  }

  #generateRandomId() {
    return Math.random().toString(36).substring(2, 10);
  }

  removeToast(id: string) {
    let idx = this.#toasts.findIndex((t) => t.id === id);
    if (idx >= 0) {
      this.#toasts.splice(idx, 1);
    }
    this.#emitToasts();
  }

  #emitToasts() {
    this.#toastsSubject.next([...this.#toasts]);
  }
}

export interface Toast {
  id: string;
  isSuccess: boolean;
  message: string;
}

@Component({
  selector: 'app-toast',
  template: `
    <div class="toast-container position-fixed top-0 end-0 p-3">
      <ng-container *ngFor="let toast of toasts$ | async">
        <div
          class="toast fade show"
          [class.text-bg-success]="toast.isSuccess"
          [class.text-bg-danger]="!toast.isSuccess"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div class="toast-header">
            <span>{{ toast.isSuccess ? '✅' : '❌' }}&nbsp;</span>
            <strong class="me-auto">{{
              toast.isSuccess ? 'Success' : 'Failure'
            }}</strong>
            <button
              type="button"
              class="btn-close"
              (click)="closeToast(toast.id)"
            ></button>
          </div>
          <div class="toast-body">{{ toast.message }}</div>
        </div>
      </ng-container>
    </div>
  `,
  standalone: true,
  imports: [CommonModule],
})
export class ToastComponent {
  toastService = inject(ToastService);
  toasts$ = this.toastService.toasts;

  closeToast(id: string) {
    this.toastService.removeToast(id);
  }
}
