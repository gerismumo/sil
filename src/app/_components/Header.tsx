"use client"

import Container from '@/Layout/Container'
import Link from 'next/link'
import React from 'react'
import ThemeToggle from './ThemeToggle'
import { useRouter } from 'next/navigation'
import { useUserInfo } from '@/lib/hooks/userInfo'
import { logoutUser } from '../cookie'

const Header = () => {
    const router = useRouter()

   
    const { userInfo, loading } = useUserInfo();

    const handleLogout = async () => {
        const redirectPath = await logoutUser();
        router.refresh();
        router.push(redirectPath);
    };
    
  return (
    <div className="flex flex-col dark:shadow-alpha-white-400 shadow-sm ">
        <Container>
            <div className="flex flex-row justify-between items-center py-[15px]">
                <div onClick={() => router.push('/')} className="flex flex-col cursor-pointer">
                    <h2 className='font-[600]'>Savannah</h2>
                </div>
                <div className="flex flex-row items-center justify-center gap-[20px] ">
                    {!userInfo ? (
                        <Link href="/sign-in" className='bg-[#ddd] text-[14px] font-[500] dark:bg-light-dark px-[10px] py-[5px] rounded-[15px]'>Log in</Link>
                    ): (
                        <button onClick={() =>  handleLogout()} className='bg-[#ddd] text-[14px] font-[500] dark:bg-light-dark px-[10px] py-[5px] rounded-[15px]'>
                            Log out
                        </button>
                    )}
                    
                    <ThemeToggle/>
                </div>
            </div>
        </Container>
    </div>
  )
}

export default Header
