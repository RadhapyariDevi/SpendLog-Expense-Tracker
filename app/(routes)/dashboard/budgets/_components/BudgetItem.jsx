import React from 'react'
import Link from 'next/link'
import { formatCurrency } from "@/lib/formatCurrency";

function BudgetItem({budget}) {

  const calculateProgressPerc=()=>{
      const perc = (budget.totalSpend / budget.amount)*100;
      return perc.toFixed(2);
  }

  return (
    <Link href={'/dashboard/expenses/' + budget?.id} >
      <div className='p-5 border rounded-lg hover:shadow-md cursor-pointer bg-accent-foreground h-40'>
      <div className='flex gap-2 items-center justify-between'>
        <div className='flex gap-4 items-center'>
            <h2 className ='text-2xl p-3 px-4 bg-slate-100 rounded-full border border-secondary'>{budget?.icon}</h2>
            <div >
                <h2 className ='font-bold'>{budget.name}</h2>
                <h2 className='text-sm text-gray-500'>{budget.totalItems} Items</h2>
            </div>
        </div>
        <h2 className = 'font-bold text-primary text-lg'>{formatCurrency(budget.amount)}</h2>
      </div>

      <div className ='mt-5'>
          <div className='flex items-center justify-between mb-3'>
              <h2 className ='text-sm text-slate-500'>{formatCurrency(budget.totalSpend?budget.totalSpend:0)} Spend</h2>
              <h2 className ='text-sm text-slate-500'>{formatCurrency(budget.amount-budget.totalSpend)} Remaining</h2>
          </div>
          <div className = 'w-full h-2 bg-slate-100 rounded-full'>
              <div className = 'h-2 bg-red-400 rounded-full'
              style={{width: `${calculateProgressPerc()}%`}}>

              </div>
          </div>
      </div>
      </div>
    </Link>
  )
}

export default BudgetItem