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

  loginWithFacebook () {
    signInWithPopup(this.auth, this.provider)
      .then(async res => {
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

        localStorage.setItem('userInfo', JSON.stringify(this.currentUser))
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.log('Has error: ', error)
      })
  }

  logout() {
    signOut(this.auth)
      .then(() => {
        this.router.navigate(['/login']);
        localStorage.removeItem('userInfo');
      })
  }
}
