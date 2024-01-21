"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { FaRegUserCircle } from "react-icons/fa";
import {
    Badge,
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
    Text,
    Title,
  } from "@tremor/react";


export default function Home({params} : any) {
    const router = useRouter()
    const id = params.id;
    console.log("id ", id);

    const [amount, setAmount] = useState("");
    const [quantity, setQuantity] = useState("");
    const [orders, setOrders] = useState([]);  
    const [buyOrders, setBuyOrders] = useState([]);
    const [sellOrders, setSellOrders] = useState([]);
    const [username, setUsername] = useState("Username");
    const [PL, setPL] = useState(0);
    const [position, setPosition] = useState(0);
    

    const getUserInfo = async (id: string | number | boolean) => {
        console.log("my id ", id);
        try {
          const url = `http://172.31.94.145:8080/users/${encodeURIComponent(id)}`;
          const response = await fetch(url);
    
          if (!response.ok) {
            throw new Error(`Server returned ${response.status} status`);
          }
    
          const data = await response.json();
          console.log("Name ", data)

          setUsername(data.name);
          setPosition(data.score)
        } catch (error) {
          console.error('Error fetching data:');
          throw error;
        }
      };
    
      useEffect(() => {
        const userId = id;
        getUserInfo(userId);
      }, []); 

      useEffect(() => {
        // Function to fetch orders from the API
        const fetchOrders = async () => {
          try {
            
            const response = await fetch(`http://172.31.94.145:8080/orderbook/${id}`); // Replace with your API endpoint
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

      useEffect(() => {
        // Function to fetch orders from the API
        const fetchPL = async () => {
          try {
            const response = await fetch(`http://172.31.94.145:8080/expected_pnl/${id}`); // Replace with your API endpoint
            if (!response.ok) {
              throw new Error(`Server returned ${response.status} status`);
            }
    
            const data = await response.json();
            setPL(data);
            

            
          } catch (error) {
            console.error('Error fetching orders:');
          }
        };
    
        // Initial fetch
        fetchPL();
    
        // Fetch orders every 5 seconds (adjust the interval as needed)
        const intervalId = setInterval(fetchPL, 1000);
    
        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
      }, []);
    
    

      const buyAction = async (idx: any) => {
        console.log("buy ", idx);
        try {
            const url = `http://172.31.94.145:8080/users/${idx}/orders`;
            console.log("url", url);

            var raw = JSON.stringify({
                "order_id": "0",
                "price": amount,
                "quantity": quantity,
                "type": "B"
              });
    
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                },
                body: raw
            });

            if (!response.ok) {
                throw new Error(`Server returned ${response.status} status`);
            }
        
            const result = await response.json();
            console.log("result", result)
    
        } catch (error) {
          console.error('Error submitting data:');
        }
      };


      const sellAction = async (idx: any) => {
        console.log("buy ", id);
        try {
            const url = `http://172.31.94.145:8080/users/${idx}/orders`;
            console.log("url", url);

            var raw = JSON.stringify({
                "order_id": "0",
                "price": amount,
                "quantity": quantity,
                "type": "S"
              });
    
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                },
                body: raw
            });

            if (!response.ok) {
                throw new Error(`Server returned ${response.status} status`);
            }
        
            const result = await response.json();
            console.log("result", result)
    
        } catch (error) {
          console.error('Error submitting data:');
        }
      };

    

    return (
        <div className='max-w-screen-xl mx-auto'>
            <div className='flex justify-between items-center pt-20 pb-10'>
                <div className='flex space-x-5'>
                    <h1 className='text-3xl font-light text-white'>Your market position : </h1>
                    <h1 className='text-3xl font-light text-white'>{position}</h1>
                </div>
                <div className='flex items-center'>
                    <FaRegUserCircle className='text-2xl text-white'></FaRegUserCircle>
                    <h1 className='text-sm font-light  text-white p-2'>{username}</h1>
                </div>
                
            </div>


            <div className="w-full md:flex space-x-2">

                {/* left side */}
                <div className="w-0.25 ">
                    <div className='border-2 border-white rounded-md p-5 my-2'>
                        <div className='flex flex-col'>
                            <h1 className='text-sm font-light text-gray-600 '>Expected P&L based on last traded price</h1>
                            {
                                PL>=0 ? (
                                    <h1 className='text-2xl font-light text-green-400'>{PL}</h1>
                                ) : (
                                    <h1 className='text-2xl font-light text-red-400'>{PL}</h1>
                                )
                            }
                            
                        </div>
                    </div>

                    <div className='border-2 border-white rounded-md p-4 my-2'>
                        <div className='flex flex-col'>
                            <h1 className='mx-auto text-md font-light  text-white p-2'>Price</h1>
                            <input type="text" 
                                id="amount" 
                                className="mx-auto border border-gray-300 text-white-900 text-lg rounded-lg focus:ring-orange-400 focus:border-orange-400 block w-20 p-2.5 bg-gray-700  placeholder-gray-400 " 
                                placeholder="0" 
                                required
                                onChange={(e) => setAmount(e.target.value)}
                                value={amount}></input>

                            <h1 className='mx-auto text-md font-light text-white p-2 pt-10'>Quantity</h1>
                            <input type="text" 
                                id="quantity" 
                                className="mx-auto border border-gray-300 text-white-900 text-lg rounded-lg focus:ring-orange-400 focus:border-orange-400 block w-20 p-2.5 bg-gray-700  placeholder-gray-400 " 
                                placeholder="0" 
                                required
                                onChange={(e) => setQuantity(e.target.value)}
                                value={quantity}></input>
                        </div>
                    </div>

                    <div className='flex my-2 space-x-2'>
                        <button
                            onClick = {() => buyAction(id)} 
                            className="flex-1 text-white bg-green-500 border-r-4 border-b-4 border-t-2 border-l-2 font-light rounded-xl px-4 py-2 text-center">
                            <span>
                                Buy
                            </span>
                        </button>
                        <button 
                            onClick = {() => sellAction(id)} 
                            className="flex-1 text-white bg-red-500 border-r-4 border-b-4 border-t-2 border-l-2 font-light rounded-xl px-4 py-2 text-center">
                            <span>
                                Sell
                            </span>
                        </button>
                    </div>
                </div>

                {/* <div className="absolute left-1/2 -ml-0.5 w-0.5 h-screen bg-gray-600 hidden md:block"></div> */}

                {/* right side */}
                <div className='w-full py-5 md:py-2'>
                    

                    {/* <div className='flex justify-center items-center pb-10'>
                        <div className='flex flex-row space-x-20'>
                            <h1 className='text-md font-light text-white'>Your bids</h1>
                            <h1 className='text-md font-light text-white'>Total bids</h1>
                            <h1 className='text-md font-light text-white'>Bid</h1>

                            <h1 className='text-md font-light text-white'>Ask</h1>
                            <h1 className='text-md font-light text-white'>Total asks</h1>
                            <h1 className='text-md font-light text-white'>Your asks</h1>
                        </div>
                    </div> */}

                    {/* {sellOrders && sellOrders.length > 0 ? (
                        sellOrders.map((order, index) => (
                    
                        <div className='flex flex-col pb-3' key={index}>
                            <div className='flex justify-center items-center'>
                                <div className='flex flex-row space-x-20'>
                                    <h1 className='text-lg font-light text-white'>&nbsp;</h1>
                                    <h1 className='text-lg font-light text-white'>&nbsp;</h1>
                                    <h1 className='text-lg font-light text-green-500'>&nbsp;&nbsp;&nbsp;&nbsp;</h1>

                                    <h1 className='text-lg font-light text-red-500'>{order[0]}</h1>
                                    <h1 className='text-lg font-light text-white'>{order[1]}</h1>
                                    <h1 className='text-lg font-light text-white'>{order[2]}</h1>
                                </div>
                            </div>
                            <hr className="border-b w-0.5 border-gray-600" />
                        </div>
                    
                ))) : (<p>No ask orders available</p>)} */}

                    {/* {buyOrders && buyOrders.length > 0 ? (
                buyOrders.map((order, index) => (
                    
                        <div className='flex flex-col pb-3' key={index}>
                            <div className='flex justify-center items-center'>
                                <div className='flex flex-row space-x-20'>
                                    <h1 className='text-lg font-light text-white'>{order[2]}</h1>
                                    <h1 className='text-lg font-light text-white'>{order[1]}</h1>
                                    <h1 className='text-lg font-light text-green-500'>{order[0]}</h1>

                                    <h1 className='text-lg font-light text-red-500'>&nbsp;&nbsp;&nbsp;&nbsp;</h1>
                                    <h1 className='text-lg font-light text-white'>&nbsp;</h1>
                                    <h1 className='text-lg font-light text-white'>&nbsp;</h1>
                                </div>
                            </div>
                            <hr className="border-b w-0.5 border-gray-600" />
                        </div>
                    
                ))) : (<p>No buy orders available</p>)} */}


                <Card>
                    
                    <Table className="mt-5">
                    <TableHead>
                        <TableRow>
                        <TableHeaderCell>Total bids</TableHeaderCell>
                        <TableHeaderCell>Size</TableHeaderCell>
                        <TableHeaderCell>Bid</TableHeaderCell>
                        <TableHeaderCell>Ask</TableHeaderCell>
                        <TableHeaderCell>Size</TableHeaderCell>
                        <TableHeaderCell>Total asks</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sellOrders && sellOrders.length > 0 ? (sellOrders.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                
                            </TableCell>
                            <TableCell>
                            
                            </TableCell>
                            <TableCell>
                            
                            </TableCell>
                            <TableCell>
                            <span className='text-green-500'>{item[0]}</span>
                            </TableCell>
                            <TableCell>
                            {item[2]}
                            </TableCell>
                            <TableCell>
                            {item[1]}
                            </TableCell>
                        </TableRow>
                        ))) : (<p>No ask orders available</p>)}

                        {buyOrders && buyOrders.length > 0 ? ( buyOrders.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>
                            {item[1]}
                            </TableCell>
                            <TableCell>
                            {item[2]}
                            </TableCell>
                            <TableCell>
                            <span className='text-red-500'>{item[0]}</span>
                            </TableCell>
                            <TableCell>
                            
                            </TableCell>
                            <TableCell>
                            
                            </TableCell>
                            <TableCell>
                            
                            </TableCell>
                        </TableRow>
                        ))): (<p>No buy orders available</p>)}
                    </TableBody>
                    </Table>
                </Card>

            
            

                </div>

            </div>
            
        </div>
    )
    
}