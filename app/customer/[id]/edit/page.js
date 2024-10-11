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
    router.push(`/customer/${id}`);  // Redirect to customer details page after update
  };

  if (!customer) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>Edit Customer</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            {...register('name', { required: true })}
            id="name"
            className="input"
            placeholder="Customer Name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            {...register('dateOfBirth', { required: true })}
            type="date"
            id="dateOfBirth"
            className="input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="memberNumber">Member Number:</label>
          <input
            {...register('memberNumber', { required: true })}
            type="number"
            id="memberNumber"
            className="input"
            placeholder="Member Number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="interests">Interests:</label>
          <input
            {...register('interests', { required: true })}
            id="interests"
            className="input"
            placeholder="Interests"
          />
        </div>

        <button type="submit" className="button button-primary">
          Update Customer
        </button>
      </form>
    </div>
  );
}
