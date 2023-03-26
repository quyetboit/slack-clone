import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HttpClientModule } from '@angular/common/http';
import { LOGIN_IMPORT_MODULES } from './login-import-module';
import { MethodLogin } from 'src/app/core/interfaces/method-login.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: LOGIN_IMPORT_MODULES,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  methodLogin: MethodLogin[] = [
    { name: 'Facebook', logo: 'assets/logoes-social-network/facebook.png', isDisable: false },
    { name: 'Google', logo: 'assets/logoes-social-network/google.png', isDisable: false },
    { name: 'Github', logo: 'assets/logoes-social-network/github.png', isDisable: false },
    { name: 'Twitter', logo: 'assets/logoes-social-network/twitter.png', isDisable: false },
    { name: 'Apple', logo: 'assets/logoes-social-network/apple.jpg', isDisable: false },
  ]
}
