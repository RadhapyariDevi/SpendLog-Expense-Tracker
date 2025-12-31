"use client"
import React, { useEffect, useState } from 'react'
import SideNav from './_components/SideNav'
import DashboardHeader from './_components/DashboardHeader'
import { db } from '../../../utils/dbConfig'
import { Budgets } from '../../../utils/schema'
import { useUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { useRouter } from 'next/navigation'

function DashboardLayout({children}) {
  const {user}=useUser();
  const router = useRouter();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(()=>{
     user && checkUserBudgets();
  },[user])

  const checkUserBudgets=async()=>{
    const result = await db.select().from(Budgets)
    .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))

    if(result.length===0){
      router.replace('/dashboard/budgets');
    }
  }

  return (
    <div>
      <div className={`fixed h-full w-64 z-40 transition-transform duration-300 bg-background
        ${isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:block`}>
        <SideNav closeSideNav={() => setIsMobileNavOpen(false)}/>
      </div>

      {isMobileNavOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-30 md:hidden" 
          onClick={() => setIsMobileNavOpen(false)}
        />
      )}

      <div className='md:ml-64'>
        <DashboardHeader openNav={() => setIsMobileNavOpen(true)} />
        <div className="p-5">
          {children}
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout