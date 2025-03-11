import React, { useState } from 'react';
import axios from 'axios';
import api from '../config/api';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    inStock: '',
    sales: 0, // Default value
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError('');
      const response = await axios.post(`${api}/products/addProduct`, formData);
      alert('Product added successfully');
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        imageUrl: '',
        inStock: '',
        sales: 0,
      });
    } catch (err) {
      setError('Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Product</h2>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row space-x-0 md:space-x-4">
          <div className="flex-1">
            <label className="block text-gray-700">Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md mt-1"
              placeholder="Enter product name"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md mt-1"
              placeholder="Enter product category"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row space-x-0 md:space-x-4">
          <div className="flex-1">
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md mt-1"
              placeholder="Enter product price"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700">In Stock</label>
            <input
              type="number"
              name="inStock"
              value={formData.inStock}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md mt-1"
              placeholder="Enter number of items in stock"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700">Product Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md mt-1"
            placeholder="Enter product description"
            rows="4"
          />
        </div>

        <div>
          <label className="block text-gray-700">Image URL</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md mt-1"
            placeholder="Enter product image URL"
          />
        </div>

        <div className="mt-4 text-center">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
