import { Injectable } from "@angular/core";
import { Auth } from "@angular/fire/auth";
import { addDoc, doc, Firestore, getDoc, onSnapshot, orderBy, setDoc } from "@angular/fire/firestore";
import { collection, CollectionReference, DocumentData, query, where, getDocs } from "@firebase/firestore";
import { Condition } from "../interfaces/condition.interface";
import { Order } from "../interfaces/order.interface";

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
    const collectionRef = collection(this.fireStore, collectionName);
    const queryRef = query(collectionRef, where(condition.fieldName, condition.operator, condition.compareValue));
    return await getDocs(queryRef);
  }

  async getDocById(collectionName: string, id: string) {
    const docRef = doc(this.fireStore, collectionName, id);
    return await getDoc(docRef);
  }

  updateDocument(
    collectionName: string,
    id: string,
    data: any
  ) {
    const docRef = doc(this.fireStore, collectionName, id);
    return setDoc(docRef, data);
  }

  onSnapshotChange(
    collectionName: string,
    condition: Condition,
    order: Order,
    handle: (querySnap: any) => void,
  ) {
    const collectionRef =  collection(this.fireStore, collectionName);
    const q = query(
      collectionRef,
      where(condition.fieldName, condition.operator, condition.compareValue),
      orderBy(order.fieldName, order.direciton)
    );
    return onSnapshot(q, handle)
  }

  onSnapshotChangeById(
    collectionName: string,
    id: string,
    handler: (querySnap: any) => void
  ) {
    const docRef = doc(this.fireStore, collectionName, id);
    return onSnapshot(docRef, handler);
  }

  // sendMessageChannel(
  //   collectionName: string,

  // ) {

  // }
}
