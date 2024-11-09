import React from 'react'
// This will do some specific things to every single page
const HomeLayout
 = ({children}: {children: React.ReactNode}) => {
  return (
    <main className='relative'>
        Navbar
        {children}
        Footer
    </main>
  )
}

export default HomeLayout
