import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HttpClientModule } from '@angular/common/http';
import { LOGIN_IMPORT_MODULES } from './login-import-module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: LOGIN_IMPORT_MODULES,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

}
