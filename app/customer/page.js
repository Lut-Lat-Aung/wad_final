"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Fetch customers from API
    async function fetchCustomers() {
      const res = await fetch('/api/customer');
      const data = await res.json();
      setCustomers(data);
    }
    fetchCustomers();
  }, []);

  // Delete customer
  const deleteCustomer = async (id) => {
    if (!confirm('Are you sure you want to delete this customer?')) return;
    await fetch(`/api/customer/${id}`, { method: 'DELETE' });
    setCustomers(customers.filter(customer => customer._id !== id));
  };

  return (
    <div className="container">
      <h1>Customer List</h1>
      <div className="flex justify-center mb-6">
        <Link href="/customer/new">
          <button className="button button-primary">Add New Customer</button>
        </Link>
      </div>
      <ul>
        {customers.map(customer => (
          <li key={customer._id}>
            <Link href={`/customer/${customer._id}`}>
                
                <span>{customer.name}</span>
              </Link>
            <div>
              <Link href={`/customer/${customer._id}/edit`}>
                <button className="button button-edit ml-4">Edit</button>
              </Link>
              <button
                onClick={() => deleteCustomer(customer._id)}
                className="button button-danger ml-4"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
