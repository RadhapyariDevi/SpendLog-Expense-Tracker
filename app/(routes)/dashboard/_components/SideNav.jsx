"use client";
import React from "react";
import Image from "next/image";
import {
  DollarSign,
  LayoutGrid,
  PiggyBank,
  ReceiptText,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

function SideNav({ closeSideNav }) {
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Budgets",
      icon: PiggyBank,
      path: "/dashboard/budgets",
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText,
      path: "/dashboard/expenses",
    },
    {
      id: 4,
      name: "Currency",
      icon: DollarSign,
      path: "/dashboard/currency",
    },
  ];
  const path = usePathname();
  useEffect(() => {
    console.log(path);
  }, [path]);

  const handleLinkClick = () => {
    if (closeSideNav) {
      setTimeout(() => {
        closeSideNav();
      }, 500);
    }
  };

  return (
    <div className="h-screen p-5 border shadow-sm">
      <Image
        src={"/SpendLog.png"}
        alt="Logo"
        width={160}
        height={65}
        className="object-cover"
      />
      <div className="mt-6">
        {menuList.map((menu, index) => (
          <Link
            key={menu.id}
            href={menu.path}
            onClick={handleLinkClick}
          >
            <h2
              className={`flex gap-2 items-center
                 text-gray-600 font-medium mb-2
                 p-5 cursor-pointer rounded-md
                 hover:text-secondary-foreground hover:bg-secondary
                    ${
                      path === menu.path
                        ? "bg-secondary text-secondary-foreground"
                        : ""
                    }
                 `}
            >
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className="fixed bottom-10 p-5 flex gap-2 items-center">
        <UserButton />
        Profile
      </div>
    </div>
  );
}

export default SideNav;
