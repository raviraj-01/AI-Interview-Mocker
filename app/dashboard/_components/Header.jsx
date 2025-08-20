"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";

function Header() {

    const path = usePathname();
    useEffect(() => {

    }, []);       

  return (
    <div className='flex p-4 items-center justify-between bg-gray-600 text-white shadow-md'>
      <Image src={'/logo.svg'} alt='logo' width={120} height={90}/>
      <ul className="hidden md:flex gap-6">
        <li> <Link href="/dashboard" className={`hover:text-amber-300 hover:font-bold transition-all cursor-pointer
        ${path =='/dashboard' && 'text-amber-300 font-bold'}
        `}
        >Dashboard
        </Link>
        </li>

        <li className={`hover:text-amber-300 hover:font-bold transition-all cursor-pointer
        ${path =='/dashboard/questions' && 'text-amber-300 font-bold'}
        `}>Questions</li>

        <li> <Link href="/dashboard/upgrade" className={`hover:text-amber-300 hover:font-bold transition-all cursor-pointer
        ${path =='/dashboard/upgrade' && 'text-amber-300 font-bold'}
        `}>Upgrade
        </Link>
        </li>

        <li className={`hover:text-amber-300 hover:font-bold transition-all cursor-pointer
        ${path =='/dashboard/how-works' && 'text-amber-300 font-bold'}
        `}>How it works?</li>

      </ul>
      <UserButton/>
    </div>
  );
}

export default Header;
