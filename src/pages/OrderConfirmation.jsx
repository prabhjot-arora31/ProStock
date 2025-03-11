import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './OrderConfirmation.css'
import api from '../config/api';
const OrderConfirmation = () => {
  const { orderId } = useParams();  // Retrieve the orderId from the URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
const navigate = useNavigate()
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`${api}/orders/confirmation/${orderId}`);
        const result = await response.json();
        if (result._id) {
          setOrder(result);
          localStorage.setItem('cart',JSON.stringify([]))
        } else {
          alert('Order not found');
        }
      } catch (error) {
        console.error('Error fetching order:', error);
        alert('Failed to fetch order');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="loading mt-15 text-center">
        <p>Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="error mt-15 text-center">
        <p>Order not found.</p>
      </div>
    );
  }

  return (
    <div className="order-confirmation">
      <h2>Order Confirmation</h2>
      <div className="order-details">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Product:</strong> {order.product.name}</p>
        <p><strong>Quantity:</strong> {order.quantity}</p>
        <p><strong>Total Price:</strong> ${order.totalPrice}</p>
        <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
        <p><strong>Order Status:</strong> {order.status}</p>
        <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
      </div>
      <button className="btn-primary" onClick={() => navigate('/home/'+localStorage.getItem('_id'))}>Back to Home</button>
    </div>
  );
};

export default OrderConfirmation;
