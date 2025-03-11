import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../config/api'

const Home = () => {
  const [data, setData] = useState([])
    const [loading , setLoading] = useState(true)
    const navigate = useNavigate()
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(`${api}/products/getProducts`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const data = await response.json()
        console.log('home data is:', data)
        setLoading(false)
        setData(data)
      } catch (e) {
        console.log(e)
      }
    }
    getProducts()
  }, [])
  if (loading) {
    return (
      <div  className=" mx-auto p-4">
        {/* Title section */}
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Products</h1>
  
        {/* Grid layout for skeleton loaders */}
        <div className="flex flex-wrap gap-3">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              style={{ maxWidth: "300px" , width:"250px" }}
              className=" bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 mx-auto animate-pulse"
            >
              {/* Skeleton Image */}
              <div className="h-48 bg-gray-300 rounded-t-lg"></div>
  
              {/* Skeleton Product Details */}
              <div className="p-4">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div> {/* Title Skeleton */}
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div> {/* Price Skeleton */}
                <div className="h-4 bg-gray-300 rounded w-2/3 mb-4"></div> {/* Category Skeleton */}
                <div className="h-10 bg-gray-300 rounded w-1/2"></div> {/* Button Skeleton */}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-screen-xl mx-auto p-4">
      {/* Title section */}
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Products</h1>
      
      <div className="max-w-screen-xl mx-auto p-4">

  {/* Grid layout for products */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {[...data].reverse().map((product) => (
    <div
      key={product.name}
      className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 mx-auto w-full"
    >
      {/* Image section */}
      <div className="w-full h-48">
        <img
          className="w-full h-full object-cover"
          src={product.imageUrl}
          alt={product.name}
        />
      </div>

      {/* Product details */}
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900 truncate">{product.name?.length > 15 ? product.name?.substring(0, 15) + '...' : product.name}</h2>
        <p className="mt-2 text-lg font-semibold text-gray-900">${product.price}</p>

        {/* Category, stock, and sales info */}
        <div className="mt-4 flex justify-between text-sm text-gray-600">
          <span>Category: {product.category}</span>
        </div>

        <div className="mt-2 text-sm text-gray-600">
          <button
            onClick={() => navigate(`/product/${product._id}`)}
            type="submit"
            className="bg-indigo-600 cursor-pointer text-white px-6 py-2 rounded"
          >
            View
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

</div>


    </div>
  )
}

export default Home
