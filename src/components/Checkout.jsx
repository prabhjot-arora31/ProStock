import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../config/api';

const Checkout = () => {
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    
    // Ensure the user is logged in
    const userId = localStorage.getItem('_id');
    if (!userId) {
      alert('Please log in to place an order');
      return;
    }
  
    // Build the order data from the cart
    const orderData = {
      user: userId,  // User ID associated with the order
      product: cart[0]._id,  // Assuming there's only one product in the cart for now
      quantity: cart[0].quantity,  // The quantity of that product
      totalPrice: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),  // Total price of all items
      shippingAddress: shippingAddress,  // Shipping address from the user
    };
  
    try {
      // Send a POST request to the backend
      const response = await fetch(`${api}/orders/createOrder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
  
      const result = await response.json();
      if (result._id) {
        console.log('Order created:', result);
        // Navigate to the order confirmation page
        navigate(`/order-confirmation/${result._id}`);
      } else {
        console.error('Failed to create order:', result);
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };
  
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

      <div className="mb-6">
        <label htmlFor="shippingAddress" className="block text-lg font-semibold mb-2">
          Shipping Address
        </label>
        <textarea
          id="shippingAddress"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          placeholder="Enter your shipping address"
          className="w-full p-4 border rounded-md"
          required
        ></textarea>
      </div>

      <div className="mb-6">
        <label htmlFor="paymentMethod" className="block text-lg font-semibold mb-2">
          Payment Method
        </label>
        <select
          id="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-4 border rounded-md"
        >
          <option value="Credit Card">Credit Card</option>
          <option value="PayPal">PayPal</option>
          <option value="Bank Transfer">Bank Transfer</option>
        </select>
      </div>

      <div className="text-right">
        <h2 className="text-xl font-semibold mb-6">Total: ${totalPrice.toFixed(2)}</h2>
        <button
          onClick={handleSubmitOrder}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
