import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import {BrowserRouter , Routes , Route, useLocation} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header'
import Home from './pages/Home'
import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react'
import ProductDetails from './pages/ProductDetails'
import AddProducts from './components/AddProducts'
import EditProducts from './components/EditProducts'
import AdminLayout from './components/AdminLayout'
import EditProduct from './components/EditProduct'
import Cart from './pages/Cart'
import Checkout from './components/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import OrdersList from './components/OrdersList'
import SalesDashboard from './components/SalesDashboard'
import ContactForm from './pages/Contact'
function App() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate()
  const location = useLocation()
  // useEffect(() => {
  //   if(localStorage.getItem('token') && location.pathname == '/')
  //     {
  //       navigate('/home/'+localStorage.getItem('_id'))
  //     }
  //     else  navigate('/register')
  // },[])
  return (
    <>
    <Header />
    <Routes>
      <Route path='/home/:id' element={<Home />}/>
      <Route path='/admin' element={<AdminLayout />}>
      <Route path="add-products" element={<AddProducts />} />
          <Route path="edit-product" element={<EditProducts />} />
          
          <Route path="sales-tracking" element={<SalesDashboard />} />
          <Route path="orders" element={<OrdersList />} />
      
      </Route>
      <Route path="/admin/edit-product/:id" element={<EditProduct />} />
      
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/product/:id' element={<ProductDetails />}/>
      <Route path='/cart' element={<Cart />}/>
      <Route path='/contact' element={<ContactForm />}/>
      <Route path='/checkout' element={<Checkout />}/>
      <Route path='/order-confirmation/:orderId'  element={<OrderConfirmation />}/>
    </Routes>
    </>
  )
}

export default App
