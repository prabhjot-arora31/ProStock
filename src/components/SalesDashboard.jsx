import React, { useEffect, useState } from 'react';
import SalesOverTime from './SalesOverTime'; // Use one import for the chart
import api from '../config/api';

const SalesDashboard = () => {
  const [salesData, setSalesData] = useState({
    totalSales: 0,
    totalOrders: 0,
    salesByCategory: [],
    salesByProduct: [],
  });

  const [salesDataOverTime, setSalesDataOverTime] = useState({
    labels: [],
    data: [],
  });
  
  

  useEffect(() => {
    const fetchSalesOverTime = async () => {
      try {
        const response = await fetch(`${api}/sales/getSalesOverTime`);
        const result = await response.json();
        console.log(result);  // Check if sales data is fetched correctly
        setSalesDataOverTime(result); // Update the state with fetched sales data
      } catch (error) {
        console.error('Error fetching sales data over time:', error);
      }
    };

    fetchSalesOverTime(); 
      // Fetch sales data from the backend
      const fetchSalesData = async () => {
        try {
          const response = await fetch(`${api}/sales/getSalesData`);
          const result = await response.json();
          setSalesData(result); // Update sales data state
        } catch (error) {
          console.error('Error fetching sales data:', error);
        }
      };
  
      fetchSalesData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">Sales Dashboard</h2>

      {/* Total Sales and Orders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 shadow rounded-lg">
          <h3 className="text-lg font-semibold">Total Sales</h3>
          <p className="text-2xl text-green-500">${salesData.totalSales.toFixed(2)}</p>
        </div>

        <div className="bg-white p-6 shadow rounded-lg">
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-2xl text-blue-500">{salesData.totalOrders}</p>
        </div>

        <div className="bg-white p-6 shadow rounded-lg">
          <h3 className="text-lg font-semibold">Sales by Category</h3>
          <ul>
            {salesData.salesByCategory.map((category, index) => (
              <li key={index} className="text-sm mb-2">{category._id}: ${category.totalSales}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Best-Selling Products */}
      <div className="bg-white p-6 shadow rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-4">Best-Selling Products</h3>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b">Product</th>
              <th className="px-6 py-3 border-b">Total Sales</th>
              <th className="px-6 py-3 border-b">Quantity Sold</th>
            </tr>
          </thead>
          <tbody>
            {salesData.salesByProduct.map((product, index) => (
              <tr key={index} className="border-t">
                <td className="px-6 py-4">{product._id}</td>
                <td className="px-6 py-4">${product.totalSales}</td>
                <td className="px-6 py-4">{product.quantitySold}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sales Over Time Chart */}
      <SalesOverTime chartData={salesDataOverTime} />
    </div>
  );
};

export default SalesDashboard;
