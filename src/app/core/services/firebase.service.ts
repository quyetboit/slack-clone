import { Injectable } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import { addDoc, Firestore } from "@angular/fire/firestore";
import { collection, CollectionReference, DocumentData, query, where, getDocs } from "@firebase/firestore";
import { Condition } from "../interfaces/condition.interface";

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

  addDocument(collectionName: string, data: unknown) {
    return addDoc(collection(this.fireStore, collectionName), data);
  }

  async getColectionByCondition(collectionName: string, condition: Condition) {
    const collectionRef =  collection(this.fireStore, collectionName);
    const queryRef = query(collectionRef, where(condition.fieldName, condition.operator, condition.compareValue));
    return await getDocs(queryRef);
  }
}
