// app/customer/[id]/page.js
"use client";
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

export default function EditCustomer() {
  const { register, handleSubmit, reset } = useForm();
  const [customer, setCustomer] = useState(null);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Fetch customer by ID
      async function fetchCustomer() {
        const res = await fetch(`/api/customer/${id}`);
        const data = await res.json();
        setCustomer(data);
        reset(data); // Pre-fill the form with customer data
      }
      fetchCustomer();
    }
  }, [id, reset]);

  const onSubmit = async (data) => {
    await fetch(`/api/customer/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    router.push('/customer');  // Redirect to customer list page
  };

  if (!customer) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Customer</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('name', { required: true })} placeholder="Name" />
        <input {...register('dateOfBirth', { required: true })} type="date" placeholder="Date of Birth" />
        <input {...register('memberNumber', { required: true })} type="number" placeholder="Member Number" />
        <input {...register('interests', { required: true })} placeholder="Interests" />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Update Customer
        </button>
      </form>
    </div>
  );
}
