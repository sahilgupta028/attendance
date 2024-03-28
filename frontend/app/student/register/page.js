import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500 font-mono">
      <div className="max-w-md w-full p-8 bg-white rounded-md shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">🌟 Register</h2>
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
            />
          </div>
          <div>
            <label htmlFor="rollnumber" className="block text-sm font-semibold text-gray-800">
              Roll Number
            </label>
            <input
              type="text"
              id="rollnumber"
              className="w-full p-3 border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 transition duration-300"
              placeholder="Enter your Roll number"
            />
          </div>
          <div>
            <label htmlFor="contact" className="block text-sm font-semibold text-gray-800">
              Class
            </label>
            <input
              type="text"
              id="class"
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
              className="w-full p-3 border-b-2 border-gray-400 focus:outline-none focus:border-blue-500 transition duration-300"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="button"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-300"
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
  )
}

export default page