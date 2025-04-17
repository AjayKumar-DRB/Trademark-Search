'use client';
import SearchBar from '@/components/SearchBar';
import TotalTrademarks from "@/components/TotalTrademarks";
import Results from '@/sections/Results';
import Filter from '@/sections/Filter';

const Header = () => {

  return (
    <>
      <div className="flex justify-center lg:justify-start align-center items-center bg-blue-50/70 border-b-7 border-blue-100/50 pt-3 pb-5">
        <SearchBar />
      </div>
      <div>
        <TotalTrademarks/>
      </div>
      <div className='flex flex-col-reverse lg:flex-row lg:justify-around'>
        <div className='lg:w-2/3'>
          <Results/>
        </div>
        <div className='lg:w-1/3'>
          <Filter/>
        </div>
      </div>
    </>
  );
};

export default Header;
