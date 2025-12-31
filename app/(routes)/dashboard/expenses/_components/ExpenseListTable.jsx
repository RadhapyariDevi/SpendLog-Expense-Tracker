import React from 'react'
import { Trash } from 'lucide-react';
import { Expenses } from '../../../../../utils/schema';
import { db } from '@/utils/dbConfig';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';

function ExpenseListTable({expenseList, refreshData}) {

    const deleteExpense=async(expense)=>{
        const result = await db.delete(Expenses)
        .where(eq(Expenses.id,expense.id))
        .returning();
        if(result){
            toast('Expense Deleted Successfully');
            refreshData();
        }
    }
  return (
    <div className ='mt-3 min-w-[400px]'>
        
        <div className='grid grid-cols-[1.5fr_1fr_1fr_1fr] bg-accent-foreground pl-3 p-2 mt-3'> 
            <h2 className ='font-bold'>Name</h2>
            <h2 className ='font-bold'>Amount</h2>
            <h2 className ='font-bold'>Date</h2>
            <h2 className ='font-bold items-center'>Action</h2>
        </div>

        {expenseList.map((expenses,index)=>(
            <div className='grid grid-cols-[1.5fr_1fr_1fr_1fr] bg-slate-50 pl-3 p-2'> 
            <h2 className='wrap-break-word pr-2'>{expenses.name}</h2>
            <h2>{expenses.amount}</h2>
            <h2>{expenses.createdAt}</h2>
            <h2 className='flex justify-start items-center gap-2'>
                <Trash className='text-red-600 cursor-pointer'
                     onClick = {()=>deleteExpense(expenses)}
                />
            </h2>
        </div>
        ))}
        
    </div>
  )
}

export default ExpenseListTable