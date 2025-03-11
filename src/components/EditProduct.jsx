import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import api from '../config/api';

const EditProductForm = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate();
  
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    inStock: '',
  });

  // Fetch all products to display in a list
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:9001/products/getProductForAdmin/'+id);
        setProducts(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    
    fetchProducts();
  }, []);
  
  // Fetch details for the selected product
  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`/products/getProduct/${id}`);
          setSelectedProduct(response.data);
          setFormData({
            name: response.data.name,
            description: response.data.description,
            price: response.data.price,
            category: response.data.category,
            imageUrl: response.data.imageUrl,
            inStock: response.data.inStock,
          });
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };

      fetchProduct();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${api}/products/editProduct`, { ...formData, id });
      alert('Product updated successfully');
      navigate('/admin'); // Navigate back to the list after update
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-5 flex flex-col">
        <h2 className="text-xl font-bold text-center mb-8">Admin Panel</h2>
        <ul className="space-y-4">
          <li className="hover:bg-gray-700 p-3 rounded-md">
            <Link to="/admin/add-products" className="flex items-center space-x-3">
              <i className="fas fa-box"></i>
              <span>Add Products</span>
            </Link>
          </li>
          <li className="hover:bg-gray-700 p-3 rounded-md">
            <Link to="/admin/edit-products" className="flex items-center space-x-3">
              <i className="fas fa-edit"></i>
              <span>Edit Products</span>
            </Link>
          </li>
          <li className="hover:bg-gray-700 p-3 rounded-md">
            <Link to="/admin/orders" className="flex items-center space-x-3">
              <i className="fas fa-shopping-cart"></i>
              <span>Sales Tracking</span>
            </Link>
          </li>
          <li className="hover:bg-gray-700 p-3 rounded-md">
            <Link to="/admin/orders" className="flex items-center space-x-3">
              <i className="fas fa-shopping-cart"></i>
              <span>Orders</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5 bg-gray-100">
        <h2 className="text-2xl font-semibold mb-5">Edit Product</h2>

       

        {/* Edit Product Form */}
        {selectedProduct && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Edit {selectedProduct.name}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={products.name}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  
                />
              </div>
              <div>
                <label className="block">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  placeholder={products.category}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  
                />
              </div>
              <div>
                <label className="block">Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder={products.price}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  
                />
              </div>
              <div>
                <label className="block">In Stock</label>
                <input
                  type="number"
                  name="inStock"
                  value={formData.inStock}
                  placeholder={products.inStock}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  
                />
              </div>
              <div>
                <label className="block">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder={products.description}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows="4"
                />
              </div>
              <div>
                <label className="block">Image URL</label>
                <input
                  type="url"
                  name="imageUrl"
                  placeholder={products.imageUrl}
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-3 rounded-md"
                >
                  Update Product
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProductForm;
