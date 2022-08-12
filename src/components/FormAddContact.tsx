import React, { useState } from 'react'
import { Form, Input } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import { selectUser } from '../store/authSlice';

import { useActions } from './../hooks/useActions';
import { useAppSelector } from './../hooks/useAppSelector';

export const FormAddContact = () => {
  const user = useAppSelector(selectUser)
  const [name, setName] = useState('')
  const { addContact } = useActions()

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)
  const handleAddContact = () => {
    if (name.length) {
      addContact({ userId: user?.id!, username: name })
      setName('')
    }
  }

  return (
    <Form layout='inline' className='base-form form__add-contacts'>
      <Form.Item>
        <Input
          className='input input__add-contacts'
          placeholder='Add new contacts'
          value={name}
          onChange={handlerChange}
        />
      </Form.Item>
      <PlusCircleOutlined
        className='icon icon--add'
        onClick={handleAddContact}
      />
    </Form>
  )
}
