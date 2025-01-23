"use client"
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Toast } from "@/sweetalert";
import { Suspense, useEffect, useState } from "react"
import Swal from 'sweetalert2';
import { redirect } from "next/navigation";
interface client {
    _id:string,
    name:string,
    lences:string,
    frame:string,
    code:number,
    price:number,
    phone:number,
    status:string,
    created_at:string
}
export default function Show(){
    const[totalPrice,setTotalPrice]=useState<number>();
    const[filterdClients,setFilterdClients]=useState<client[]>()
    const[searchText,setSearchText]=useState<string>("")
    const[clients,setClients]=useState<client[]>();
    const deleteClient = async (id: string, name: string) => {
        const confirmation = await Swal.fire({
            title: 'هل أنت متأكد؟',
            text: `هل ترغب في حذف العميل "${name}"؟ هذا الإجراء لا يمكن التراجع عنه.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'نعم، احذف!',
            cancelButtonText: 'إلغاء',
            reverseButtons: true,
        });
    
        if (confirmation.isConfirmed) {
            try {
                const res = await fetch(`/clients/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    mode: 'cors',
                });
    
                if (!res.ok) {
                    Toast.fire({
                        icon: 'error',
                        title: `فشلت عملية الحذف للعميل "${name}". يرجى التحقق والمحاولة مرة أخرى.`,
                    });
                    throw new Error('Failed to delete client');
                }
            
                setClients((prevClients) => prevClients?.filter(client => client._id !== id));
                Toast.fire({
                    icon: 'success',
                    title: `تم حذف العميل "${name}" بنجاح.`,
                    timer: 2000
                });
            } catch (error) {
                
                console.error('Error deleting client:', error);
            }
        } else if (confirmation.dismiss === Swal.DismissReason.cancel) {
            Toast.fire({
                icon: 'info',
                title: `تم إلغاء عملية حذف العميل "${name}".`,
                timer: 2000
            });
        }
    };
    
    useEffect(()=>{
        const fetchdata =async()=>{
            const res = await fetch("/clients",{
                method:"GET",
                headers:{
                    'Content-Type':'application/json',
                },
                mode:'cors',
            })
            if(!res.ok) {
                Toast.fire({
                    icon: 'error',
                    title: 'Failed to fetch clients'
                })
                throw new Error("Failed to fetch clients")
            }
            else{
                const data =await res.json();
                setClients(data);
                setFilterdClients(data)
                console.log("Data fetched")
                console.log(data);
            }
        }
        fetchdata();
    },[])
    const handelserch=(e: React.ChangeEvent<HTMLInputElement>)=>{
        const value= e.target.value
        setSearchText(value);
        if(value.trim() ==="")
        {
            setFilterdClients(clients);
        }
        else{
            const filterd= clients?.filter(client=>client.name.toLowerCase().includes(searchText.toLowerCase()));
            setFilterdClients(filterd);
        }
    }
    const calcpprice = () => {
        let total = 0;
        // الحصول على التاريخ الحالي
        const today = new Date();
        // حساب تاريخ بداية الأسبوع (7 أيام مضت)
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 6);
        // تصفية العملاء وإجمال الأسعار
        filterdClients?.forEach((client: client) => {
          const clientDate = new Date(client.created_at); // افترض أن `client.addedDate` يحتوي على تاريخ الإضافة
        if (clientDate >= lastWeek && clientDate <= today) {
            total += client.price;
        }
        });
        setTotalPrice(total);
    }
    return(
        <>
        <div className="Main w-[96%] mx-auto my-20 ">
        <h2 className=" text-3xl text-gray-300 italic font-serif leading-4 tracking-widest text-center mb-5 ">العملاء</h2>
        <div className="clients ">
        <button
        onClick={calcpprice}
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none"
        >
            احسب مجموع الأسعار
        </button>

        {/* عرض النتيجة */}
        {totalPrice !== null && (
            <div className="my-4  p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-700">
                مجموع الأسعار خلال الأسبوع الماضي:
            </h2>
            <p className="text-xl font-bold text-blue-500">{totalPrice?totalPrice:0} EGP</p>
            </div>
        )}
        <div className="flex  items-center max-w-md mx-auto border border-gray-300 rounded-lg bg-white shadow-sm">
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-500 mx-2" />
            <input
                type="text"
                onChange={(e)=>{handelserch(e)}}
                placeholder="ابحث هنا..."
                className="flex-grow py-2 px-2 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
            />
            </div>
            <Suspense fallback ={<h1 className="text-center text-4xl text-blue font-extrabold">Loadding........</h1>}>
            <div className='overflow-scroll'>
            <table className="table">
                <thead>
                    <tr>
                        
                        <th> Ac</th>
                        <th> التاريخ</th>
                        <th>الكود </th>
                        <th> الهاتف</th>
                        <th>السعر </th>
                        <th>الشامبر</th>
                        <th>العدسه</th>
                        <th>الاسم </th>
                        <th>الحاله</th>
                    </tr>
                </thead>
                <Suspense fallback ={<h1 className="text-center text-4xl text-blue font-extrabold">Loadding........</h1>}>
                <tbody>
                    {filterdClients?.map(client=>(
                        <tr key={client._id}>
                            <td>
                            <div className="btns">
                            <button onClick={()=>{deleteClient(client._id,client.name)}} className="btn border p-3 bg-rose-700 ">حذف</button>
                            <button onClick={() =>{ redirect(`/updateClient/${client._id}`)}} className="btn  border p-3 bg-purple-800">تعديل</button>
                            </div>
                            </td>
                            <td>{client.created_at}</td>
                            <td>{client.code}</td>
                            <td>{client.phone}</td>
                            <td>{client.price}</td>
                            <td>{client.frame}</td>
                            <td>{client.lences}</td>
                            <td>{client.name}</td>
                            <td>{client.status}</td>
                        </tr>
                    ))}
                </tbody>
                </Suspense>
            </table>
            </div>
            </Suspense>
        </div>
        </div>
        </>
    )
}
