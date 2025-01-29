"use client"
import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
interface Client{
    _id:string,
    name:string,
    code:number,
    price:number,
    remainPrice:number,
    totalPrice:number,
    phone:number,
    status:string
    created_at:string,

}
export default function Repo(){

    const[filterdclients,setFilterdclients]=useState<Client[]>();
    useEffect(()=>{
        console.log("good",filterdclients)

        const getFilteredClients = async () => {
            try {
                const res = await fetch("/clients", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
        
                if (!res.ok) throw new Error('Failed to fetch clients.');
        
                const clients = await res.json();
                console.log(clients);
                // حساب تاريخ قبل يومين
                const today = new Date();
                const fiveDaysAgo = new Date(today);
                fiveDaysAgo.setDate(today.getDate() - 5);
        
                // تصفية العملاء
                const filClient = clients.filter((client:Client) => {
                    const clientDate = new Date(client.created_at);
                    return client.remainPrice > 0 && clientDate <= fiveDaysAgo
                });
                setFilterdclients(filClient)
                console.log(filClient);
            } catch (error) {
                console.error('Error fetching clients:', error);
                
            }
        };
        getFilteredClients();
        
    },[])
    return(
    <div className="main mt-10">

        <h2 className=" text-xl text-gray-500 font-serife font-semibold text-center ">تقرير العملاء الذين لديهم باقى و الذي كانوا على الأقل منذ 5 ايام</h2>
        <div className="overflow-scroll w-[90%] mx-auto">
        <table>
            <thead>
                <tr>
                    <th>Ac</th>
                    <th>الكود </th>
                    <th> الهاتف</th>
                    <th>السعر الكلى</th>
                    <th>المدفوع </th>
                    <th>الباقى</th>
                    <th>الاسم</th>
                    <th>الحاله</th>
                </tr>
            </thead>
            <tbody>
                {filterdclients?.map((client:Client,index:number) => (
                    <tr key={index}>
                        <td>
                        <div className="btns">
                        <button onClick={() =>{ redirect(`/updateClient/${client._id}`)}} className="btn  border p-3 bg-purple-800">تعديل</button>
                        </div>
                        </td>
                        <td>{client.code}</td>
                        <td>{client.phone}</td>
                        <td>{client.price}</td>
                        <td>{client.totalPrice}</td>
                        <td>{client.remainPrice}</td>
                        <td>{client.name}</td>
                        <td>{client.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>

    </div>
    
)
}

