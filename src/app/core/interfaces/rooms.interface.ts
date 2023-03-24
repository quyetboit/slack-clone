import { TypeMessage } from "../enums/type-message.enum";

export interface SubRoom {
  id: string,
  name: string,
  isPublic?: boolean,
  isOnline?: boolean,
}

export interface Room {
  type: TypeMessage,
  children: SubRoom[],
}
