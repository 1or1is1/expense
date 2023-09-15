import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { routes } from './app.routes';

const firebaseConfig = {
  apiKey: 'AIzaSyC0KPk8Q_Dqot2Dt8A5juvdAlkjgBwADRQ',
  authDomain: 'expenses-1200.firebaseapp.com',
  projectId: 'expenses-1200',
  storageBucket: 'expenses-1200.appspot.com',
  messagingSenderId: '107070992916',
  appId: '1:107070992916:web:81a811bc4f5a370b902d01',
  measurementId: 'G-NHP3LR46DM',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
  ],
};
