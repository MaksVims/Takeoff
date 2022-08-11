import { Form, Input } from 'antd'
import React, { FC } from 'react'

interface SearchContactsProps {
  searching: string,
  onChange: (e: string) => void
}

export const SearchContacts: FC<SearchContactsProps> = ({ searching, onChange }) => {

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <Form
      autoComplete='off'
    >
      <Form.Item label='Search: '>
        <Input
          value={searching}
          onChange={handlerChange}
        />
      </Form.Item>
    </Form>
  )
}
