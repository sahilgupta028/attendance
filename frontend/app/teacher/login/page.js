"use client";
import Link from 'next/link'
import React, {useState} from 'react'
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const page = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async () => {

    try {
      const response = await fetch('http://localhost:8080/api/v1/teacher/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, password})
      });

      if (response.ok) {
        console.log('Login successful');
        const data = await response.json();
        const token = data.token;
        Cookies.set('token', token);

        console.log(token);

        router.push('/teacher');
      } else {
        const data = await response.json();
        setError(data.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error during login:', error.message || 'Unknown error');
      setError('Unknown error occurred');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500 font-mono">
      <div className="max-w-md w-full p-8 bg-white rounded-md shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-800">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-3 border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 transition duration-300"
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 transition duration-300"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300"
            onClick={handleLogin}
          >
            Login
          </button>
          {error && <p className="text-red-500 text-sm flex justify-center items-center">{error}</p>}
        </form>
        <div className="flex justify-center items-center mt-4">
          <p className="text-sm text-gray-800">Not a Teacher?</p>
          <Link href="/teacher/register">
            <button className="ml-2 text-blue-500 hover:underline">Sign-up Now</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default page