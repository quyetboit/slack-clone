import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { Room, DirectMessage } from 'src/app/core/interfaces/rooms.interface';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TypeMessage } from 'src/app/core/enums/type-message.enum';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { CreateChannelComponent } from './create-channel/create-channel.component';
import { AddCoworkersComponent } from './add-coworkers/add-coworkers.component';

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
  @Input() directMessages: DirectMessage[] = [];
  @Input() type!: TypeMessage;
  TYPE_MESSAGE = TypeMessage;
  unsubSnapRooms: any;

  constructor (
    private modalService: NzModalService,
  ) {}

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
