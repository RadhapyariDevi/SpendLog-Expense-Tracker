import { UserButton } from '@clerk/nextjs'
import { Menu } from 'lucide-react'
import React from 'react'

function DashboardHeader({ openNav }) {
  return (
    <div className='p-5 shadow-sm border-b flex justify-between items-center'>
        <div className="md:hidden">
            <button 
              onClick={openNav}
              className="p-2 text-primary"
            >
                <Menu size={24} />
            </button>
        </div>
        <div className='hidden md:block'>
            {}
        </div>
        <div>
            <UserButton/>
        </div>
    </div>
  )
}

export default DashboardHeader