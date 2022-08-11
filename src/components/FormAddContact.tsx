import React, { useState } from 'react'
import { Button, Form, Input } from 'antd';
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
    <Form>
      <Form.Item>
        <Input
          placeholder='Add new contacts'
          value={name}
          onChange={handlerChange}
        />
        <Button onClick={handleAddContact}>
          <PlusCircleOutlined />
        </Button>
      </Form.Item>
    </Form>
  )
}
