import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { LoginPage } from './../pages/LoginPage';
import { useAppSelector } from './../hooks/useAppSelector';
import { ContactsPage } from './../pages/ContactsPage';

export const AppRouter = () => {
  const isAuth = useAppSelector(state => state.auth.authenticated)

  if (!isAuth) {
    return (
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='*' element={<Navigate to={'/login'} replace />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path='/' element={<ContactsPage />} />
      <Route path='*' element={<Navigate to={'/'} replace />} />
    </Routes>
  )
}
