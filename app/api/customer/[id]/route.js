import Customer from "@/models/Customer";
import { NextResponse } from "next/server";

// GET - Get a specific customer by ID
export async function GET(request, { params }) {
  try {
    const customer = await Customer.findById(params.id); // Find customer by ID
    if (!customer) return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    return NextResponse.json(customer, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch customer" }, { status: 500 });
  }
}

// PUT - Update a customer by ID
export async function PUT(request, { params }) {
  try {
    const body = await request.json(); // Get the request body (JSON data)
    const customer = await Customer.findByIdAndUpdate(params.id, body, { new: true }); // Update customer
    if (!customer) return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    return NextResponse.json(customer, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update customer" }, { status: 500 });
  }
}

// DELETE - Delete a customer by ID
export async function DELETE(request, { params }) {
  try {
    const customer = await Customer.findByIdAndDelete(params.id); // Delete customer by ID
    if (!customer) return NextResponse.json({ error: "Customer not found" }, { status: 404 });
    return NextResponse.json({ message: "Customer deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete customer" }, { status: 500 });
  }
}
