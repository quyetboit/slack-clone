import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ShowErrorComponent } from 'src/app/core/components/show-error/show-error.component';
import { User } from 'src/app/core/interfaces/user.interface';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-add-coworkers',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    ShowErrorComponent,
    NzAvatarModule,
    NzInputModule,
    NzButtonModule,
  ],
  templateUrl: './add-coworkers.component.html',
  styleUrls: ['./add-coworkers.component.scss']
})
export class AddCoworkersComponent {

  constructor(
    private fb: FormBuilder,
  ) { }

  name: FormControl<string> = this.fb.nonNullable.control('');
  users: User[] = [
    {
      uid: '123',
      displayName: 'Quyet12',
      photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png',
      email: 'quyetlv@techasians.com'
    },
    {
      uid: '123',
      displayName: 'Quyet12',
      photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png',
      email: 'quyetlv@techasians.com'
    },
    {
      uid: '123',
      displayName: 'Quyet12',
      photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png',
      email: 'quyetlv@techasians.com'
    },
    {
      uid: '123',
      displayName: 'Quyet12',
      photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png',
      email: 'quyetlv@techasians.com'
    },
    {
      uid: '123',
      displayName: 'Quyet12',
      photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png',
      email: 'quyetlv@techasians.com'
    },
    {
      uid: '123',
      displayName: 'Quyet12',
      photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png',
      email: 'quyetlv@techasians.com'
    },
    {
      uid: '123',
      displayName: 'Quyet12',
      photoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png',
      email: 'quyetlv@techasians.com'
    },
  ]
}
