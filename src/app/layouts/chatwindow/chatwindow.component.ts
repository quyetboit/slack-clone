import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TypeMessage } from 'src/app/core/enums/type-message.enum';
import { MessageComponent } from './message/message.component';
import { Message } from 'src/app/core/interfaces/message.interface';

@Component({
  selector: 'app-chatwindow',
  standalone: true,
  imports: [
    CommonModule,
    NzInputModule,
    NzIconModule,
    MessageComponent,
  ],
  templateUrl: './chatwindow.component.html',
  styleUrls: ['./chatwindow.component.scss']
})
export class ChatwindowComponent {
  TYPE_MESSAGE_ENUM = TypeMessage;
  type = TypeMessage.DIRECT;
  messages: Message[] = [
    {
      uid: '1212',
      displayName: 'QuyetLV',
      photoUrl: 'https://icdn.dantri.com.vn/thumb_w/640/2020/12/16/ngam-dan-hot-girl-xinh-dep-noi-bat-nhat-nam-2020-docx-1608126693063.jpeg',
      createdAt: '23/06/2023',
      contentMessage: 'Xin chào mọi người, tớ là Quyết!'
    },
    {
      uid: '1212',
      displayName: 'QuyetLV',
      photoUrl: 'https://icdn.dantri.com.vn/thumb_w/640/2020/12/16/ngam-dan-hot-girl-xinh-dep-noi-bat-nhat-nam-2020-docx-1608126693063.jpeg',
      createdAt: '23/06/2023',
      contentMessage: 'Xin chào mọi người, tớ là Quyết!'
    },
    {
      uid: '1212',
      displayName: 'QuyetLV',
      photoUrl: 'https://icdn.dantri.com.vn/thumb_w/640/2020/12/16/ngam-dan-hot-girl-xinh-dep-noi-bat-nhat-nam-2020-docx-1608126693063.jpeg',
      createdAt: '23/06/2023',
      contentMessage: 'Xin chào mọi người, tớ là Quyết!'
    },
    {
      uid: '1212',
      displayName: 'QuyetLV',
      photoUrl: 'https://icdn.dantri.com.vn/thumb_w/640/2020/12/16/ngam-dan-hot-girl-xinh-dep-noi-bat-nhat-nam-2020-docx-1608126693063.jpeg',
      createdAt: '23/06/2023',
      contentMessage: 'Xin chào mọi người, tớ là Quyết, Xin chào mọi người, tớ là Quyết, Xin chào mọi người, tớ là Quyết, Xin chào mọi người, tớ là Quyết,Xin chào mọi người, tớ là Quyết, Xin chào mọi người, tớ là Quyết!'
    },
    {
      uid: '1212',
      displayName: 'QuyetLV',
      photoUrl: 'https://icdn.dantri.com.vn/thumb_w/640/2020/12/16/ngam-dan-hot-girl-xinh-dep-noi-bat-nhat-nam-2020-docx-1608126693063.jpeg',
      createdAt: '23/06/2023',
      contentMessage: 'Xin chào mọi người, tớ là Quyết!'
    },
    {
      uid: '1212',
      displayName: 'QuyetLV',
      photoUrl: 'https://icdn.dantri.com.vn/thumb_w/640/2020/12/16/ngam-dan-hot-girl-xinh-dep-noi-bat-nhat-nam-2020-docx-1608126693063.jpeg',
      createdAt: '23/06/2023',
      contentMessage: 'Xin chào mọi người, tớ là Quyết!'
    },
    {
      uid: '1212',
      displayName: 'QuyetLV',
      photoUrl: 'https://icdn.dantri.com.vn/thumb_w/640/2020/12/16/ngam-dan-hot-girl-xinh-dep-noi-bat-nhat-nam-2020-docx-1608126693063.jpeg',
      createdAt: '23/06/2023',
      contentMessage: 'Xin chào mọi người, tớ là Quyết!'
    },
    {
      uid: '1212',
      displayName: 'QuyetLV',
      photoUrl: 'https://icdn.dantri.com.vn/thumb_w/640/2020/12/16/ngam-dan-hot-girl-xinh-dep-noi-bat-nhat-nam-2020-docx-1608126693063.jpeg',
      createdAt: '23/06/2023',
      contentMessage: 'Xin chào mọi người, tớ là Quyết!'
    },
    {
      uid: '1212',
      displayName: 'QuyetLV',
      photoUrl: 'https://icdn.dantri.com.vn/thumb_w/640/2020/12/16/ngam-dan-hot-girl-xinh-dep-noi-bat-nhat-nam-2020-docx-1608126693063.jpeg',
      createdAt: '23/06/2023',
      contentMessage: 'Xin chào mọi người, tớ là Quyết!'
    },
    {
      uid: '1212',
      displayName: 'QuyetLV',
      photoUrl: 'https://icdn.dantri.com.vn/thumb_w/640/2020/12/16/ngam-dan-hot-girl-xinh-dep-noi-bat-nhat-nam-2020-docx-1608126693063.jpeg',
      createdAt: '23/06/2023',
      contentMessage: 'Xin chào mọi người, tớ là Quyết!'
    },

    {
      uid: '1212',
      displayName: 'QuyetLV',
      photoUrl: 'https://icdn.dantri.com.vn/thumb_w/640/2020/12/16/ngam-dan-hot-girl-xinh-dep-noi-bat-nhat-nam-2020-docx-1608126693063.jpeg',
      createdAt: '23/06/2023',
      contentMessage: 'Xin chào mọi người, tớ là Quyết!'
    },

    {
      uid: '1212',
      displayName: 'QuyetLV',
      photoUrl: 'https://icdn.dantri.com.vn/thumb_w/640/2020/12/16/ngam-dan-hot-girl-xinh-dep-noi-bat-nhat-nam-2020-docx-1608126693063.jpeg',
      createdAt: '23/06/2023',
      contentMessage: 'Xin chào mọi người, tớ là Quyết!'
    },

    {
      uid: '1212',
      displayName: 'QuyetLV',
      photoUrl: 'https://icdn.dantri.com.vn/thumb_w/640/2020/12/16/ngam-dan-hot-girl-xinh-dep-noi-bat-nhat-nam-2020-docx-1608126693063.jpeg',
      createdAt: '23/06/2023',
      contentMessage: 'Xin chào mọi người, tớ là Quyết!'
    },

    {
      uid: '1212',
      displayName: 'QuyetLV',
      photoUrl: 'https://icdn.dantri.com.vn/thumb_w/640/2020/12/16/ngam-dan-hot-girl-xinh-dep-noi-bat-nhat-nam-2020-docx-1608126693063.jpeg',
      createdAt: '23/06/2023',
      contentMessage: 'Xin chào mọi người, tớ là Quyết!'
    },
  ]
}
