import Product from "@/models/Product";
import { NextResponse } from "next/server";  // Use NextResponse for consistent responses

// GET request to fetch all products
export async function GET() {
  try {
    const products = await Product.find();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// POST request to add a new product
export async function POST(request) {
  try {
    const body = await request.json();
    console.log(body);  // Log the request body for debugging
    const product = new Product(body);
    await product.save();
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

// PUT request to update an existing product
export async function PUT(request) {
  try {
    const body = await request.json();
    const { _id, ...updateData } = body;
    
    const product = await Product.findByIdAndUpdate(_id, updateData, { new: true });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

// PATCH request to partially update a product
export async function PATCH(request) {
  try {
    const body = await request.json();
    const { _id, ...updateData } = body;
    
    const product = await Product.findByIdAndUpdate(_id, updateData, { new: true });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to partially update product" }, { status: 500 });
  }
}
