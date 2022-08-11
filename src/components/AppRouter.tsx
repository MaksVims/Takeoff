import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { selectUser } from '../store/authSlice';

import { LoginPage } from './../pages/LoginPage';
import { useAppSelector } from './../hooks/useAppSelector';
import { ContactsPage } from './../pages/ContactsPage';

export const AppRouter = () => {
  const user = useAppSelector(selectUser)

  if (!user) {
    return (
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='*' element={<Navigate to={'/login'} replace />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path='/contacts' element={<ContactsPage />} />
      <Route path='*' element={<Navigate to={'/contacts'} replace />} />
    </Routes>
  )
}
