import axios from 'axios'

import { Contact, ContactBody } from './../types/contacts';

export class ContactsService {

  static async getContactsUserById(userId: number) {
    const url = new URL('http://localhost:3001/contacts')
    url.searchParams.append('userId', userId + '')

    const contacts = await axios.get<Contact[]>(url.toString())
    return contacts.data
  }

  static async removeContact(itemId: number) {
    const url = `http://localhost:3001/contacts/${itemId}`
    const contact = await axios.delete(url)
    return contact.data
  }

  static async addContact(body: ContactBody) {
    const url = 'http://localhost:3001/contacts'
    const contact = await axios.post<Contact>(url, body)
    return contact.data
  }

  static async updateContact(updatedContact: Contact) {
    const url = `http://localhost:3001/contacts/${updatedContact.id}`
    const contact = await axios.put<Contact>(url, updatedContact)
    return contact.data
  }
}