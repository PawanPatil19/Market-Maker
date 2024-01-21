"use client";
import React, { useState, useEffect } from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { MdOutlineAttachMoney } from "react-icons/md";
import Link from 'next/link';

export default function Home() {

    const [players, setPlayers] = useState([]);
    const [count, setCount] = useState([]);


    useEffect(() => {
        // Function to fetch orders from the API
        const fetchPlayers = async () => {
          try {
            const response = await fetch('http://172.31.94.145:8080/players'); // Replace with your API endpoint
            if (!response.ok) {
              throw new Error(`Server returned ${response.status} status`);
            }
    
            const data = await response.json();
            console.log(data) 
            setPlayers(data)
            setCount(data.length)

            
          } catch (error) {
            console.error('Error fetching orders:');
          }
        };
    
        // Initial fetch
        fetchPlayers();
    
        // Fetch orders every 5 seconds (adjust the interval as needed)
        const intervalId = setInterval(fetchPlayers, 1000);
    
        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
      }, []);


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
                <div className='flex flex-row space-x-14'>
                    
                        {players && players.length > 0 ? (
                            players.map((player, index) => (
                                
                                <div key={index} className='flex flex-col'>
                                    <FaRegUserCircle className="text-4xl text-gray-600" />
                                    <h1 className='text-sm font-light py-2 text-white'>{player}</h1>
                                </div>
                                
                            ))) : (<p>No players available</p>)}
                    
                    
                </div>
                
            </div>

            <div className='flex justify-center items-center'>
                <h1 className='text-sm font-light py-10 text-white'>{count} Traders joined...</h1>
            </div>

            
          
        </div>

        <div className="flex float-right pt-20">
            <Link href="/orderbook">
                <div className="text-black bg-white border-r-4 border-b-4 border-t-2 border-l-2  hover:bg-orange-400 hover:text-white font-light rounded-xl px-4 py-2 text-center">
                    <span className='flex items-center'>
                    
                    <MdOutlineAttachMoney className='text-lg'/>tart
                    </span>
                </div>
            </Link>
        </div>
            
      </div>
    );
  }