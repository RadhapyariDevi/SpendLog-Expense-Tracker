"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { useUser, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

function Header() {
  const {user, isSignedIn} = useUser();
  return (
    <div className='p-5 flex justify-between items-center border shadow-sd'>
        <Image src = {'/SpendLog.png'}
         alt = "Logo"
         width = {160}
         height = {100}
        />
        {isSignedIn ? 
          <UserButton/> :
          <Link href = {'/sign-in'}>
           <Button className='bg-secondary'>Get Started</Button>
          </Link>
        }
    </div>
  )
}

export default Header