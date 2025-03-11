import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../config/api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('_id');
  
    if (token && userId) {
      navigate(`/home/${userId}`);
    }
  }, [navigate]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
setLoading(true)
   
    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    const user = {
      name,
      email,
      password,
    };

    try {
      const response = await fetch(`${api}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Registration successful!');
        navigate('/login')
      } else {
        setError(data.message || 'Something went wrong.');
      }
    } catch (error) {
      setError('Error connecting to the server.');
    }
    setLoading(false)
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-lg mt-5">
      <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

      {error && <p className="text-red-500 text-center mb-2">{error}</p>}
      {success && <p className="text-green-500 text-center mb-2">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="text-center">
        <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded">
            {loading ? 'Loading' : 'Register'}
          </button>
        </div>
        <div className='text-center'>
        Already registered? <Link to={'/login'} className='text-indigo-800'>Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
