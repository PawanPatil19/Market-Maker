import { redirect } from 'next/navigation'
import Link from 'next/link'




export default async function Home() {
  const initializeMarket = {}

  return (
    <div className='max-w-screen-xl flex h-screen items-center  mx-auto'>
      <div className='mx-auto'>
        <h1 className='text-7xl font-bold py-20 text-white'>Market Maker</h1>
        <div className="flex flex-col">
          <Link href="/start">
            <div
              className="text-black bg-white border-r-4 border-b-4 border-t-2 border-l-2  hover:bg-orange-400 hover:text-white font-light rounded-full px-4 py-1 text-center">
              <span>
                New Game
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
