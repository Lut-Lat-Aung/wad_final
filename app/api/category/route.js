import Category from "@/models/Category";
import { NextResponse } from "next/server";

// GET request to fetch all categories
export async function GET() {
  try {
    const categories = await Category.find().sort({ order: -1 });
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

// POST request to create a new category
export async function POST(request) {
  try {
    const body = await request.json();
    const category = new Category(body);
    await category.save();
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}

// PUT request to update an existing category
export async function PUT(request) {
  try {
    const body = await request.json();
    const category = await Category.findByIdAndUpdate(body._id, body, { new: true });
    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}
