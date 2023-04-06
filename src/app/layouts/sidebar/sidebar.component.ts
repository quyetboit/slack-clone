import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './user-info/user-info.component';
import { RoomsComponent } from './rooms/rooms.component';
import { Direct, Room } from 'src/app/core/interfaces/rooms.interface';
import { TypeMessage } from 'src/app/core/enums/type-message.enum';
import { Condition } from 'src/app/core/interfaces/condition.interface';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Order } from 'src/app/core/interfaces/order.interface';
import { User } from '@angular/fire/auth';

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
  directs: Direct[] = [];
  unsubSnapRooms: any;
  unsubSnapDirect: any;

  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.getRooms();
    this.getDirects();
  }

  getRooms() {
    const conditionGetMyChannel: Condition = {
      fieldName: 'members',
      operator: 'array-contains',
      compareValue: this.authService.currentUserInfo.uid,
    }

    const orderGetChannel: Order = {
      fieldName: 'isPublic',
      direciton: 'desc',
    }

    this.unsubSnapRooms = this.firebaseService.onSnapshotChange(
      'rooms',
      conditionGetMyChannel,
      orderGetChannel,
      (querySnap) => {
        const roomsConvert: Room[] = [];
        querySnap.forEach((doc: any) => {
          roomsConvert.push({
            ...doc.data(),
            id: doc.id,
          })
        })
        this.rooms = roomsConvert;
      }
    )
  }

  getDirects() {
    const conditionGetMyChannel: Condition = {
      fieldName: 'members',
      operator: 'array-contains',
      compareValue: this.authService.currentUserInfo,
    }

    const orderGetChannel: Order = {
      fieldName: 'time',
      direciton: 'asc',
    }

    this.unsubSnapDirect = this.firebaseService.onSnapshotChange(
      'Direct',
      conditionGetMyChannel,
      orderGetChannel,
      (querySnap) => {
        const directsConvert: Direct[] = [];
        querySnap.forEach((doc: any) => {
          const userPatner = doc.data().members.find((item: User) => item.uid !== this.authService.currentUserInfo.uid);
          directsConvert.push({
            id: doc.id,
            ...userPatner,
          })
        })
        this.directs = directsConvert;
      }
    )
  }

  ngOnDestroy(): void {
    this.unsubSnapRooms();
    this.unsubSnapDirect();
  }
}
