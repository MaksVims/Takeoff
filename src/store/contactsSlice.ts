import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

import { Contact, ContactBody } from './../types/contacts';
import { ContactsService } from './../api/ContactsService';

import { RootState } from '.';

interface ContactsState {
  loading: boolean,
  error: string | null
}

const contactsUserApapter = createEntityAdapter<Contact>()
const initialState = contactsUserApapter.getInitialState<ContactsState>({
  loading: false,
  error: null,
})

export const removeContact = createAsyncThunk(
  'contacts/removeContact',
  async (id: number, { rejectWithValue }) => {
    try {
      await ContactsService.removeContact(id)
      return id
    } catch (e) {
      return rejectWithValue((e as Error).message)
    }
  })

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (body: ContactBody, { rejectWithValue }) => {
    try {
      const newContact = await ContactsService.addContact(body)
      return newContact
    } catch (e) {
      return rejectWithValue((e as Error).message)
    }
  },
)

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async (userId: number, { rejectWithValue }) => {
  try {
    const contacts = await ContactsService.getContactsUserById(userId)
    return contacts
  } catch (e) {
    return rejectWithValue((e as Error).message)
  }
})

export const updateContact = createAsyncThunk(
  'contacts/updateContact',
  async (updatedContact: Contact, { rejectWithValue }) => {
    try {
      const updated = await ContactsService.updateContact(updatedContact)
      return updated
    } catch (e) {
      return rejectWithValue((e as Error).message)
    }
  })

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(fetchContacts.pending, state => {
        state.error = null
        state.loading = true
      })
      .addCase(fetchContacts.fulfilled, (state, action: PayloadAction<Contact[]>) => {
        state.loading = false
        contactsUserApapter.setAll(state, action.payload)
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      .addCase(removeContact.pending, state => {
        state.error = null
        state.loading = true
      })
      .addCase(removeContact.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false
        contactsUserApapter.removeOne(state, action.payload)
      })
      .addCase(removeContact.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      .addCase(addContact.pending, state => {
        state.error = null
        state.loading = true
      })
      .addCase(addContact.fulfilled, (state, action: PayloadAction<Contact>) => {
        state.loading = false
        contactsUserApapter.addOne(state, action.payload)
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      .addCase(updateContact.pending, state => {
        state.error = null
        state.loading = true
      })
      .addCase(updateContact.fulfilled, (state, action: PayloadAction<Contact>) => {
        state.loading = false
        contactsUserApapter.updateOne(state, { id: action.payload.id, changes: action.payload })
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const contactsReducer = contactsSlice.reducer
export const {
  selectAll: selectAllContacts,
  selectIds: selectAllContactsIds,
  selectById: selectContactById,
} = contactsUserApapter.getSelectors((state: RootState) => state.contacts)