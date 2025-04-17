import React from 'react'
import { FunnelIcon } from '@heroicons/react/24/outline';
import { useTrademarkia } from '../context/TrademarkiaContext';

function FilterButton() {
  const {showFilter, handleShowFilter} = useTrademarkia();

  return (
    <>
      <button 
        className={`${
          showFilter
            ? 'bg-blue-100 text-blue-500 border-blue-500'
            : 'bg-white text-gray-500 border-gray-300'
        } border-[0.5px] font-semibold rounded-lg capitalize cursor-pointer pl-5 pr-4 py-2 mx-6 mt-5 mb-2 w-fit`}
        onClick={() => handleShowFilter()}>
        <FunnelIcon className='inline size-5 lg:size-6 mr-1'/>
        {showFilter ? 'Hide Filter' : 'Show Filter'}
      </button>
    </>
  )
}

export default FilterButton