import { Injectable } from "@angular/core";
import { Auth, signInWithPopup, FacebookAuthProvider, connectAuthEmulator } from "@angular/fire/auth";
import { connectFirestoreEmulator, Firestore } from "@angular/fire/firestore";
import { User } from "../interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  provider: FacebookAuthProvider;

  constructor (
    private auth: Auth,
    private fireStore: Firestore,
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
      .then(res => {
        console.log('Ress: ', res)
        const user: User = {
          uid: res.user.uid,
          displayName: res.user.displayName || '',
          photoUrl: res.user.photoURL || '',
          email: res.user.email || '',
        }
        localStorage.setItem('userInfo', JSON.stringify(user))
      })
      .catch(error => {
        console.log('Has error: ', error)
      })
  }
}
