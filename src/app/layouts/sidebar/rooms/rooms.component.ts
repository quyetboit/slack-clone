import { Component, Input } from '@angular/core';
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
export class RoomsComponent {
  @Input() rooms: Room[] = [];
  @Input() directs: Direct[] = [];
  @Input() type!: TypeMessage;

  TYPE_MESSAGE = TypeMessage;

  constructor (
    private modalService: NzModalService,
    private chatService: ChatService,
  ) {}

  onSelectRoom(id: string) {
    this.chatService.setChatSelect({
      type: TypeMessage.CHANNEL,
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
