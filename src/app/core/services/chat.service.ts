import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ChatSelect } from "../interfaces/chat-select.interface";

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  private readonly chatSelected$ = new BehaviorSubject<ChatSelect | null>(null);

  get chatSelect () {
    return this.chatSelected$.asObservable();
  }

  setChatSelect(chatSelect: ChatSelect) {
    this.chatSelected$.next(chatSelect);
  }
}
