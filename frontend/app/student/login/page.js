"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const LoginPage = () => {
  const [rollnumber, setRollnumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/student/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rollnumber, password }),
      });

      if (response.ok) {
        console.log('Login successful');
        router.push('/student');
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
            <label htmlFor="rollnumber" className="block text-sm font-semibold text-gray-800">
              Roll Number
            </label>
            <input
              type="text"
              id="rollnumber"
              className="w-full p-3 border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 transition duration-300"
              placeholder="Enter your Roll Number"
              value={rollnumber}
              onChange={(e) => setRollnumber(e.target.value)}
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
          <p className="text-sm text-gray-800">Not a Student?</p>
          <Link href="/student/register">
            <button className="ml-2 text-blue-500 hover:underline">Sign-up Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
