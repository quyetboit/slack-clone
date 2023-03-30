export interface Room {
  id: string,
  name: string,
  isPublic: boolean,
}

export interface DirectMessage {
  id: string,
  name: string,
  isOnline: boolean,
  photoUrl?: string,
}
