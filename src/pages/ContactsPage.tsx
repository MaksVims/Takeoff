import React, { useEffect, useMemo, useState } from 'react'
import { List, Layout, Button, PageHeader, Divider, Spin } from 'antd';
import { Content, Header } from 'antd/lib/layout/layout';

import { selectAllContacts } from '../store/contactsSlice';
import { selectUser } from '../store/authSlice';

import { ContactItem, SearchContacts, FormAddContact } from '../components';

import { useActions } from './../hooks/useActions';
import { useAppSelector } from './../hooks/useAppSelector';

export const ContactsPage = () => {
  const user = useAppSelector(selectUser)
  const contacts = useAppSelector(selectAllContacts)
  const loadContacts = useAppSelector(state => state.contacts.loading)
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
    <Layout className='layout__full-screen'>
      <Header className='header'>
        <Button onClick={() => signOut()}>Sign out</Button>
      </Header>
      <Layout>
        <Content className='page-container'>
          <div className='page-content'>
            <PageHeader className='page-header'>
              Contacts list {user?.email}
            </PageHeader>
            <FormAddContact />
            <SearchContacts searching={searching} onChange={setSearching} />
            {loadContacts && !contacts.length
              ? (<div className='spin'><Spin /></div>)
              : (
                <>
                  <Divider orientation='center'>Contacts list</Divider>
                  <List
                    bordered
                    size='large'
                    dataSource={filterContacts}
                    renderItem={contact => (
                      <ContactItem contact={contact} />
                    )}
                  />
                </>
              )
            }
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}
