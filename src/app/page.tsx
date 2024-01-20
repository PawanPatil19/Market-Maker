
export default function Home() {
  return (
    <div className='max-w-screen-xl flex h-screen items-center  mx-auto'>
      <div className='mx-auto'>
        <h1 className='text-7xl font-bold py-20 text-white'>Market Maker</h1>
        <div className="flex flex-col">
          <button className="text-black bg-white border-r-4 border-b-4 border-t-2 border-l-2  hover:bg-orange-400 hover:text-white font-light rounded-xl px-4 py-2 text-center">
            <span>
              New Game
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
