import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { importProvidersFrom } from '@angular/core';
import { environments } from './environments/environments';
import { provideRouter } from '@angular/router';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([

    ]),
    
    importProvidersFrom([
      provideFirebaseApp(() => initializeApp(environments.firebaseConfig)),
      provideFirestore(() => getFirestore()),
    ])
  ]
})
