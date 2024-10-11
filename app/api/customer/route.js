import Customer from "@/models/Customer"; // Assuming you have a Customer model defined
import { NextResponse } from "next/server";

// GET - List all customers
export async function GET() {
  try {
    const customers = await Customer.find(); // Fetch all customers from the database
    return NextResponse.json(customers, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch customers" }, { status: 500 });
  }
}

// POST - Add a new customer
export async function POST(request) {
  try {
    const body = await request.json(); // Get the request body (JSON data)
    const customer = new Customer(body); // Create a new customer document
    await customer.save(); // Save the customer to the database
    return NextResponse.json(customer, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create customer" }, { status: 500 });
  }
}
