import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const AdminLayout = () => {
  const location = useLocation()
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 md:w-48 lg:w-64 h-screen bg-gray-800 text-white p-5">
        <h2 className="text-2xl font-bold text-center text-gray-300 mb-8">Admin Panel</h2>
        
        <ul>
          <li className="mb-4 hover:bg-gray-700 rounded-md p-3">
            <Link to="/admin/add-products" className="flex items-center space-x-3">
              <i className="fas fa-box"></i>
              <span>Add Products</span>
            </Link>
          </li>
          {/* <li className="mb-4 hover:bg-gray-700 rounded-md p-3">
            <Link to="/admin/edit-product" className="flex items-center space-x-3">
              <i className="fas fa-edit"></i>
              <span>Edit Products</span>
            </Link>
          </li> */}
          <li className="mb-4 hover:bg-gray-700 rounded-md p-3">
            <Link to="/admin/sales-tracking" className="flex items-center space-x-3">
              <i className="fas fa-chart-line"></i>
              <span>Sales Tracking</span>
            </Link>
          </li>
          <li className="mb-4 hover:bg-gray-700 rounded-md p-3">
            <Link to="/admin/orders" className="flex items-center space-x-3">
              <i className="fas fa-box-open"></i>
              <span>Orders</span>
            </Link>
          </li>
          
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100 p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Admin Dashboard</h1>
        
        {/* Outlet for rendering child components */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
