"use client";
import { useRouter } from 'next/navigation';
import React from 'react'
import Link from 'next/link';

const Navbar = ({ name }) => {
    const router = useRouter();

    const logout = () => {
        localStorage.clear();
        router.push('/');
    }
    return (
      <nav className="bg-black p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-blue-500">Welcome, {name}</div>
          <button className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white" onClick={logout}>Logout</button>
        </div>
      </nav>
    );
  };

export default Navbar