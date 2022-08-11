import React, { FC, useState } from 'react'
import { List, Button, Typography, Input, Form } from 'antd'
import { DeleteOutlined, HighlightOutlined } from '@ant-design/icons';

import { Contact } from '../types/contacts';
import { useActions, useToggle } from '../hooks';

interface ContactItemProps {
  contact: Contact
}

export const ContactItem: FC<ContactItemProps> = ({ contact }) => {
  const { removeContact, updateContact } = useActions()
  const [isEdit, setIsEdit] = useToggle(false)
  const [editValue, setEditValue] = useState(contact.username)

  const handleRemoveContact = () => removeContact(contact.id)
  const handleSaveUpdated = () => {
    updateContact({ ...contact, username: editValue })
    setIsEdit(false)
  }

  const handleClickEditButton = () => setIsEdit(true)
  const handleChangeEditField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value)
  }

  return (
    <List.Item>
      {isEdit
        ? (
          <Form>
            <Input value={editValue} onChange={handleChangeEditField}></Input>
            <Button onClick={handleSaveUpdated}>Save</Button>
          </Form>
        ) : (
          <>
            <Typography.Text strong>{contact.username}</Typography.Text>
            <Button onClick={handleRemoveContact}>
              <DeleteOutlined color='success-color' />
            </Button>
            <Button onClick={handleClickEditButton}>
              <HighlightOutlined />
            </Button>
          </>
        )
      }
    </List.Item >
  )
}
