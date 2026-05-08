import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Navbar from './Navbar'

function Layout({children}) {
  return (
    <>
    <Header />
   
    {children}
    <Footer />
    </>
  )
}

export default Layout