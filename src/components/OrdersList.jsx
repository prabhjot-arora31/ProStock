import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../config/api';
import axios from 'axios';

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${api}/orders/getOrders`);
        const result = await response.json();
        setOrders(result); 
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Update order status function
  const updateOrderStatus = async (orderId, status) => {
    try {
      // API call to update order status using axios
      const response = await axios.patch(`${api}/orders/updateOrder/${orderId}`, {
        orderStatus: status, // Sending the status as 'success' or 'failure'
      });
  
      console.log('response::', response);
  
      if (response.status !== 200) {
        throw new Error('Failed to update order status');
      }
  
      // Get the updated order data from the API response
      const updatedOrder = response.data;
  
      // Update the orders state to reflect the updated status
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === updatedOrder._id ? { ...order, status: updatedOrder.status } : order
        )
      );
  
      // Show a success message
      alert(`Order status updated to ${status}`);
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Error updating order status');
    }
  }

  if (loading) {
    return <div className="text-center">Loading orders...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">Order List</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b">Order ID</th>
            <th className="px-6 py-3 border-b">Product</th>
            <th className="px-6 py-3 border-b">Quantity</th>
            <th className="px-6 py-3 border-b">Total Price</th>
            <th className="px-6 py-3 border-b">Shipping Address</th>
            <th className="px-6 py-3 border-b">Status</th>
            <th className="px-6 py-3 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="px-6 py-4">{order._id}</td>
                <td className="px-6 py-4">{order.product.name}</td>
                <td className="px-6 py-4">{order.quantity}</td>
                <td className="px-6 py-4">${order.totalPrice}</td>
                <td className="px-6 py-4">{order.shippingAddress}</td>
                <td className={`px-6 py-4 `}
                >
                   <span className={order.status === 'Success' ?  'text-green-500' : order.status == 'Pending' ? 'text-yellow-800' : 'text-red-500'}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 space-x-2">
                  {/* Action buttons to approve or decline */}
                  {  order.status == 'Pending' ? <>
                  <button
                    onClick={() => {
                      // console.log('happened')
                      updateOrderStatus(order._id, 'Success')
                    }}
                    className="text-blue-500 hover:text-blue-700"
                    disabled={order.status !== 'Pending'}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateOrderStatus(order._id, 'Failure')}
                    className="text-red-500 hover:text-red-700"
                    disabled={order.status !== 'Pending'}
                  >
                    Decline
                  </button>
                  </> : <>No Actions!</>}

                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="px-6 py-4 text-center">No orders found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersList;
