import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { Room, Direct } from 'src/app/core/interfaces/rooms.interface';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TypeMessage } from 'src/app/core/enums/type-message.enum';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { CreateChannelComponent } from './create-channel/create-channel.component';
import { AddCoworkersComponent } from './add-coworkers/add-coworkers.component';
import { ChatService } from 'src/app/core/services/chat.service';
import { ChatSelect } from 'src/app/core/interfaces/chat-select.interface';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [
    CommonModule,
    NzCollapseModule,
    NzIconModule,
    NzAvatarModule,
    NzModalModule,
  ],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  @Input() rooms: Room[] = [];
  @Input() directs: Direct[] = [];
  @Input() type!: TypeMessage;

  TYPE_MESSAGE = TypeMessage;
  chatSelect: ChatSelect | null = null;

  constructor (
    private modalService: NzModalService,
    private chatService: ChatService,
  ) {
  }

  ngOnInit(): void {
      this.chatService.chatSelect.subscribe(chat => {
        this.chatSelect = chat
      })
  }

  onSelectRoom(id: string) {
    this.chatService.setChatSelect({
      type: TypeMessage.CHANNEL,
      id,
    })
  }

  onSelectDirect(id: string) {
    this.chatService.setChatSelect({
      type: TypeMessage.DIRECT,
      id,
    })
  }

  openModalCreateChannel () {
    this.modalService.create({
      nzTitle: 'Create channels',
      nzContent: CreateChannelComponent,
      nzFooter: null,
    })
  }

  openModalAddCoworker () {
    this.modalService.create({
      nzTitle: 'Start massage with new coworker',
      nzContent: AddCoworkersComponent,
      nzFooter: null,
    })
  }
}
