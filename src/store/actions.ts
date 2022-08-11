import { authActions, fetchUser } from './authSlice'
import { fetchContacts, removeContact, addContact, updateContact } from './contactsSlice'

export default {
  ...authActions,
  fetchUser,
  fetchContacts,
  removeContact,
  addContact,
  updateContact,
}