import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../config/api';

const EditProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${api}/products/getProductsForAdmin`);
        setProducts(response.data);  // Assuming the response contains an array of products
      } catch (error) {
        setError('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/products/deleteProduct/${id}`);
      setProducts(products.filter(product => product._id !== id)); // Remove deleted product from state
    } catch (error) {
      setError('Failed to delete the product.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Manage Products</h2>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      {loading ? (
        <div>Loading products...</div>
      ) : (
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Product Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">In Stock</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.category}</td>
                <td className="p-3">${product.price}</td>
                <td className="p-3">{product.inStock}</td>
                <td className="p-3 flex flex-col gap-1">
                  <Link
                    to={`/admin/edit-product/${product._id}`}
                    className="bg-blue-600 text-white py-1 px-3 rounded-md mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-600 text-white py-1 px-3 rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EditProducts;
