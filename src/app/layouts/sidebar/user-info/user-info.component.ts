import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { AuthService } from 'src/app/core/services/auth.service';

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
  constructor (private auth: AuthService) {}

  onLogout() {
    this.auth.logout();
  }
}
