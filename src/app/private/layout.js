import React from 'react'
import ProtectedRoute from '../components/ProtectedRoute'
import Header from '../components/Header'

function PrivateLayout({ children }) {
  return (
    <>
      <ProtectedRoute>
        <Header />
        <div>{children}</div>
      </ProtectedRoute>
    </>
  )
}

export default PrivateLayout