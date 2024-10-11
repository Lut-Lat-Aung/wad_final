// app/customer/page.js
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
    <div>
      <h1>Customer List</h1>
      <Link href="/customer/new">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add New Customer
        </button>
      </Link>
      <ul>
        {customers.map(customer => (
          <li key={customer._id}>
            <span>{customer.name}</span>
            <Link href={`/customer/${customer._id}`}>
              <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-4">
                Edit
              </button>
            </Link>
            <button
              onClick={() => deleteCustomer(customer._id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
