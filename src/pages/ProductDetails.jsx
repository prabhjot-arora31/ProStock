import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../config/api';

const ProductDetails = () => {
  const { id } = useParams(); 
  const [data, setData] = useState(null); 
  const [user, setUser] = useState(null); 
  const navigate = useNavigate(); 
    const [isAddedToCart, setIsAddedToCart] = useState(false)
  useEffect(() => {
    
  
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${api}/products/getProduct/${id}`, {
          method: 'GET',
        });
        const productData = await response.json();
        setData(productData); 
        const cart = JSON.parse(localStorage.getItem('cart') || [])
         setIsAddedToCart( cart.find((product) => product._id === productData._id))
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

   
    const userId = localStorage.getItem('_id');
    const token = localStorage.getItem('token');

    if (userId && token) {
      setUser({ _id: userId, token }); 
    }

    fetchProduct(); 
  }, [id]); 

  if (!data) {
    return (
      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Skeleton Loader for Image */}
          <div className="w-full max-w-md h-64 bg-gray-300 animate-pulse rounded-lg"></div>

          {/* Skeleton Loader for Details */}
          <div className="space-y-6">
            <div className="h-8 bg-gray-300 animate-pulse rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 animate-pulse rounded w-5/6"></div>
            <div className="h-6 bg-gray-300 animate-pulse rounded w-1/2"></div>
            <div className="h-4 bg-gray-300 animate-pulse rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 animate-pulse rounded w-1/3"></div>

            {/* Skeleton Buttons */}
            <div className="flex space-x-4">
              <div className="w-24 h-10 bg-gray-300 animate-pulse rounded"></div>
              <div className="w-24 h-10 bg-gray-300 animate-pulse rounded"></div>
              <div className="w-24 h-10 bg-gray-300 animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

 
  const { name, description, price, imageUrl, inStock } = data;

  
  const handleAddToCart = () => {
    if (user) {
      console.log('Add to cart:', data);
  
    
      let cartArr = JSON.parse(localStorage.getItem('cart')) || [];
  
     
      const existingProduct = cartArr.find(item => item._id === data._id);
  
      if (existingProduct) {
       
        existingProduct.quantity += 1;
      } else {
       
        const newProduct = { ...data, quantity: 1 };
        cartArr.push(newProduct);
      }
  
     
      localStorage.setItem('cart', JSON.stringify(cartArr));
      setIsAddedToCart(true)
    } else {
      alert('Please log in to add to cart');
      navigate('/login'); 
    }
  };
  
  
  
  

  
  const handleShare = () => {
    navigator.share({
      title: name,
      text: description,
      url: window.location.href,
    });
  };

  return (
    <>
    <button onClick={() => navigate(-1)} style={{marginTop:'20px' , marginLeft:"10px" , color:'white'}} className=' cursor-pointer bg-indigo-600 p-2 rounded '>Back</button>
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
       
        <div className="flex justify-center">
          <img className="w-full max-w-md rounded-lg shadow-lg" src={imageUrl} alt={name} />
        </div>

       
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{name}</h1>
          <p className="text-lg text-gray-600">{description}</p>
          <p className="text-xl font-semibold">Price: ${price}</p>
          <p className="text-md text-gray-500">Category: Electronics</p>
          <p className="text-md text-gray-500">In Stock: {inStock}</p>

         
          <div className="flex space-x-4">
            { !isAddedToCart ? <button
              onClick={handleAddToCart}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Add to Cart
            </button> : <button
              onClick={() => {
                setIsAddedToCart(false)
                let cartArr = JSON.parse(localStorage.getItem('cart')) || [];
                cartArr = cartArr.filter(item => item._id!== data._id);
                localStorage.setItem('cart', JSON.stringify(cartArr));
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
            >
              Remove from Cart
            </button>}
            
            <button
              onClick={handleShare}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
    </>

  );
};

export default ProductDetails;
