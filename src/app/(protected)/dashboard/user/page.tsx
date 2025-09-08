import FirstPage from '@/components/firstpage'
import HomePage from '@/components/HomePage'
import Navbar from '@/components/NavbarLogout'
import React from 'react'

export default function page () {
  return (
    <div>
      <Navbar/>
      <div className=' relative'>
      <HomePage/>
      {/* <FirstPage /> */}

      </div>
    </div>
  )
}
