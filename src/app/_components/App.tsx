import React from 'react'
import Header from './Header'
import Container from '@/Layout/Container'

const App = () => {
  return (
    <>
    <Header/>
    <Container>
      <div className="flex flex-col">
        <div className="flex flex-col gap-0 m-0 p-0 justify-center items-center">
          <h1 className='text-center font-[700]'>A simple and intuitive way to </h1>
          <h1 className='text-center font-[700]'>explore users, albums, and photos.</h1>
        </div>
      </div>
    </Container>
    </>
  )
}

export default App
