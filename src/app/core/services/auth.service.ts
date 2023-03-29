import { LoadingService } from './loading.service';
import { Injectable } from "@angular/core";
import { Auth, signInWithPopup, FacebookAuthProvider, connectAuthEmulator, signOut } from "@angular/fire/auth";
import { connectFirestoreEmulator, Firestore } from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { Condition } from "../interfaces/condition.interface";
import { User } from "../interfaces/user.interface";
import { FirebaseService } from "./firebase.service";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  currentUser: User | null = null;
  provider: FacebookAuthProvider;

  constructor (
    private auth: Auth,
    private fireStore: Firestore,
    private firebase: FirebaseService,
    private router: Router,
    private loadingService: LoadingService,
  ) {
    connectAuthEmulator(this.auth, "http://localhost:9099");
    if (window.location.host.includes('localhost')) {
      connectFirestoreEmulator(this.fireStore, 'localhost', 8080);
    }

    this.provider = new FacebookAuthProvider();
    this.provider.setCustomParameters({
      'display': 'popup'
    })
  }

  get currentUserInfo(): User {
    return localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')!);
  }

  loginWithFacebook () {
    signInWithPopup(this.auth, this.provider)
      .then(async res => {
        this.loadingService.setLoading(true);
        this.currentUser = {
          uid: res.user.uid,
          displayName: res.user.displayName || '',
          photoUrl: res.user.photoURL || '',
          email: res.user.email || '',
        }

        const condition: Condition = {
          fieldName: 'uid',
          operator: '==',
          compareValue: this.currentUser.uid,
        }
        const currentUserSnapshot = await this.firebase.getColectionByCondition(
          'users',
          condition
        )

        if (currentUserSnapshot.empty) {
          this.firebase.addDocument('users', this.currentUser);
        }

        localStorage.setItem('userInfo', JSON.stringify(this.currentUser));
        this.loadingService.setLoading(false);
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.loadingService.setLoading(false);
        console.log('Has error: ', error)
      })
  }

  logout() {
    this.loadingService.setLoading(true);
    signOut(this.auth)
      .then(() => {
        this.loadingService.setLoading(false);
        this.router.navigate(['/login']);
        localStorage.removeItem('userInfo');
      })
      .catch(err => {
        this.loadingService.setLoading(false);
        console.log('Hass erorrs when logout: ', err)
      })
  }
}
