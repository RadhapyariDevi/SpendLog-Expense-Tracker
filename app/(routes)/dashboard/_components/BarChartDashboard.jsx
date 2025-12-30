import React from 'react'
import { BarChart, Legend, XAxis, YAxis, CartesianGrid, Tooltip, Bar, ResponsiveContainer } from 'recharts';

function BarChartDashboard({budgetList}) {
  return (
    <div className='border rounded-lg p-5'>
        <h2 className='font-bold text-lg'>Activity</h2>
        <ResponsiveContainer width={'80%'} height={300}>
            <BarChart 
            data={budgetList}
            margin = {{
                top:5,
                right:5,
                left:5,
                bottom:5
            }}
            >
                <XAxis dataKey="name" />
                <YAxis width="auto" />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalSpend" stackId="a" fill="#85A947" />
                <Bar dataKey="amount" stackId="a" fill="#123524" />

            </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default BarChartDashboard