import React from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { MdOutlineAttachMoney } from "react-icons/md";
import Link from 'next/link';

export default function Home() {
    return (
      <div className='max-w-screen-xl h-screen mx-auto'>
        <div className='mx-auto'>

            <div className='flex justify-center items-center'>
                <h1 className='text-sm font-light py-10 text-white'>Market</h1>
            </div>
            <div className='flex justify-center items-center pb-10'>
                <h1 className='text-7xl font-bold text-white'>Statement</h1>
            </div>

            <Link href = "">
                <div className='flex justify-center items-center pb-40'>
                    <h1 className='text-sm font-light underline text-white'>Share link &nbsp;</h1>
                    <IoMdShare className='text-lg'></IoMdShare>
                </div>
            </Link>

            

            <div className='flex justify-center items-center'>
                <div className='flex flex-row space-x-10'>
                    <div className='flex flex-col'>
                        <FaRegUserCircle className="text-4xl text-gray-600" />
                        <h1 className='text-sm font-light py-2 text-white'>User</h1>
                    </div>
                    
                    <div className='flex flex-col'>
                        <FaRegUserCircle className="text-4xl text-gray-600" />
                        <h1 className='text-sm font-light py-2 text-white'>User</h1>
                    </div>
                    <div className='flex flex-col'>
                        <FaRegUserCircle className="text-4xl text-gray-600" />
                        <h1 className='text-sm font-light py-2 text-white'>User</h1>
                    </div>

                    <div className='flex flex-col'>
                        <FaRegUserCircle className="text-4xl text-gray-600" />
                        <h1 className='text-sm font-light py-2 text-white'>User</h1>
                    </div>

                    <div className='flex flex-col'>
                        <FaRegUserCircle className="text-4xl text-gray-600" />
                        <h1 className='text-sm font-light py-2 text-white'>User</h1>
                    </div>
                </div>
                
            </div>

            <div className='flex justify-center items-center'>
                <h1 className='text-sm font-light py-10 text-white'>0 Traders joined...</h1>
            </div>
          
        </div>

        <div className="flex float-right pt-20">
                <button className="text-black bg-white border-r-4 border-b-4 border-t-2 border-l-2  hover:bg-orange-400 hover:text-white font-light rounded-xl px-4 py-2 text-center">
                    <span className='flex items-center'>
                    
                    <MdOutlineAttachMoney className='text-lg'/>tart
                    </span>
                </button>
            </div>
      </div>
    );
  }