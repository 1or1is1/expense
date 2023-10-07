import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  User,
  authState,
  linkWithPopup,
  signInAnonymously,
  signInWithPopup,
  user,
} from '@angular/fire/auth';
import { EMPTY, Observable, tap } from 'rxjs';
import {
  NotificationType,
  ToastService,
} from '../shared/services/toast.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card main-shadow">
            <div class="card-header text-center">
              <h2>Expense Tracker</h2>
              <p>Track your expenses easily</p>
              <p>
                <code>{{ (user | async)?.uid }}</code>
              </p>
            </div>
            <div class="card-body">
              <fieldset [disabled]="loadingAnon || loadingGoogle">
                <div class="text-center mb-3 ">
                  <button
                    class="btn btn-outline-primary btn-lg btn-block align-self-center"
                    (click)="signInWithGoogle()"
                  >
                    <i class="ri-google-fill"></i> Sign In with Google&nbsp;
                    <div
                      class="spinner-border spinner-border-sm"
                      role="status"
                      *ngIf="loadingGoogle"
                    >
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </button>
                </div>
                <div class="text-center">
                  <button
                    class="btn btn-outline-secondary btn-lg btn-block align-self-center text-primary"
                    (click)="signInAnonymously()"
                  >
                    <i class="ri-user-3-fill"></i> Anonymous Sign In&nbsp;
                    <div
                      class="spinner-border spinner-border-sm"
                      role="status"
                      *ngIf="loadingAnon"
                    >
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </button>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AuthComponent {
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);
  readonly user: Observable<User | null> = user(inject(Auth));
  loadingGoogle = false;
  loadingAnon = false;

  async signInWithGoogle() {
    try {
      this.loadingGoogle = true;
      await this.authService.signInWithGoogle();
      this.toastService.showNotification(
        NotificationType.SUCCESS,
        'Signed In Successfully!',
      );
      this.router.navigate(['/overview']);
    } catch (err) {
      this.toastService.showNotification(
        NotificationType.ERROR,
        'Some error occurred, try again later!',
      );
    } finally {
      this.loadingGoogle = false;
    }
  }

  async signInAnonymously() {
    try {
      this.loadingAnon = true;
      await this.authService.signInAnonymously();
      this.toastService.showNotification(
        NotificationType.SUCCESS,
        'Signed In Successfully!',
      );
      this.router.navigate(['/overview']);
    } catch (err) {
      this.toastService.showNotification(
        NotificationType.ERROR,
        'Some error occurred, try again later!',
      );
    } finally {
      this.loadingAnon = false;
    }
  }
}
