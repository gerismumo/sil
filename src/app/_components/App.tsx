"use client"

import React from 'react'
import Container from '@/Layout/Container'
import { useRouter } from 'next/navigation'
import Footer from './Footer'

const App = () => {
  const router = useRouter();
  return (
    <>
    <div className="h-screen">
      <Container>
        <div className="flex flex-col ">
          <div className="flex flex-col justify-center gap-[20px] items-center mt-[40px]">
            <div className="flex flex-col gap-[20px] m-0 p-0 justify-center items-center">
              <div className="">
                <h1 className='text-[25px] sm:text-[45px]  lg:text-[60px] text-center font-[800]'>Explore Users, Albums</h1>
                <h1 className='text-[25px] sm:text-[45px]  lg:text-[60px] text-center font-[800]'>and Photos Effortlessly</h1>
              </div>
              <div className="">
                <p className='text-center text-[15px]'>A simple and intuitive platform designed to help you browse user profiles, discover albums</p>
                <p className='text-center text-[15px]'>and view stunning photos, all in one place.</p>
              </div>
            </div>
            <button onClick={() => router.push('/sign-in')} className='!bg-light-dark border-[2px] !text-white  border-primary rounded-[25px] px-[25px] py-[8px] hover:shadow-sm hover:shadow-primary'>
              Get Started
            </button>
          </div>
        </div>
      </Container>
    </div>
    <Footer/>
    </>
  )
}

export default App
