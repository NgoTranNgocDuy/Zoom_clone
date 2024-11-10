import React from 'react'
// This will do some specific things to every single page
const RootLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <main>
        {children}
    </main>
  )
}

export default RootLayout