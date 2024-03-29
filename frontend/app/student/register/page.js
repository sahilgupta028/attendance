"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 

const Page = () => {
  const [name, setName] = useState('');
  const [rollnumber, setRollnumber] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); 

  const handleRegister = async (e) => {
    e.preventDefault(); 

    try {
      const response = await fetch('http://localhost:8080/api/v1/student/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          rollnumber,
          studentClass,
          password,
        }),
      });

      if (response.ok) {
        console.log('Registration successful');
        router.push('/student');
      } else {
        const data = await response.json();
        console.error('Registration failed:', data.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error during registration:', error.message || 'Unknown error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500 font-mono">
      <div className="max-w-md w-full p-8 bg-white rounded-md shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">🌟 Register</h2>
        <form className="space-y-4" onSubmit={handleRegister}> 
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-800">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 transition duration-300"
              placeholder="Enter your Name"
            />
          </div>
          <div>
            <label htmlFor="rollnumber" className="block text-sm font-semibold text-gray-800">
              Roll Number
            </label>
            <input
              type="text"
              id="rollnumber"
              value={rollnumber}
              onChange={(e) => setRollnumber(e.target.value)}
              className="w-full p-3 border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 transition duration-300"
              placeholder="Enter your Roll number"
            />
          </div>
          <div>
            <label htmlFor="class" className="block text-sm font-semibold text-gray-800">
              Class
            </label>
            <input
              type="text"
              id="class"
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
              className="w-full p-3 border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 transition duration-300"
              placeholder="Enter your Class"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 transition duration-300"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit" 
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300"
            onClick={handleRegister}
          >
            Register
          </button>
        </form>
        <div className="flex justify-center items-center mt-4">
          <p className="text-sm text-gray-800">Already a Student?</p>
          <Link href="/student/login">
            <button className="ml-2 text-blue-500 hover:underline">Login Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
