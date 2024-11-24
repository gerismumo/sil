import Container from '@/Layout/Container'
import Link from 'next/link'
import React from 'react'
import ThemeToggle from './ThemeToggle'

const Header = () => {
  return (
    <div className="flex flex-col dark:bg-darkBackground shadow-sm ">
        <Container>
            <div className="flex flex-row justify-between items-center py-[15px]">
                <div className="flex flex-col">
                    <h2 className='font-[600]'>Savannah</h2>
                </div>
                <div className="flex flex-row items-center justify-center gap-[10px] ">
                    <Link href="" className='bg-[#ddd] text-[14px] font-[600] dark:bg-sectionDarkBackground px-[10px] py-[5px] rounded-[15px]'>Log in</Link>
                    <ThemeToggle/>
                </div>
            </div>
        </Container>
    </div>
  )
}

export default Header
