import { TypeMessage } from "../enums/type-message.enum";

export interface SubRoom {
  id: string,
  name: string,
}

export interface Room {
  type: TypeMessage,
  children: SubRoom[],
}
