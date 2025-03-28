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
    <div className="container">
      <h1 className="title">Add New Customer</h1>
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
            placeholder="Interests (e.g., football, movies)"
          />
        </div>

        <button type="submit" className="button button-primary">
          Add Customer
        </button>
      </form>
    </div>
  );
}
