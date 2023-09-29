import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import {
  NotificationType,
  ToastComponent,
  ToastService,
} from './shared/services/toast.service';
import { Auth, user } from '@angular/fire/auth';
import { AuthService } from './auth/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, RouterOutlet, NavbarComponent, ToastComponent],
})
export class AppComponent {
  private auth = inject(Auth);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  user$ = user(this.auth);
  showLoading$ = new BehaviorSubject<boolean>(false);

  ngOnInit() {
    this.router.events.subscribe({
      next: (event) => {
        if (event instanceof NavigationStart) {
          this.showLoading$.next(true);
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationError ||
          event instanceof NavigationCancel
        ) {
          this.showLoading$.next(false);
        }
      },
    });
  }

  async signInWithGoogle() {
    try {
      await this.authService.signInWithGoogle();
      this.toastService.showNotification(
        NotificationType.SUCCESS,
        'Account upgraded Successfully!',
      );
    } catch (err) {
      this.toastService.showNotification(
        NotificationType.ERROR,
        'Some error occurred, try again later!',
      );
    }
  }
}
