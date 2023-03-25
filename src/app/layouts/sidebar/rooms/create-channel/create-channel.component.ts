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
  ],
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.scss']
})
export class CreateChannelComponent implements OnInit  {

  form: FormGroup<FormCreateChannel> = this.fb.group<FormCreateChannel>({
    name: this.fb.nonNullable.control('', Validators.required),
    description: this.fb.nonNullable.control('', Validators.required),
  })

  constructor (
    private fb: FormBuilder,
    private dialogRef: NzModalRef
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
  }
}
