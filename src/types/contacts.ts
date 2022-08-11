export interface Contact {
  id: number,
  username: string,
  userId: number,
}

export type ContactBody = Omit<Contact, 'id'>