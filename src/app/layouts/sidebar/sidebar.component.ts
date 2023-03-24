import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './user-info/user-info.component';
import { RoomsComponent } from './rooms/rooms.component';
import { Room } from 'src/app/core/interfaces/rooms.interface';
import { TypeMessage } from 'src/app/core/enums/type-message.enum';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    UserInfoComponent,
    RoomsComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  rooms: Room[] = [
    {
      type: TypeMessage.CHANNEL,
      children: [
        {id: '123', name: 'Frontend Space'},
        {id: '123', name: 'Backend Space'},
        {id: '123', name: 'Mobile Space'},
        {id: '123', name: 'DevOpps Space'},
        {id: '123', name: 'UI/UX Space'},
      ]
    },
    {
      type: TypeMessage.DIRECT,
      children: [
        {id: '123', name: 'Frontend Space'},
        {id: '123', name: 'Backend Space'},
        {id: '123', name: 'Mobile Space'},
        {id: '123', name: 'DevOpps Space'},
        {id: '123', name: 'UI/UX Space'},
      ]
    },
  ]
}
