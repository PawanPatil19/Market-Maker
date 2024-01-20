import React, { useEffect, useState } from 'react';


export default async function Home() {
    const [orderbook, setOrderbook] = useState();

    const getOrderBook = await fetch('');

    

    

    return (
    <div className='max-w-screen-xl h-screen mx-auto'>
        <div className='mx-auto'>

            <div className='flex justify-center items-center'>
                <h1 className='text-4xl font-bold py-10 text-white'>Order Book</h1>
            </div>

            <div className="absolute left-1/2 -ml-0.5 w-0.5 h-screen bg-gray-600"></div>

            <div className='flex justify-center items-center pb-10'>
                <div className='flex flex-row space-x-20'>
                    <h1 className='text-md font-light text-white'>Quantity</h1>
                    <h1 className='text-md font-light text-white'>Bid</h1>

                    <h1 className='text-md font-light text-white'>Ask</h1>
                    <h1 className='text-md font-light text-white'>Quantity</h1>
                </div>
            </div>

            <div className='flex justify-center items-center'>
                <div className='flex flex-row space-x-20'>
                    <h1 className='text-md font-light text-white'>4</h1>
                    <h1 className='text-md font-light text-green-500'>10000</h1>

                    <h1 className='text-md font-light text-red-500'>20000</h1>
                    <h1 className='text-md font-light text-white'>2</h1>
                </div>
            </div>


            
        
        </div>
    </div>
    )
}
    