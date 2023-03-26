import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from 'src/app/core/interfaces/message.interface';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [
    CommonModule,
    NzAvatarModule,
  ],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  @Input() message!: Message;
}
