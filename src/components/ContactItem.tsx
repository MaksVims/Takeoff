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
  const handleChangeEditField = (e: React.ChangeEvent<HTMLInputElement>) => setEditValue(e.target.value)

  return (
    <List.Item>
      {isEdit
        ? (
          <Form layout='inline' className='base-form'>
            <Form.Item className='form__edit-contact-item'>
              <Input value={editValue} onChange={handleChangeEditField} />
            </Form.Item>
            <Button onClick={handleSaveUpdated}>Save</Button>
          </Form>
        ) : (
          <div className='contacts-list__item'>
            <Typography.Text strong>{contact.username}</Typography.Text>
            <div >
              <Button onClick={handleClickEditButton} className='btn btn--edit'>
                <HighlightOutlined />
              </Button>
              <Button onClick={handleRemoveContact} className='btn btn--remove'>
                <DeleteOutlined color='success-color' />
              </Button>
            </div>
          </div>
        )
      }
    </List.Item >
  )
}
