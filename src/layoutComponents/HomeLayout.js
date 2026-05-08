import React from 'react'
import HomeHeader from './HomeHeader'
import Footer from './Footer'

function HomeLayout({children}) {
  return (
    <>
    <HomeHeader />
    {children}
    <Footer />
    </>
  )
}

export default HomeLayout