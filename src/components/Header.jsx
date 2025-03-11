import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate()
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-indigo-600 text-white shadow-md">
      <nav className="max-w-screen-xl mx-auto p-5 flex justify-between items-center">
        {/* Logo and Name */}
        <div className="text-2xl font-bold flex items-center">
          <span className="text-white">ProStock</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to={`/home/${localStorage.getItem('_id')}`} className="hover:text-indigo-300 transition duration-300">Home</Link>
          <Link to="/contact" className="hover:text-indigo-300 transition duration-300">Contact</Link>
          { localStorage.getItem('role') == 'admin' &&
            <Link to='/admin' className="hover:text-indigo-300 transition duration-300">Admin</Link>
          }
          {
  localStorage.getItem('token') ? (
    // If token exists, render nothing (or some other component)
    <>
    <Link to="/cart" className="hover:text-indigo-300 transition duration-300">Cart</Link>
    <button
      onClick={()=>  { localStorage.removeItem('token') ; localStorage.removeItem('_id'); navigate('/login') }}
      className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition duration-300"
      >
      Logout
    </button>
      </>
  ) : (
    <>
      <Link to="/login" className="block hover:text-indigo-300">
        Login
      </Link>
      <Link to="/register" className="block hover:text-indigo-300">
        Register
      </Link>
    </>
  )
}
</div>

        {/* Hamburger Button for Mobile */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex items-center space-x-2"
        >
          <span className="text-2xl">☰</span>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-indigo-600 text-white p-4 space-y-4">
                 <Link to={`/home/${localStorage.getItem('_id')}`} className="hover:text-indigo-300 transition duration-300">Home</Link>

          <Link to="/contact" className="block hover:text-indigo-300">Contact</Link>
          {
  localStorage.getItem('token') ? (

    // If token exists, render nothing (or some other component)
    <div className='flex flex-col items-start relative top-[-14px] gap-2'>
      { localStorage.getItem('role') == 'admin' &&
            <Link to='/admin' className="hover:text-indigo-300 transition duration-300">Admin</Link>
          }
    <Link to="/cart" className="hover:text-indigo-300 transition duration-300">Cart</Link>

    <button
      onClick={()=>  { localStorage.removeItem('token') ; localStorage.removeItem('_id'); navigate('/login') }}
      className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition duration-300"
      >
      Logout
    </button>
      </div>
  ) : (
    <>
      <Link to="/login" className="block hover:text-indigo-300">
        Login
      </Link>
      <Link to="/register" className="block hover:text-indigo-300">
        Register
      </Link>
    </>
  )
}

        </div>
      )}
    </header>
  );
};

export default Header;
