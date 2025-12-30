"use client";
import ExpenseListTable from "./_components/ExpenseListTable";
import React, { useEffect, useState, useMemo } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/dbConfig";
import { desc, getTableColumns, sql, eq } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import Combobox from "./_components/Combobox";
import moment from "moment";

function Page() {
  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);
  const [expensesList, setexpensesList] = useState([]);
  const [selectedYear, setSelectedYear] = useState({
    label: new Date().getFullYear().toString(),
    value: new Date().getFullYear(),
  });
  const [selectedMonth, setSelectedMonth] = useState({
    label: "All Months",
    value: "all",
  });
  const [filterWeek, setFilterWeek] = useState(false);

  useEffect(() => {
    if (user) getBudgetList();
  }, [user]);

  const getBudgetList = async () => {
    const res = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItems: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id);
    setBudgetList(res);
    getAllExpenses();
  };

  const getAllExpenses = async () => {
    const res = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
      .orderBy(desc(Expenses.id));
    setexpensesList(res);
  };

  const yearOptions = useMemo(() => {
    const curY = new Date().getFullYear();
    const startY = expensesList.length > 0
        ? moment(expensesList[expensesList.length - 1].createdAt, "DD-MM-YYYY").year()
        : curY;
    const years = [];
    for (let y = startY; y <= curY; y++) {
      years.push({ label: y.toString(), value: y });
    }
    return years.length > 0 ? years : [{ label: curY.toString(), value: curY }];
  }, [expensesList]);

  const monthOptions = [
    { label: "All Months", value: "all" },
    { label: "January", value: 0 }, { label: "February", value: 1 },
    { label: "March", value: 2 }, { label: "April", value: 3 },
    { label: "May", value: 4 }, { label: "June", value: 5 },
    { label: "July", value: 6 }, { label: "August", value: 7 },
    { label: "September", value: 8 }, { label: "October", value: 9 },
    { label: "November", value: 10 }, { label: "December", value: 11 },
  ];

  const filteredExpenses = useMemo(() => {
    if (!expensesList.length) return [];
    
    return expensesList.filter((exp) => {
      const eDate = moment(exp.createdAt, "DD-MM-YYYY");
      
      if (!eDate.isValid()) return false;

      if (filterWeek) {
        return eDate.isSame(moment(), 'week');
      }

      const yMatch = eDate.year() === selectedYear.value;
      const mMatch = selectedMonth.value === "all" || eDate.month() === selectedMonth.value;

      return yMatch && mMatch;
    });
  }, [expensesList, selectedYear, selectedMonth, filterWeek]);

  return (
    <div className="ml-5 mr-5">
      <div className="mt-5 flex justify-between items-center flex-wrap gap-4">
        <h2 className="font-bold text-lg">Latest Expenses</h2>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFilterWeek(!filterWeek)}
            className={`px-4 py-2 rounded-lg border text-sm transition-all ${
              filterWeek ? "bg-primary text-white" : "bg-white text-black"
            }`}
          >
            {filterWeek ? "Clear Week Filter" : "This Week"}
          </button>
          {!filterWeek && (
            <>
              <Combobox
                items={yearOptions}
                value={selectedYear}
                onChange={(v) => setSelectedYear(v)}
                placeholder="Year"
                width="120px"
              />
              <Combobox
                items={monthOptions}
                value={selectedMonth}
                onChange={(v) => setSelectedMonth(v)}
                placeholder="Month"
                width="150px"
              />
            </>
          )}
        </div>
      </div>
      {expensesList.length > 0?
      (filteredExpenses.length > 0 ? (
        <ExpenseListTable
          expenseList={filteredExpenses}
          refreshData={() => getBudgetList()}
        />
      ) : (
        <div className="mt-10 flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-xl text-gray-400">
          <p className="text-lg font-medium">No entries found for this selection.</p>
        </div>
      ))
      :
        <div className=' m-5 p-5 bg-accent-foreground rounded-lg h-40 animate-pulse'>

        </div>
        
      }
      
    </div>
  );
}

export default Page;