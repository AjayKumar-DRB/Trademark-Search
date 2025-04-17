import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useTrademarkia } from '@/context/TrademarkiaContext';
import Image from 'next/image';

export default function SearchBar() {
  const { input, setInput, handleSearch } = useTrademarkia();

  const handleSearchClick = () => {
    if (input.trim()) {
      handleSearch(input.trim()); // Pass input directly to handleSearch
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim()) { // Check if Enter is pressed
      handleSearch(input.trim()); // Trigger search on Enter key press
    }
  };

  return (
    <div className="flex lg:flex-row flex-col items-center my-4 mx-6">
      <a href="./" className="inline-block">
        <Image
          className="mx-4 my-6 lg:my-0 w-32 h-auto lg:w-44"
          src="https://www.trademarkia.com/_next/image?url=%2Fassets%2Fimages%2Flogo_trademarkia.png&w=256&q=75"
          alt="Trademarkia Logo"
        />
      </a>
      <div className='flex flex-row'>
      <div className="relative w-55 lg:w-175">
        <input
          type="search"
          name="searchBar"
          id="searchBar"
          value={input}
          onChange={(e) => setInput(e.target.value)} // Update input value in context
          onKeyDown={handleKeyDown}
          placeholder="Search Trademarks Here eg. Mickey Mouse"
          className="bg-white border-[0.5px] border-gray-300 text-gray-950 font-semibold rounded-2xl focus:border-gray-500 focus:outline-none focus:ring-0 focus:ring-gray-600 block w-full pl-12 pr-4 py-4"
        />
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
      </div>
      <button
        onClick={handleSearchClick} // Trigger the handleSearch function with input
        className="ml-4 px-8 py-4 text-lg font-bold text-white bg-blue-500/90 rounded-2xl hover:bg-blue-600 cursor-pointer"
      >
        Search
      </button>
      </div>
    </div>
  );
}
