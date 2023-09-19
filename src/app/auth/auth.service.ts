import { Injectable, inject } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  linkWithPopup,
  signInAnonymously,
  signInWithPopup,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);

  signInWithGoogle() {
    let currentUser = this.auth.currentUser;
    const googleProvider = new GoogleAuthProvider();
    if (currentUser) {
      return linkWithPopup(currentUser, googleProvider);
    } else {
      return signInWithPopup(this.auth, googleProvider);
    }
  }

  signInAnonymously() {
    return signInAnonymously(this.auth);
  }
}
