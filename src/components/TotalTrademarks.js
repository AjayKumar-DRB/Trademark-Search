'use client';
import React from 'react';
import { useTrademarkia } from '@/context/TrademarkiaContext';

const TotalTrademarks = () => {
  const { data, input } = useTrademarkia();

  const total = data?.body?.hits?.total?.value || 0;

  return (
    <div className={`px-6 pt-4 pb-2 m-1 ${total === 0 ? 'hidden' : ''}`}>
      <p className="text-base font-bold text-gray-600 mb-2">
        About <span className="text-gray-600">{total}</span> Trademarks found for{" "}
        <span className="text-gray-600">{input}</span>
      </p>
      <hr className="border-gray-300 border-t-2"/>
    </div>
  );
};

export default TotalTrademarks;
