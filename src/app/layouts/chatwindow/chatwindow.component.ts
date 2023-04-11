import { NzNotificationService, NzNotificationModule } from 'ng-zorro-antd/notification';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TypeMessage } from 'src/app/core/enums/type-message.enum';
import { MessageComponent } from './message/message.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { AvatarCustomComponent } from 'src/app/core/components/avatar-custom/avatar-custom.component';
import { ChatService } from 'src/app/core/services/chat.service';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/interfaces/user.interface';
import { ChatSelect } from 'src/app/core/interfaces/chat-select.interface';
import { filter, tap } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { InviteMemberComponent } from './invite-member/invite-member.component';
import { Direct, Room } from 'src/app/core/interfaces/rooms.interface';
import { Message } from 'src/app/core/interfaces/message.interface';
import { Condition } from 'src/app/core/interfaces/condition.interface';
import { Order } from 'src/app/core/interfaces/order.interface';

@Component({
  selector: 'app-chatwindow',
  standalone: true,
  imports: [
    CommonModule,
    NzInputModule,
    NzIconModule,
    MessageComponent,
    NzButtonModule,
    NzAvatarModule,
    NzIconModule,
    AvatarCustomComponent,
    ReactiveFormsModule,
    NzNotificationModule,
  ],
  templateUrl: './chatwindow.component.html',
  styleUrls: ['./chatwindow.component.scss']
})

export class ChatwindowComponent implements OnInit, OnDestroy {
  TYPE_MESSAGE_ENUM = TypeMessage;
  chatSelect: ChatSelect | null = null;
  currentRoom!: Room;
  currentDirect: Direct | null = null;
  members: User[] = [];
  messages: Message[] = [];
  messageControl: FormControl<string> = new FormControl<string>('', { nonNullable: true });
  isSendingMessage = false;

  unSubscribeRoom: any;
  unSubscribeMessage: any;

  constructor (
    private chatService: ChatService,
    private firebaseService: FirebaseService,
    private modalService: NzModalService,
    private authService: AuthService,
    private notifyService: NzNotificationService,
  ) {}

  ngOnInit(): void {
    this.onChangeChatSelected();
  }

  onChangeChatSelected() {
    this.chatService.chatSelect
      .pipe(
        tap(() => {
          if (typeof this.unSubscribeRoom == 'function') {
            this.unSubscribeRoom();
          }
          if (typeof this.unSubscribeMessage == 'function') {
            this.unSubscribeMessage();
          }
        }),
        filter((chat) => {
          if (chat?.type === TypeMessage.CHANNEL) {
            return chat?.id !== this.currentRoom?.id;
          } else {
            return chat?.id !== this.currentDirect?.id;
          }
        })
      )
      .subscribe(async chatSelect => {
        this.chatSelect = chatSelect;
        if (!!chatSelect) {
          if (chatSelect.type === TypeMessage.CHANNEL) {
            this.handleGetInfoCurrentRoom(chatSelect.id);
            this.handleGetMessageOfRooms(chatSelect.id);
          } else {
            this.handleGetInfoCurrentDirect(chatSelect.id);
            this.handleGetMessageOfDirect(chatSelect.id);
          }
        }
      })
  }

  handleGetInfoCurrentRoom (idRoom: string) {
    this.unSubscribeRoom = this.firebaseService.onSnapshotChangeById('rooms', idRoom, (doc) => {
      this.members = [];
      this.currentRoom = {
        ...doc.data(),
        id: doc.id,
      };
      const members: User[] = [];
      this.currentRoom.members.forEach(async (uid: string) => {
          const user = await this.firebaseService
                        .getColectionByCondition(
                          'users',
                          { fieldName: 'uid', operator: '==', compareValue: uid}
                        )
          console.log('Condition: ', { fieldName: 'uid', operator: '==', compareValue: uid})
          console.log('User: ', user);
          members.push(user.docs[0]?.data() as User);
        })
        this.members = members;
      }
    )
  }

  handleGetMessageOfRooms (idRoom: string) {
    const conditionGetMessage: Condition = {
      fieldName: 'roomId',
      operator: '==',
      compareValue: idRoom,
    }

    const orderGetMessage: Order = {
      fieldName: 'time',
      direciton: 'asc',
    }

    this.unSubscribeMessage = this.firebaseService.onSnapshotChange(
      'MessagesChannel',
      conditionGetMessage,
      orderGetMessage,
      (docs) => {
        const resultsConvert: Message[] = [];
        docs.forEach((item: any) => {
          resultsConvert.push(item.data());
        })
        this.messages = resultsConvert;
        setTimeout(() => {
          this.caculatorScroll();
        }, 10)
      }
    )
  }

  handleGetInfoCurrentDirect(idDirect: string) {
    this.unSubscribeRoom = this.firebaseService.onSnapshotChangeById('Direct', idDirect, (doc) => {
      const currentDoc = doc.data();
      if (currentDoc) {
        const directFind = currentDoc.members.find((item: User) => item.uid !== this.authService.currentUserInfo.uid);
        this.currentDirect = {
          ...directFind,
          id: doc.id,
        }
      }
    })
  }

  handleGetMessageOfDirect(idDirect: string) {
    const conditionGetMessage: Condition = {
      fieldName: 'directId',
      operator: '==',
      compareValue: idDirect,
    }

    const orderGetMessage: Order = {
      fieldName: 'time',
      direciton: 'asc',
    }

    this.unSubscribeMessage = this.firebaseService.onSnapshotChange(
      'MessagesDirect',
      conditionGetMessage,
      orderGetMessage,
      (docs) => {
        const resultsConvert: Message[] = [];
        docs.forEach((item: any) => {
          resultsConvert.push(item.data());
        })
        this.messages = resultsConvert;
      }
    )
  }

  openPopupInvite(): void {
    this.modalService.create({
      nzContent: InviteMemberComponent,
      nzTitle: 'Invite member',
      nzFooter: null,
      nzComponentParams: {
        currentRoom: this.currentRoom
      }
    })
  }

  sendMessage() {
    const contentMessage = this.messageControl.value;
    let collection = '';
    let data: any = {
      time: new Date(),
      content: contentMessage,
      ...this.authService.currentUserInfo,
    };

    if (this.chatSelect?.type === TypeMessage.CHANNEL) {
      collection = 'MessagesChannel';
      data = {
        ...data,
        roomId: this.currentRoom.id,
      }
    } else {
      collection = 'MessagesDirect';
      data = {
        ...data,
        directId: this.currentDirect?.id,
      }
    }

    this.isSendingMessage = true;
    this.firebaseService
      .addDocument(collection, data)
      .then(() => {
        this.isSendingMessage = false;
        this.messageControl.setValue('');
      })
      .catch(() => {
        this.notifyService.error('Error', 'Has error when send message');
        this.isSendingMessage = false;
      })

  }

  caculatorScroll () {
    const wrap = document.querySelector('div.message') as HTMLElement;
    const wrapChat = document.querySelector('div.wrap-chat') as HTMLElement;
    console.log('Wrap: ', [wrap])
    console.log('Wrap chat: ', [wrapChat])

    if (wrap.clientHeight < wrapChat.clientHeight) {
      wrap.scrollTop = (wrapChat.offsetHeight - wrap.clientHeight + 20);
    }
  }

  ngOnDestroy(): void {
    if (this.unSubscribeRoom) {
      this.unSubscribeRoom();
    }
  }
}
