'use client'
import { Toast } from "@/sweetalert";
import { useFormik } from "formik";
import { Suspense} from "react";
import * as YUP from "yup";

export default function Insert(){

    const formik =useFormik({
        initialValues: {
        name: '',
        lences: '',
        frame: '',
        code: '',
        price: '',
        phone: '',
        status: '',
        },
        validationSchema: YUP.object({
        name: YUP.string().required('Name is required'),
        lences: YUP.string().required('Lence is required'),
        frame: YUP.string().required('Frame is required'),
        code: YUP.number().required('Code is required'),
        price: YUP.number().required('Price is required'),
        phone: YUP.number().required('Phone is required'),
        status: YUP.string().required('Status is required'),
        }),
        onSubmit: async(values, { resetForm }) => {
            try{

                const res = await fetch('/clients',{
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values),
                });
                if (!res.ok) throw new Error('Failed to create client');
                else {
                    Toast.fire({
                    title: 'تم اضافه العميل بنجاح',
                    icon:'success',
                    showConfirmButton: false,
                    timer: 1500,
                    })
                    resetForm();
                }
            }
            catch(error){
                console.error('Error creating client:', error);
            }
        },
    })
    return (<>
    
    <Suspense fallback={<h1>Loadding</h1>}>

    <form className="mt-10" onSubmit={formik.handleSubmit}>
        <fieldset className="border p-4 rounded">
        <legend className="text-lg font-bold mb-4">اضافه عميل </legend>
    <div className="formFeild">
        <label htmlFor="st">الحاله</label>
        <input 
        onChange={formik.handleChange}
        value={formik.values.status}
        id="st" 
        type="text"  
        name="status"  />
    <div className="erorr">{formik.touched.status&& formik.errors.status && formik.errors.status }</div>
    </div>
    <div className="formFeild">
    <label htmlFor="name">الاسم</label>
    <input 
        onChange={formik.handleChange}
        value={formik.values.name}
        id="name"
        type="text" 
        name="name"  />
        <div className="erorr">{formik.touched.name&& formik.errors.name && formik.errors.name}</div>
        </div>
        <div className="formFeild"><label htmlFor="len">العدسه</label>
        <input 
        onChange={formik.handleChange}
        value={formik.values.lences}
        id="len"
        type="text" 
        name="lences"   />
        <div className="erorr">{formik.touched.lences&& formik.errors.lences && formik.errors.lences}</div>
        </div>
        <div className="formFeild"><label htmlFor="frm">الشامبر</label>
        <input 
        onChange={formik.handleChange}
        value={formik.values.frame}
    id="frm"
    type="text" 
    name="frame"  />
    <div className="erorr">{formik.touched.frame&& formik.errors.frame && formik.errors.frame}</div>
    </div>
    <div className="formFeild"><label htmlFor="prc">السعر</label>
    <input 
        onChange={formik.handleChange}
        value={formik.values.price}
    id="prc"
    type="number"
    name="price"   />
    <div className="erorr">{formik.touched.price&& formik.errors.price&&formik.errors.price}</div>
    </div>
    <div className="formFeild"><label htmlFor="pho">رقم الهاتف</label>
    <input 
        onChange={formik.handleChange}
        value={formik.values.phone}
    id="pho"
    type="number" 
    name="phone"  />
    <div className="erorr">{formik.touched.phone&& formik.errors.phone&&formik.errors.phone}</div>
    </div>
    <div className="formFeild"><label htmlFor="cod">الكود</label>
    <input 
        onChange={formik.handleChange}
        value={formik.values.code}
    id="cod"
    type="number"  
    name="code" />.
    <div className="erorr">{formik.touched.code&&formik.errors.code&&formik.errors.code}</div>
    </div>
    <button type="submit">ِاضف العميل </button>
    </fieldset>
    </form>
    </Suspense>
</>)
}