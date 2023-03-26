import { TypeMessage } from "../enums/type-message.enum";
import { Message } from "./message.interface";
import { User } from "./user.interface";

export interface ChatInfo {
  type: TypeMessage,
  messages: Message[],
  isPublic?: boolean,
  users: User[],
}
