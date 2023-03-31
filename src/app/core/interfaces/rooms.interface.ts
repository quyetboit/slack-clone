import { User } from "./user.interface";

export interface Room {
  id: string,
  name: string,
  isPublic: boolean,
  members: string[],
}

export interface DirectMessage {
  id: string,
  name: string,
  isOnline: boolean,
  photoUrl?: string,
}
