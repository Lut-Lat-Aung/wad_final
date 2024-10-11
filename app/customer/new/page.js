// app/customer/new/page.js
"use client";
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export default function AddCustomer() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    await fetch('/api/customer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    router.push('/customer');  // Redirect to customer list page
  };

  return (
    <div>
      <h1>Add New Customer</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('name', { required: true })} placeholder="Name" />
        <input {...register('dateOfBirth', { required: true })} type="date" placeholder="Date of Birth" />
        <input {...register('memberNumber', { required: true })} type="number" placeholder="Member Number" />
        <input {...register('interests', { required: true })} placeholder="Interests" />
        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Add Customer
        </button>
      </form>
    </div>
  );
}
