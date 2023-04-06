import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ShowErrorComponent } from 'src/app/core/components/show-error/show-error.component';
import { User } from 'src/app/core/interfaces/user.interface';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoadingService } from 'src/app/core/services/loading.service';
import { Subject, debounceTime } from 'rxjs';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ChatService } from 'src/app/core/services/chat.service';
import { TypeMessage } from 'src/app/core/enums/type-message.enum';

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
export class AddCoworkersComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private authService: AuthService,
    private loadingService: LoadingService,
    private modalRef: NzModalRef,
    private notifyService: NzNotificationService,
    private chatService: ChatService,
  ) { }

  name: FormControl<string> = this.fb.nonNullable.control('');
  users: User[] = [];
  userClone: User[] = [];

  ngOnInit(): void {
    this.getAllUsers();
    this.handleSearchUser();
  }

  handleSearchUser() {
    this.name.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value: string) => {
        if (value) {
          this.users = this.userClone.filter(user => user.displayName.toLowerCase().includes(value.toLowerCase().trim()))
        } else {
          this.users = [...this.userClone];
        }
      })
  }

  getAllUsers () {
    this.firebaseService.getColectionByCondition(
      'users',
      {
        fieldName: 'uid',
        operator: '!=',
        compareValue: this.authService.currentUserInfo.uid
      }
    ).then(docs => {
      this.loadingService.setLoading(false);
      const users: User[] = [];
      docs.forEach(doc => {
        users.push(doc.data() as User);
      })
      this.users = users;
      this.userClone = [...this.users];
    }).catch(errs => {
      console.log('Has error: ', errs);
      this.loadingService.setLoading(false);
    })
  }

  async handleStartMessage(user: User, event: Event) {
    event.preventDefault();

    const checkExists = await this.firebaseService.getColectionByCondition(
      'Direct',
      {
        fieldName: 'members',
        operator: 'in',
        compareValue: [
          [this.authService.currentUserInfo, user],
          [user, this.authService.currentUserInfo]
        ]
      }
    );

    if (checkExists.empty) {
      this.loadingService.setLoading(true);
      this.firebaseService.addDocument(
        'Direct',
        {
          members: [user, this.authService.currentUserInfo],
          time: new Date(),
        }
      ).then((directSnapshot) => {
        this.loadingService.setLoading(false);
        this.chatService.setChatSelect({
          type: TypeMessage.DIRECT,
          id: directSnapshot.id,
        });
        this.close();
      }).catch(() => {
        this.notifyService.error('Errors', 'Has error when start message');
        this.loadingService.setLoading(false);
      })
    } else {
      const direct = checkExists.docs[0];
      this.chatService.setChatSelect({
        type: TypeMessage.DIRECT,
        id: direct.id,
      });
      this.modalRef.close();
    }
  }

  close() {
    this.modalRef.close();
  }
}
