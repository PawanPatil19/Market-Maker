"use client";
import React, { useEffect, useState } from 'react';


export default function Home() {
    //const [time, setTime] = useState(300);
    const [orders, setOrders] = useState([]);  
    console.log(orders);
    
    useEffect(() => {
        // Function to fetch orders from the API
        const fetchOrders = async () => {
          try {
            const response = await fetch('http://172.31.94.145:8080/orderbook'); // Replace with your API endpoint
            if (!response.ok) {
              throw new Error(`Server returned ${response.status} status`);
            }
    
            const data = await response.json();
            setOrders(data);
          } catch (error) {
            console.error('Error fetching orders:', error.message);
          }
        };
    
        // Initial fetch
        fetchOrders();
    
        // Fetch orders every 5 seconds (adjust the interval as needed)
        const intervalId = setInterval(fetchOrders, 5000);
    
        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
      }, []);

    return (
    <div className='max-w-screen-xl h-screen mx-auto'>
        <div className='mx-auto'>

            <div className='flex justify-center items-center'>
                <h1 className='text-4xl font-bold py-10 text-white'>Order Book</h1>
            </div>

            <div className="absolute left-1/2 -ml-0.5 w-0.5 h-screen bg-gray-600"></div>

            <div className='flex justify-center items-center'>
            <div className='flex flex-row space-x-20'>
                {/* Iterate over orders and display them */}
                {orders.map((order, index) => (
                    order.type === 'B' ? (
                        <div className='flex flex-col pb-3'>
                            <div className='flex justify-center items-center'>
                                <div className='flex flex-row space-x-20'>
                                    <h1 className='text-md font-light text-white'>4</h1>
                                    <h1 className='text-md font-light text-green-500'>10000</h1>

                                    <h1 className='text-md font-light text-red-500'>&nbsp;&nbsp;&nbsp;&nbsp;</h1>
                                    <h1 className='text-md font-light text-white'>&nbsp;</h1>
                                </div>
                            </div>
                            <hr className="border-b w-0.5 border-gray-600" />
                        </div>
                    ) : (
                        <div className='flex flex-col pb-3'>
                            <div className='flex justify-center items-center'>
                                <div className='flex flex-row space-x-20'>
                                    <h1 className='text-md font-light text-white'>&nbsp;</h1>
                                    <h1 className='text-md font-light text-green-500'>&nbsp;&nbsp;&nbsp;&nbsp;</h1>

                                    <h1 className='text-md font-light text-red-500'>20000</h1>
                                    <h1 className='text-md font-light text-white'>2</h1>
                                </div>
                            </div>
                            <hr className="border-b w-0.5 border-gray-600" />
                        </div>
                    )
                ))}
            </div>
            </div>


            
        
        </div>
    </div>
    )
}
    