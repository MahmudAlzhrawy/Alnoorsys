'use client';

import { Toast } from "@/sweetalert";
import { useFormik } from "formik";
import { useRouter } from"next/navigation";
import { Suspense, useEffect, useState } from "react";
import * as YUP from "yup";

type Props = {
  clientId:string;
};

interface Client {
  _id: string;
  name: string;
  lences: string;
  frame: string;
  code: number;
  price: number;
  phone: number;
  status: string;
}

export default function Update ({ clientId }: Props) {
  const router = useRouter();
  const [client, setClient] = useState<Client | null>(null);
  
  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await fetch(`/clients/${clientId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          mode: 'cors',
        });
        if (res.ok) {
          const data = await res.json();
          setClient(data);
        } else {
          Toast.fire({ icon: 'error', title: 'هناك مشكله فى احضار هذا العميل ' });
        }
      } catch ( e) {
        Toast.fire({ icon: 'error', title: 'هناك مشكله فى احضار العميلات' });
        console.log(e);
      }
    };

    if (clientId) {
      fetchClient();
    }
  }, [clientId]);

  const formik = useFormik({
    initialValues: {
      name: client?.name || '',
      lences: client?.lences || '',
      frame: client?.frame || '',
      code: client?.code || 0,
      price: client?.price || 0,
      phone: client?.phone || 0,
      status: client?.status || '',
    },
    enableReinitialize: true, 
    validationSchema: YUP.object({
      name: YUP.string().required('Name is required'),
      lences: YUP.string().required('Lence is required'),
      frame: YUP.string().required('Frame is required'),
      code: YUP.number().required('Code is required'),
      price: YUP.number().required('Price is required'),
      phone: YUP.number().required('Phone is required'),
      status: YUP.string().required('Status is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await fetch(`/clients/${clientId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        if (res.ok) {
          Toast.fire({
            title: 'تم تعديل بيانات العميل بنجاح',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });
          resetForm();
          router.push('/allClients');
          
        } else {
          throw new Error('Failed to update client');
        }
      } catch (error) {
        Toast.fire({ icon: 'error', title: 'هناك مشكله فى تعديل بيانات العميل' });
        console.log(error)
      }
    },
  });

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      {!client?(<h2>loadding..........</h2>)
        :
      (<form className="w-[97%] mx-auto mt-14" onSubmit={formik.handleSubmit}>
      <fieldset className="border p-4 rounded">
        <legend className="text-lg font-bold mb-4">تعديل عميل </legend>
        <div className="formField">
          <label htmlFor="st">Status</label>
          <input
            onChange={formik.handleChange}
            value={formik.values.status}
            id="st"
            type="text"
            name="status"
          />
          <div className="error">{formik.touched.status && formik.errors.status}</div>
        </div>

        <div className="formField">
          <label htmlFor="name">Name</label>
          <input
            onChange={formik.handleChange}
            value={formik.values.name}
            id="name"
            type="text"
            name="name"
          />
          <div className="error">{formik.touched.name && formik.errors.name}</div>
        </div>

        <div className="formField">
          <label htmlFor="len">Lence</label>
          <input
            onChange={formik.handleChange}
            value={formik.values.lences}
            id="len"
            type="text"
            name="lences"
          />
          <div className="error">{formik.touched.lences && formik.errors.lences}</div>
        </div>

        <div className="formField">
          <label htmlFor="frm">Frame</label>
          <input
            onChange={formik.handleChange}
            value={formik.values.frame}
            id="frm"
            type="text"
            name="frame"
          />
          <div className="error">{formik.touched.frame && formik.errors.frame}</div>
        </div>

        <div className="formField">
          <label htmlFor="prc">Price</label>
          <input
            onChange={formik.handleChange}
            value={formik.values.price}
            id="prc"
            type="number"
            name="price"
          />
          <div className="error">{formik.touched.price && formik.errors.price}</div>
        </div>

        <div className="formField">
          <label htmlFor="pho">Phone</label>
          <input
            onChange={formik.handleChange}
            value={formik.values.phone}
            id="pho"
            type="number"
            name="phone"
          />
          <div className="error">{formik.touched.phone && formik.errors.phone}</div>
        </div>

        <div className="formField">
          <label htmlFor="cod">Code</label>
          <input
            onChange={formik.handleChange}
            value={formik.values.code}
            id="cod"
            type="number"
            name="code"
          />
          <div className="error">{formik.touched.code && formik.errors.code}</div>
        </div>

        <button className="mt-3 text-2xl font-bold " type="submit">حفظ</button>
      </fieldset>
      </form>)
      }
    </Suspense>
  );
}
