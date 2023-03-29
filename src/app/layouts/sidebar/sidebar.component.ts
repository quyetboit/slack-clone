import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './user-info/user-info.component';
import { RoomsComponent } from './rooms/rooms.component';
import { DirectMessage, Room } from 'src/app/core/interfaces/rooms.interface';
import { TypeMessage } from 'src/app/core/enums/type-message.enum';
import { Condition } from 'src/app/core/interfaces/condition.interface';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    UserInfoComponent,
    RoomsComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  TYPE_MESSAGE = TypeMessage;

  rooms: Room[] = [];
  directMessages: DirectMessage[] = [];
  unsubSnapRooms: any;

  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    const conditionGetMyChannel: Condition = {
      fieldName: 'members',
      operator: 'array-contains',
      compareValue: this.authService.currentUserInfo.uid,
    }

    this.unsubSnapRooms = this.firebaseService.onSnapshotChange(
      'rooms',
      conditionGetMyChannel,
      (querySnap) => {
        this.rooms = [];
        querySnap.forEach((doc: any) => {
          this.rooms.push({
            ...doc.data(),
            id: doc.id,
          })
        })
        console.log('Romms: ', this.rooms)
      }
    )
  }

  ngOnDestroy(): void {
    this.unsubSnapRooms();
  }
}
