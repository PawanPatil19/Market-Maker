"use client";
import React, { useState } from 'react';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation'

export default function Home() {
    const router = useRouter();
    const [name, setName] = useState("");
    console.log(name);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log(name);
        try {
          
          const url = `http://172.31.94.145:8080/user?name=${encodeURIComponent(name)}`;
    
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          });

          if (!response.ok) {
            throw new Error(`Server returned ${response.status} status`);
          }
    
          const result = await response.json();
          const id = result
          
          router.push(`/trade/${id}`);
        } catch (error) {
          console.error('Error submitting data:', error.message);
        }
      };

    

    return (
      <div className='max-w-screen-xl flex h-screen items-center mx-auto'>
        <div className='flex flex-col mx-auto'>
            <h1 className='mx-auto text-3xl font-bold py-20 text-white'>Join The Market</h1>
          
            <input type="text" 
                id="name" 
                className="mx-auto border border-gray-300 text-white-900 text-lg rounded-lg focus:ring-orange-400 focus:border-orange-400 block w-50 p-2.5 bg-gray-700  placeholder-gray-400 " 
                placeholder="Enter your name" 
                required
                onChange={(e) => setName(e.target.value)}
                value={name}></input>

            <div className="mx-auto py-4">
                <button onClick={handleSubmit} 
                    className="text-black bg-white border-r-4 border-b-4 border-t-2 border-l-2  hover:bg-orange-400 hover:text-white font-light rounded-full px-4 py-1 text-center">
                <span>
                    Join
                </span>
                </button>
            </div>
        </div>
      </div>
    );
  }
  