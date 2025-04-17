import React from 'react';
import { useTrademarkia } from '../context/TrademarkiaContext';

function Filter() {
  const { statuses, selectedStatus, handleStatusChange } = useTrademarkia();

  return (
    <div className="flex flex-col justify-start align-middle shadow-xl rounded-2xl p-4 m-4">
      <h1 className="text-lg font-bold text-black pb-2 ml-2">Status</h1>
      <div>
        {statuses.map((status) => (
          <button
            key={status.id}
            onClick={() => handleStatusChange(status.name)}
            className={`${
              selectedStatus === status.name
                ? 'bg-blue-100 text-blue-500 border-blue-500'
                : 'bg-white text-gray-950 border-gray-300'
            } border-[0.5px] font-semibold rounded-2xl cursor-pointer capitalize pl-5 pr-4 py-2 m-1`}
          >
            {status.flag && <span className={`size-3 rounded-full inline-block mr-2 ${status.flag}`}></span>}
            {status.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Filter;