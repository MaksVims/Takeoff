import React, { useState } from 'react'
import { Form, Input, Button } from 'antd'
import { ValidateErrorEntity } from 'rc-field-form/lib/interface'

const style = {
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

interface LoginForm {
  email: string,
  password: string,
}

export const LoginPage = () => {
  const [validateError, setValidateError] = useState<ValidateErrorEntity | null>(null)

  return (
    <div style={style}>
      <Form
        autoComplete='off'
        size='large'
        onFinish={(values: LoginForm) => {
          console.log({ values })
        }}
        onFinishFailed={(error: ValidateErrorEntity) => setValidateError(error)}
      >

        <Form.Item
          label='Email:'
          name='email'
          rules={[
            {
              required: true,
              message: 'Please enter your email',
            },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
          hasFeedback
        >
          <Input placeholder='Type your email' />
        </Form.Item>

        <Form.Item
          label='Password:'
          name='password'
          rules={[
            {
              required: true,
              message: 'Please enter password',
            },
            { min: 6, message: 'Min length 6 symbol' },
          ]}
        >
          <Input.Password placeholder='Confirm your password' />
        </Form.Item>

        <Form.Item className='submit' shouldUpdate wrapperCol={{ span: 24 }}>
          {() => {
            return (
              <Button
                block
                type='primary'
                htmlType='submit'
              >
                Login
              </Button>
            )
          }}
        </Form.Item>
      </Form>
    </div >
  )
}
