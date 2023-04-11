import { APP_ROUTING } from './app/app.routing';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { environments } from './environments/environments';
import { provideRouter } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';

registerLocaleData(vi)

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTING),
    { provide: NZ_I18N, useValue: vi_VN },
    importProvidersFrom([
      BrowserAnimationsModule,
      HttpClientModule,
      provideFirebaseApp(() => initializeApp(environments.firebaseConfig)),
      provideFirestore(() => getFirestore()),
      provideAuth(() => getAuth()),
    ])
  ]
})
