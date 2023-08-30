import { CommonModule } from '@angular/common';
import { Component, Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  #toasts: Toast[] = [];
  #toastsSubject = new BehaviorSubject<readonly Toast[]>([]);
  toasts = this.#toastsSubject.asObservable();

  showNotification(
    type: NotificationType,
    message: string,
    duration: number = 5000,
  ) {
    const id = this.#generateRandomId();
    this.#toasts.push({ id: id, type: type, message: message });
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
      this.#emitToasts();
    }
  }

  #emitToasts() {
    // don't try to be smart and write Object.freeze(this.#toasts),
    // this will make this.#toasts as immutable, which should not be the case
    this.#toastsSubject.next(Object.freeze([...this.#toasts]));
  }
}

export interface Toast {
  id: string;
  type: string;
  message: string;
}

@Component({
  selector: 'app-toast',
  template: `
    <div class="toast-container position-fixed top-0 end-0 p-3">
      <ng-container *ngFor="let toast of toasts$ | async">
        <div
          class="toast fade show text-bg-{{ toast.type }}"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div class="toast-header">
            <span>{{ toast.type === 'success' ? '✅' : '❌' }}&nbsp;</span>
            <strong class="me-auto">{{
              toast.type === 'success' ? 'Success' : 'Failure'
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

export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'danger',
}
