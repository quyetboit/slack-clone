import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMPORT_CHAT } from './import-chat';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: IMPORT_CHAT,
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

}
