import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-avatar-custom',
  standalone: true,
  imports: [
    CommonModule,
    NzAvatarModule,
  ],
  templateUrl: './avatar-custom.component.html',
  styleUrls: ['./avatar-custom.component.scss']
})
export class AvatarCustomComponent {
  @Input() users: User[] = [];
  @Input() maxCount: number = 3;
}
