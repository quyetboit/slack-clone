import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { FormCreateChannel } from 'src/app/core/interfaces/form-create-channel.interface';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ShowErrorComponent } from 'src/app/core/components/show-error/show-error.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-create-channel',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    NzLayoutModule,
    NzInputModule,
    ShowErrorComponent,
    NzCheckboxModule,
    NzNotificationModule,
  ],
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.scss']
})
export class CreateChannelComponent implements OnInit  {

  form: FormGroup<FormCreateChannel> = this.fb.group<FormCreateChannel>({
    name: this.fb.nonNullable.control('', Validators.required),
    isPublic: this.fb.nonNullable.control(false),
  })

  constructor (
    private fb: FormBuilder,
    private dialogRef: NzModalRef,
    private firebaseService: FirebaseService,
    private notifyService: NzNotificationService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
      this.dialogRef
  }

  handleClickClose () {
    this.dialogRef.close();
  }

  handleClickCreate () {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return
    }

    this.firebaseService
      .addDocument('rooms', {
        name: this.form.value.name,
        isPublic: this.form.value.isPublic,
        createdAt: new Date(),
        members: [this.authService.currentUserInfo.uid],
      }).then(res => {
        this.notifyService.success('Success', 'Create channel success');
        this.dialogRef.close();
      }).catch(errors => {
        this.notifyService.error('Error', 'Has error when create channel');
        console.log('Errors: ', errors)
      })
  }
}
