import { Component, Input, OnChanges, OnInit } from '@angular/core';
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
export class AvatarCustomComponent implements OnChanges {
  @Input() users: User[] = [];
  @Input() maxCount: number = 3;
  @Input() size: 'large' | 'default' | 'small' = 'default';

  ngOnChanges() {
    console.log('Users: ', this.users)
  }
}
