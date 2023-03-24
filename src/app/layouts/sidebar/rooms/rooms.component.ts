import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { Room } from 'src/app/core/interfaces/rooms.interface';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TypeMessage } from 'src/app/core/enums/type-message.enum';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [
    CommonModule,
    NzCollapseModule,
    NzIconModule,
    NzAvatarModule,
  ],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent {
  @Input() room!: Room;
  TYPE_MESSAGE = TypeMessage;
}
