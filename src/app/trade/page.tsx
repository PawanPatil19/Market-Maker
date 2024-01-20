import React from 'react';


export default function Home() {
    return (
        <div className='max-w-screen-xl mx-auto'>
            <div className='mx-left'>
                <h1 className='text-lg font-light pt-20 pb-10 px-2 text-white'>Your market position</h1>
            </div>


            <div className="w-full flex flex-row space-x-2">

                {/* left side */}
                <div className="w-full ">
                    <div className='border-2 border-white rounded-md p-5 my-2'>
                        <div className='flex flex-col'>
                            <h1 className='text-sm font-light text-gray-600 '>P&L</h1>
                            <h1 className='text-2xl font-light text-green-400'>+ 0.00</h1>
                        </div>
                    </div>

                    <div className='border-2 border-white rounded-md p-4 my-2'>
                        <div className='flex flex-col'>
                            <h1 className='mx-auto text-md font-light  text-white p-2'>Amount</h1>
                            <input type="text" id="first_name" className="mx-auto border border-gray-300 text-white-900 text-lg rounded-lg focus:ring-orange-400 focus:border-orange-400 block w-20 p-2.5 bg-gray-700  placeholder-gray-400 " placeholder="0" required></input>
                            <h1 className='mx-auto text-md font-light text-white p-2 pt-10'>Quantity</h1>
                            <input type="text" id="first_name" className="mx-auto border border-gray-300 text-white-900 text-lg rounded-lg focus:ring-orange-400 focus:border-orange-400 block w-20 p-2.5 bg-gray-700  placeholder-gray-400 " placeholder="0" required></input>
                        </div>
                    </div>

                    <div className='flex my-2'>
                        <button className="flex-1 text-white bg-green-500 border-r-4 border-b-4 border-t-2 border-l-2 font-light rounded-xl px-4 py-2 text-center">
                            <span>
                                Buy
                            </span>
                        </button>
                        <button className="flex-1 text-white bg-red-500 border-r-4 border-b-4 border-t-2 border-l-2 font-light rounded-xl px-4 py-2 text-center">
                            <span>
                                Sell
                            </span>
                        </button>
                    </div>
                </div>

                <div className="absolute left-1/2 -ml-0.5 w-0.5 h-screen bg-gray-600"></div>

                {/* right side */}
                <div className='w-full'>
                    

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


            
            
        </div>
    )
    
}