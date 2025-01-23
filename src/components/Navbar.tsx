"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import DropList from "./DropList";
export default function Navbar(){
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    useEffect(() => {
        const status = localStorage.getItem("isLoggedIn");
        setIsLoggedIn(status === "true");
        }, []);
        const handleLogout = () => {
            localStorage.setItem("isLoggedIn", "false");
            setIsLoggedIn(false);
            window.location.reload();
            window.location.href = "/"; 
        };
    return(<>
    {isLoggedIn&&

    <div className="main">
        <div className="nav flex justify-between w-full px-2 items-center  h-14 bg-gray-200 shadow ">
        <div className="logo flex items-center">
            <span className=" items-center inline-block bg-blue-500 w-7 h-7 rounded-full animate-pulse"></span>
            <span className="inline-block border border-blue-400 px-2 rounded-[47%] py-1  items-center ml-2 text-blue-900 text-xl italic font-serif font-semibold ">Alnoor</span>
        </div>
        <div className="linkes items-center flex max-[550px]:hidden">
            <Link className="mr-5 text-xl font-bold font-sans bg-blue-500 bg-opacity-50 p-2 rounded-xl hover:brightness-75" href={"/allClients"}>جميع  العملاء</Link>
            <Link className="mr-5 text-xl font-bold font-sans bg-blue-500 bg-opacity-50 p-2 rounded-xl hover:brightness-75" href={"/"}>اضافه عميل</Link>  
            <div className="btn">
        <button onClick={handleLogout} className="btn  p-2 bg-red-600 text-white font-semibold  rounded-lg ">تسجل خرووج</button>
        </div>   
        </div>
        <div className="linkes items-center flex min-[550px]:hidden">
            <DropList/>
        </div>
        </div>
    </div>
    }
    </>)
}