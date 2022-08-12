import { Form, Input } from 'antd'
import React, { FC } from 'react'

interface SearchContactsProps {
  searching: string,
  onChange: (e: string) => void
}

export const SearchContacts: FC<SearchContactsProps> = ({ searching, onChange }) => {

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)
  return (
    <Form
      autoComplete='off'
      className='base-form form__search-contact'
    >
      <Form.Item label='Search: '>
        <Input
          placeholder='seaching contact...'
          value={searching}
          onChange={handlerChange}
        />
      </Form.Item>
    </Form>
  )
}
