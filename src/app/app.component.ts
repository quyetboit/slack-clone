import { LoadingService } from './core/services/loading.service';
import { Component } from '@angular/core';
import { APP_IMPORTS } from './app.import';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: APP_IMPORTS,
})
export class AppComponent {
  constructor (
    public loadingService: LoadingService
  ) {}
}
