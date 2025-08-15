import React from 'react'

function AuthProvider({children}) {
  const AuthContext = generateContext() ;

  return (
    <div>
      {children}
    </div>
  )
}

export default AuthProvider
