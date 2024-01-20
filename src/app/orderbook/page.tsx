"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'


export default function Home() {
    const router = useRouter();
    const [time, setTime] = useState(600);
    const [orders, setOrders] = useState([]);  
    const [buyOrders, setBuyOrders] = useState([]);
    const [sellOrders, setSellOrders] = useState([]);
    

    useEffect(() => {
        const interval = setInterval(() => {
          setTime((prevSeconds) => prevSeconds - 1);
        }, 1000);
    
        return () => clearInterval(interval);
      }, []);
    
      useEffect(() => {
        if (time <= 0) {
          // Redirect to another page after 10 minutes
          router.push('/result');
        }
      }, [time, router]);
    
      const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
      };
    
    useEffect(() => {
        // Function to fetch orders from the API
        const fetchOrders = async () => {
          try {
            const response = await fetch('http://172.31.94.145:8080/orderbook'); // Replace with your API endpoint
            if (!response.ok) {
              throw new Error(`Server returned ${response.status} status`);
            }
    
            const data = await response.json();
            console.log(data) 
            const tmp_data1 = data.replace("(", "");
            const tmp_data2 = tmp_data1.replace(")", "");

            const parts = tmp_data2.split("]],");
            console.log("parts ", parts)

            // Ensure that each part is a valid JSON array string
            const array1 = parts[0] + "]]";
            const array_buy = JSON.parse(array1);

            const array_sell = JSON.parse(parts[1]);
            console.log("array1: ", array_buy);
            console.log("array2: ", array_sell);

            setBuyOrders(array_buy);
            setSellOrders(array_sell.reverse());

            
          } catch (error) {
            console.error('Error fetching orders:');
          }
        };
    
        // Initial fetch
        fetchOrders();
    
        // Fetch orders every 5 seconds (adjust the interval as needed)
        const intervalId = setInterval(fetchOrders, 1000);
    
        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
      }, []);

      

    return (
    <div className='max-w-screen-xl h-screen mx-auto'>
        <div className='mx-auto'>

            <div className='flex justify-center items-center'>
                <h1 className='text-4xl font-bold pt-10 pb-2 text-white'>Order Book</h1>
            </div>

            <div className="text-center my-4">
                <p className="text-5xl py-5">{formatTime(time)}</p>
            </div>

            <div className="absolute left-1/2 -ml-0.5 w-0.5 h-screen bg-gray-600"></div>

            <div className='flex justify-center items-center'>
            <div className='flex flex-row space-x-20 pb-10'>
                
                {/* Iterate over orders and display them */}
                <h1 className='text-lg font-light text-white'>Quantity</h1>
                <h1 className='text-lg font-light text-white'>Bid</h1>

                <h1 className='text-lg font-light text-white'>Ask</h1>
                <h1 className='text-lg font-light text-white'>Quantity</h1>
                
            </div>
            </div>

            {sellOrders && sellOrders.length > 0 ? (
                sellOrders.map((order, index) => (
                    
                        <div key={index} className='flex flex-col pb-3' >
                            <div className='flex justify-center items-center'>
                                <div className='flex flex-row space-x-20'>
                                    <h1 className='text-md font-light text-white'>&nbsp;</h1>
                                    <h1 className='text-md font-light text-green-500'>&nbsp;&nbsp;&nbsp;&nbsp;</h1>

                                    <h1 className='text-md font-light text-red-500'>{order[0]}</h1>
                                    <h1 className='text-md font-light text-white'>{order[1]}</h1>
                                </div>
                            </div>
                            <hr className="border-b w-0.5 border-gray-600" />
                        </div>
                    
                ))) : (<p>No orders available</p>)}

            {buyOrders && buyOrders.length > 0 ? (
                buyOrders.map((order, index) => (
                    
                        <div key={index} className='flex flex-col pb-3' >
                            <div className='flex justify-center items-center'>
                                <div className='flex flex-row space-x-20'>
                                    <h1 className='text-md font-light text-white'>{order[1]}</h1>
                                    <h1 className='text-md font-light text-green-500'>{order[0]}</h1>

                                    <h1 className='text-md font-light text-red-500'>&nbsp;&nbsp;&nbsp;&nbsp;</h1>
                                    <h1 className='text-md font-light text-white'>&nbsp;</h1>
                                </div>
                            </div>
                            <hr className="border-b w-0.5 border-gray-600" />
                        </div>
                    
                ))) : (<p>No orders available</p>)}

            
            


            
        
        </div>
    </div>
    )
}
    