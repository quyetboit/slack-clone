import { APP_ROUTING } from './app/app.routing';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { environments } from './environments/environments';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTING),
    importProvidersFrom([
      BrowserAnimationsModule,
      HttpClientModule,
      provideFirebaseApp(() => initializeApp(environments.firebaseConfig)),
      provideFirestore(() => getFirestore()),
    ])
  ]
})
