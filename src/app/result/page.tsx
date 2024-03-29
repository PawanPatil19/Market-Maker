"use client";
import React, { useEffect, useState } from 'react';


export default function Home() {
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
          try {
            const response = await fetch('http://172.31.94.145:8080/results', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                }});
            
            const result = await response.json();
            console.log(result)
            setResults(result);
          } catch (error) {
            // Handle error
          }
        };
    
        fetchResults();
      }, []);

    return (
    <div className='max-w-screen-xl h-screen mx-auto'>
        <div className='mx-auto'>

            <div className='flex justify-center items-center'>
                <h1 className='text-4xl font-bold py-5 text-white'>Results</h1>
            </div>
            <hr className="border-b border-dashed border-gray-600" />

            <div className='flex justify-center items-center'>
                <h1 className='text-lg font-light py-5 text-white'>Statement</h1>
            </div>

            <div className='flex justify-center items-center'>
                <h1 className='text-5xl font-light py-5 text-white'>Answer</h1>
            </div>

            <div className='border-2 border-white my-20 py-4'>

                <div className='flex justify-center items-center'>
                    <h1 className='text-sm font-light text-white'>Most Profitable Trader</h1>
                </div>

                <div className='flex justify-center items-center'>
                    <h1 className='text-4xl font-light py-5 text-white'>{results[0][0]}</h1>
                </div>

                <div className='flex justify-center items-center'>
                    <h1 className='text-md font-light text-green-500'>{results[0][1]}</h1>
                </div>

            </div>


            {/* <div className='w-full flex flex-col space-y-2'>
                <div className='flex flex-row space-x-5 items-center'>
                    <h1 className='text-md font-light py-5 text-white'>2. </h1>
                    <h1 className='text-md font-light py-5 text-white'>User name</h1>
                    <h1 className='text-md font-light text-green-500'>+0.00</h1>
                </div>
            </div> */}


        
        </div>
    </div>
    )
}
    