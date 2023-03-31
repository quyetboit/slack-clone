import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { User } from 'src/app/core/interfaces/user.interface';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { FormInviteUser } from 'src/app/core/interfaces/form-invite-user.interface';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Room } from 'src/app/core/interfaces/rooms.interface';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-invite-member',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzFormModule,
    NzButtonModule,
    NzIconModule,
    NzNotificationModule,
  ],
  templateUrl: './invite-member.component.html',
  styleUrls: ['./invite-member.component.scss']
})
export class InviteMemberComponent implements OnInit {
  @Input() currentRoom!: Room;
  users: User[] = [];
  isLoading = false;
  form: FormGroup<FormInviteUser> = this.fb.nonNullable.group<FormInviteUser>({
    selectedUser: this.fb.nonNullable.control<string[]>([])
  });

  constructor (
    private firebase: FirebaseService,
    private fb: FormBuilder,
    private notifyService: NzNotificationService,
    private moadalRef: NzModalRef,
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  async getUsers() {
    const snapshot = await this.firebase.getColectionByCondition(
      'users',
      {
        fieldName: 'uid',
        operator: 'not-in',
        compareValue: this.currentRoom.members,
      }
    )

    this.users = [];
    snapshot.docs.forEach(doc => {
      const user = {
        ...doc.data()
      } as User;

      this.users.push(user)
    })
  }

  handleInvite() {
    const usersSelected = this.form.get('selectedUser')?.value || [];
    const newData: Room = {
      ...this.currentRoom,
      members: [...this.currentRoom.members, ...usersSelected]
    }

    this.firebase
      .updateDocument('rooms', this.currentRoom.id, newData)
      .then(() => {
        this.notifyService.success('Success', 'Invited member success!');
        this.moadalRef.close();
      })
      .catch(() => {
        this.notifyService.error('Error', 'Has error when invited member!')
      })
  }
}
