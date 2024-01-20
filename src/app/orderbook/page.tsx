import React from 'react';


export default function Home() {
    return (
    <div className='max-w-screen-xl h-screen mx-auto'>
        <div className='mx-auto'>

            <div className='flex justify-center items-center'>
                <h1 className='text-4xl font-bold py-10 text-white'>Order Book</h1>
            </div>

            <div className='flex justify-center items-center'>
                <div className='flex flex-row space-x-20'>
                    <h1 className='text-md font-light text-white'>Quantity</h1>
                    <div>
                        <h1 className='text-md font-light text-white'>Bid</h1>
                    </div>

                    <h1 className='text-md font-light text-white'>Ask</h1>
                    <h1 className='text-md font-light text-white'>Quantity</h1>
                </div>
            </div>
            
        
        </div>
    </div>
    )
}
    