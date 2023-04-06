import { User } from "./user.interface";

export interface Room {
  id: string,
  name: string,
  isPublic: boolean,
  members: string[],
}

export interface Direct {
  id: string,
  displayName: string,
  isOnline: boolean,
  photoUrl?: string,
}
