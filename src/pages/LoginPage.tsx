import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Card, Row, Typography } from 'antd'
import { UnlockOutlined, UserOutlined } from '@ant-design/icons'

import { LoginForm } from '../types/login';

import { useActions } from './../hooks/useActions';
import { useAppSelector } from './../hooks/useAppSelector';
import { validateEmail } from './../helpers/validateEmail';

export const LoginPage = () => {
  const [disabled, setDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { fetchUser, resetError } = useActions()
  const loadingData = useAppSelector(state => state.auth.loading)
  const errorLoadingData = useAppSelector(state => state.auth.error)

  useEffect(() => {
    if (!validateEmail(email) || password.length < 6) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [email, password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errorLoadingData) resetError()
    e.target.name === 'email'
      ? setEmail(e.target.value)
      : setPassword(e.target.value);
  };

  const onFinish = async (values: LoginForm) => {
    fetchUser(values)
  };

  const onFinishFailed = () => setDisabled(true);

  return (
    <Row justify='center' align='middle' className='layout__full-screen'>
      <Card title='Login Page' className='card' style={{ textAlign: 'center' }}>
        {errorLoadingData && <Typography className='error error__auth-message'>{errorLoadingData}</Typography>}
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 20 }}
          autoComplete='off'
          size='large'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
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
            <Input
              name='email'
              placeholder='Type your email'
              value={email}
              onChange={handleChange}
              prefix={<UserOutlined />}
            />
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
            <Input.Password
              name='password'
              placeholder='Confirm your password'
              value={password}
              onChange={handleChange}
              prefix={<UnlockOutlined />}
            />
          </Form.Item>

          <Form.Item className='submit' shouldUpdate wrapperCol={{ span: 24 }}>
            <Button
              block
              type='primary'
              htmlType='submit'
              disabled={loadingData || disabled}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Row>
  )
}
