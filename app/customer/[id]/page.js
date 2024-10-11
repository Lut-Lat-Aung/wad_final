"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function CustomerDetails() {
  const [customer, setCustomer] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Fetch customer by ID
      async function fetchCustomer() {
        const res = await fetch(`/api/customer/${id}`);
        const data = await res.json();
        setCustomer(data);
      }
      fetchCustomer();
    }
  }, [id]);

  if (!customer) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>Customer Details</h1>

      <div className="detail-group">
        <h2>Name:</h2>
        <p>{customer.name}</p>
      </div>

      <div className="detail-group">
        <h2>Date of Birth:</h2>
        <p>{new Date(customer.dateOfBirth).toLocaleDateString()}</p>
      </div>

      <div className="detail-group">
        <h2>Member Number:</h2>
        <p>{customer.memberNumber}</p>
      </div>

      <div className="detail-group">
        <h2>Interests:</h2>
        <p>{customer.interests}</p>
      </div>

      <Link href={`/customer/${customer._id}/edit`}>
        <button className="button button-primary">Edit Customer</button>
      </Link>
      <Link href={`/customer/`}>
        <button className="button button-primary">Back to Customer List</button>
      </Link>
    </div>
  );
}
