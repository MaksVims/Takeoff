import React, { useEffect, useMemo, useState } from 'react'
import { List, Typography, Layout, Button } from 'antd';
import { Content } from 'antd/lib/layout/layout';

import { selectAllContacts } from '../store/contactsSlice';
import { selectUser } from '../store/authSlice';

import { ContactItem, SearchContacts, FormAddContact } from '../components';

import { useActions } from './../hooks/useActions';
import { useAppSelector } from './../hooks/useAppSelector';

export const ContactsPage = () => {
  const user = useAppSelector(selectUser)
  const contacts = useAppSelector(selectAllContacts)
  const { fetchContacts, signOut } = useActions()
  const [searching, setSearching] = useState('')

  useEffect(() => {
    if (user?.id) {
      fetchContacts(user.id)
    }
  }, [])

  const filterContacts = useMemo(() => contacts.filter(c => {
    return c.username.toLowerCase().includes(searching.toLowerCase())
  }), [contacts, searching])

  return (
    <Layout style={{ height: '100vh' }}>
      <Content>
        <FormAddContact />
        <SearchContacts searching={searching} onChange={setSearching} />
        <Typography.Text strong>Contacts list </Typography.Text>
        <List
          bordered
          size='large'
          style={{ width: '80%' }}
          dataSource={filterContacts}
          renderItem={contact => (
            <ContactItem contact={contact} />
          )}
        />
        <Button onClick={() => signOut()}>Sign out</Button>
      </Content>
    </Layout>
  )
}
