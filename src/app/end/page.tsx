import { redirect } from 'next/navigation'
import Link from 'next/link'




export default async function Home() {

  return (
    <div className='max-w-screen-xl flex h-screen items-center  mx-auto'>
      <div className='mx-auto'>
        <h1 className='text-7xl font-bold py-20 text-white'>The End</h1>
        
      </div>
    </div>
  );
}