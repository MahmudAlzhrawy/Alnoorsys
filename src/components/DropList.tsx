import Link from "next/link"
import { useState } from "react"
export default function DropList(){
    const handleLogout = () => {
        localStorage.setItem("isLoggedIn", "false");
        window.location.reload();
        window.location.href = "/"; 
    };
    const[click,setClick]=useState<boolean>(false);
    return(
    <div className="main">

        <div onClick={()=>{setClick(!click)}} className="spans group">
            <span className={`block mb-1 bg-black w-6 duration-500 ease-in-out h-[3px] ${click?" -rotate-45 translate-y-2 ":""} `}></span>
            <span className={` w-3 h-[3px] flex ${click&&"hidden "} bg-black  group-hover:w-6  duration-500 ease-in-out `}></span>
            <span className={`block w-6 bg-black mt-1 h-[3px] duration-500 ease-in-out ${click?"rotate-45  ":""}`}> </span>
        </div>
        {
            click &&
        <div className="linkes absolute top-[8%] right-2">
            <ul className="bg-gray-200 px-1 h-full rounded-md">
                <li className=" p-2 bg-gray-100 ">
                    <Link className=" text-xl font-bold font-sans  bg-opacity-50 p-1 rounded-xl hover:brightness-75" href={"/allClients"}>جميع  العملاء</Link>
                </li>
                <li className=" p-1 mt-2 bg-gray-100 ">
                    <Link className="  text-xl font-bold font-sans  bg-opacity-50 p-1 rounded-xl hover:brightness-75" href={"/"}>اضافه عميل</Link>
                </li>
                <li className=" p-1 mt-2 bg-red-600 rounded-lg  ">
                <div className="btn">
                <button onClick={handleLogout} className="btn  p-1  text-white font-semibold  ">تسجل خرووج</button>
                </div> 
                </li>
            </ul>
        </div>
        }
    </div>
    )
}