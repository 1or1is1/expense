import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import {
  NotificationType,
  ToastComponent,
  ToastService,
} from './shared/services/toast.service';
import { Auth, user } from '@angular/fire/auth';
import { AuthService } from './auth/auth.service';

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
  user$ = user(this.auth);

  async signInWithGoogle() {
    try {
      let data = await this.authService.signInWithGoogle();
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
