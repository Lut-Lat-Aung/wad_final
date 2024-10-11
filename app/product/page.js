"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export default function Home() {
  const APIBASE = process.env.NEXT_PUBLIC_API_URL; // Ensure API base is correct
  const { register, handleSubmit, reset } = useForm();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // Clear form function
  const clearForm = () => {
    reset({
      code: "",
      name: "",
      description: "",
      price: "",
      category: "",
    });
    setEditMode(false);
  };

  // Fetch all products
  async function fetchProducts() {
    try {
      const response = await fetch(`${APIBASE}/product`);
      if (!response.ok) throw new Error("Failed to fetch products");
      const productsData = await response.json();
      const formattedProducts = productsData.map((product) => {
        product.id = product._id;
        return product;
      });
      setProducts(formattedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  // Fetch all categories
  async function fetchCategory() {
    try {
      console.log("APIBASE:", APIBASE);  // Check API base
      const response = await fetch(`${APIBASE}/category`);
      if (!response.ok) throw new Error("Failed to fetch categories");

      const categories = await response.json();
      console.log("Fetched categories:", categories);  // Log fetched categories
      setCategory(categories);  // Update state with fetched categories
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  // Handle creating or updating a product
  const createProductOrUpdate = async (data) => {
    setLoading(true);
    try {
      const method = editMode ? "PUT" : "POST";
      const response = await fetch(`${APIBASE}/product`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Failed to ${editMode ? "update" : "add"} product`);
      }

      alert(`Product ${editMode ? "updated" : "added"} successfully`);
      clearForm();
      fetchProducts();
    } catch (error) {
      alert(`Failed to ${editMode ? "update" : "add"} product: ${error.message}`);
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Start edit mode for a product
  const startEdit = (product) => () => {
    setEditMode(true);
    reset(product);
  };

  // Delete product by ID
  const deleteById = (id) => async () => {
    if (!confirm("Are you sure?")) return;

    try {
      const response = await fetch(`${APIBASE}/product/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete product: ${response.status}`);
      }

      alert("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      alert(`Failed to delete product: ${error.message}`);
      console.error("Error deleting product:", error);
    }
  };

  // Fetch categories and products on component mount
  useEffect(() => {
    fetchCategory();
    fetchProducts();
  }, []);

  // Log the updated category state to ensure it is set correctly
  useEffect(() => {
    console.log("Category state updated:", category);
  }, [category]);

  return (
    <>
      <div className="flex flex-row gap-4">
        <div className="flex-1 w-64">
          <form onSubmit={handleSubmit(createProductOrUpdate)}>
            <div className="grid grid-cols-2 gap-4 m-4 w-1/2">
              <div>Code:</div>
              <div>
                <input
                  name="code"
                  type="text"
                  {...register("code", { required: true })}
                  className="border border-black w-full"
                />
              </div>
              <div>Name:</div>
              <div>
                <input
                  name="name"
                  type="text"
                  {...register("name", { required: true })}
                  className="border border-black w-full"
                />
              </div>
              <div>Description:</div>
              <div>
                <textarea
                  name="description"
                  {...register("description", { required: false })}
                  className="border border-black w-full"
                />
              </div>
              <div>Price:</div>
              <div>
                <input
                  name="price"
                  type="number"
                  {...register("price", { required: true })}
                  className="border border-black w-full"
                />
              </div>
              <div>Category:</div>
              <div>
                <select
                  name="category"
                  {...register("category", { required: true })}
                  className="border border-black w-full"
                >
                  {category && category.length > 0 ? (
                    category.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))
                  ) : (
                    <option disabled>No categories available</option>
                  )}
                </select>
              </div>
              <div className="col-span-2">
                {editMode ? (
                  <input
                    type="submit"
                    value="Update"
                    className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  />
                ) : (
                  <input
                    type="submit"
                    value="Add"
                    className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                  />
                )}
                {editMode && (
                  <button
                    type="button"
                    onClick={clearForm}
                    className="ml-2 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
        <div className="border m-4 bg-slate-300 flex-1 w-64">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <h1 className="text-2xl">Products ({products.length})</h1>
              <ul className="list-disc ml-8">
                {products.map((p) => (
                  <li key={p._id}>
                    <button className="border border-black p-1/2" onClick={startEdit(p)}>
                      📝
                    </button>{" "}
                    <button className="border border-black p-1/2" onClick={deleteById(p._id)}>
                      ❌
                    </button>{" "}
                    <Link href={`/product/${p._id}`} className="font-bold">
                      {p.name}
                    </Link>{" "}
                    - {p.description}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  );
}
