import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
const navigate = useNavigate()
  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
    calculateTotal(savedCart);
  }, []);

  // Calculate total price based on cart
  const calculateTotal = (cart) => {
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(totalPrice);
  };

  // Handle quantity change (increment and decrement)
  const handleQuantityChange = (id, change) => {
    const updatedCart = cart.map(item => {
      if (item._id === id) {
        if (item.quantity + change >= 1) {
          item.quantity += change;
        }
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  // Remove product from cart
  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center text-lg text-gray-500">Your cart is empty.</div>
      ) : (
        <div>
          <div className="overflow-x-auto">
  <table className="min-w-full table-fixed">
    <thead>
      <tr className="border-b bg-gray-100">
        <th className="p-4 text-left w-1/4">Product</th>
        <th className="p-4 text-center w-1/6">Price</th>
        <th className="p-4 text-center w-1/6">Quantity</th>
        <th className="p-4 text-center w-1/6">Total</th>
        <th className="p-4 text-center w-1/6 hidden sm:table-cell">Actions</th>
      </tr>
    </thead>
    <tbody>
      {cart.map((item, index) => (
        <tr key={index} className="border-b hover:bg-gray-50">
          <td className="p-4 flex flex-col items-start space-x-4 sm:space-x-2">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-20 h-20 sm:w-12 sm:h-12 object-cover rounded-md"
            />
            <span className="hidden sm:inline max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
              {item.name.length > 15 ? item.name.substring(0, 15) + '...' : item.name}
            </span>
            <span className="sm:hidden text-xs max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
              {item.name.length > 10 ? item.name.substring(0, 10) + '...' : item.name}
            </span>
          </td>
          <td className="p-4 text-center">${item.price.toFixed(2)}</td>
          <td className="p-4 flex items-center justify-center space-x-2">
            <button
              className="bg-gray-300 px-3 py-1 rounded-full"
              onClick={() => handleQuantityChange(item._id, -1)}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              className="bg-gray-300 px-3 py-1 rounded-full"
              onClick={() => handleQuantityChange(item._id, 1)}
            >
              +
            </button>
          </td>
          <td className="p-4 text-center">${(item.price * item.quantity).toFixed(2)}</td>
          <td className="p-4 text-center hidden sm:table-cell">
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => removeFromCart(item._id)}
            >
              Remove
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


          <div className="mt-6 text-right">
            <div className="text-xl font-semibold">
              Total: ${total.toFixed(2)}
            </div>
            <button onClick={() => navigate('/checkout')} className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
