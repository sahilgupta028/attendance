"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Page = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const router = useRouter();

  const handleVerification = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ verificationCode }),
      });
      if (response.ok) {
        setVerificationSuccess(true);
        console.log(response);
        console.log(verificationSuccess);
        localStorage.setItem('verificationSuccess', verificationSuccess);
        router.push('/teacher');
      } else {
        throw new Error('Verification failed');
      }
    } catch (error) {
      console.error('Error verifying code:', error);
    }
  };

  return (
    <div className='bg-blue-500 min-h-screen p-3'>
      <div className="max-w-5xl mx-auto p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-8 text-center">Verification Code</h1>
        <div className="flex justify-center items-center mb-6">
          <input
            type="text"
            placeholder="Enter verification code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded mr-2"
          />
          <button
            onClick={handleVerification}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
