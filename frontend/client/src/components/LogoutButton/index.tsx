"use server"
import { signOut } from 'next-auth/react'
import React from 'react'

const Button = () => {
  return ( 
 
  <button className="btn btn-outline" onClick={() => signOut()}>Sair</button>

  )
}

export default Button