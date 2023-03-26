import { Injectable } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import { Firestore } from "@angular/fire/firestore";
import { collection, CollectionReference, DocumentData, query, doc } from "@firebase/firestore";

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  constructor (
    private auth: Auth,
    private fireStore: Firestore,
  ) {}

  getCollection(collectionName: string): CollectionReference<DocumentData> {
    return collection(this.fireStore, collectionName)
  }

  // getQueryRef(collectionName: string, condition: any) {
  //   const collectionRef = collection(this.fireStore, collectionName);

  //   return query(collectionRef, where)
  // }
}
