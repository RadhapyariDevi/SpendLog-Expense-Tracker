"use client"
import React, { useEffect } from 'react'
import { useUser } from '@clerk/nextjs';
import CardInfo from './_components/CardInfo';
import {db} from '@/utils/dbConfig';
import { desc, getTableColumns, sql } from 'drizzle-orm';
import { Budgets,Expenses } from '../../../utils/schema';
import { useState } from 'react';
import { eq } from 'drizzle-orm'
import BarChartDashboard from './_components/BarChartDashboard';
import BudgetItem from './budgets/_components/BudgetItem';
import ExpenseListTable from './expenses/_components/ExpenseListTable';


function Dashboard() {

  const {user} = useUser();

  const [budgetList,setBudgetList]= useState([]);
  const [expensesList,setexpensesList] = useState([]);
    
  
  useEffect(()=>{
      user && getBudgetList();
  },[user])


  const getBudgetList=async()=>{
      const result= await db.select({
          ...getTableColumns(Budgets),
          totalSpend:sql `sum(${Expenses.amount})`.mapWith(Number),
          totalItems:sql `count(${Expenses.id})`.mapWith(Number)
      }).from(Budgets)
      .leftJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
      .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id);

      

      setBudgetList(result);
      getAllExpenses();
  }

  const getAllExpenses = async()=>{
    const result = await db.select({
      id:Expenses.id,
      name:Expenses.name,
      amount:Expenses.amount,
      createdAt:Expenses.createdAt
    }).from(Budgets)
    .rightJoin(Expenses,eq(Budgets.id,Expenses.budgetId))
    .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
    .orderBy(desc(Expenses.id));
    setexpensesList(result);
  }


  return (
    <div className = 'p-8'>
      <h2 className ='font-bold text-3xl'>Hi, {user?.fullName} ❤️</h2>
      <CardInfo budgetList = {budgetList}/>
      <div className = 'grid grid-cols-1 md:grid-cols-3 mt-6 gap-5'>

        <div className = 'md:col-span-2'>
          <BarChartDashboard
          budgetList = {budgetList}/>
          <ExpenseListTable
             expenseList={expensesList}
             refreshData={()=>getBudgetList()}
          />
        </div>
        <div className='grid gap-3 self-start'>
          
          {budgetList.map((budget,index)=>(
            <BudgetItem budget={budget} key={index}/>
          ))}
        </div>
  
      </div>
    </div>
  )
}

export default Dashboard