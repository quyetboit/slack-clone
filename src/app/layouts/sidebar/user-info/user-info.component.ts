import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/interfaces/user.interface';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    NzAvatarModule
  ],
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {
  curentUser: User;
  constructor (
    private auth: AuthService,
  ) {
    this.curentUser = JSON.parse(localStorage.getItem('userInfo') || '');
  }

  onLogout() {
    this.auth.logout();
  }
}
