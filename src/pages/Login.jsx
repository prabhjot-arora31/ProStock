import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../config/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
    const navigate = useNavigate()
    useEffect(() => {
        if(localStorage.getItem('token'))
            navigate('/home/'+localStorage.getItem('_id'))
    },[])
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { email, password };
    setError('')
    try {
      const response = await fetch(`${api}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      console.log('data is:',data)
      if (response.ok) {
        if(data.status != 'Error')
        setSuccess('Login successful!');
        localStorage.setItem('token',data.token)
        localStorage.setItem('_id',data._id)
        localStorage.setItem('role',data.role)
        navigate('/home/'+localStorage.getItem('_id'))
        
      } else {
        setError(data.message || 'Incorrect credentials');
      }
    } catch (error) {
      setError('Error connecting to the server.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-lg mt-5">
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

      {error && <p className="text-red-500 text-center mb-2">{error}</p>}
      {success && <p className="text-green-500 text-center mb-2">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
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
        <div className="text-center">
          <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded">
            Login
          </button>
        </div>
          <div className='text-center'>
                Not registered? <Link to={'/register'} className='text-indigo-800'>Register</Link>
                </div>
      </form>
    </div>
  );
};

export default Login;
