import React from 'react'
import StatusFilter from '@/components/StatusFilter'
import TabFilter from '@/components/TabFilter'
import FilterButton from '@/components/FilterButton'
import { useTrademarkia } from '@/context/TrademarkiaContext'

function Filter() {
  const {showFilter} = useTrademarkia();

  return (
    <>
      <FilterButton/>
      {showFilter === true ? 
      <div>
        <StatusFilter/>
        <TabFilter/>
      </div>
      :
      null
      }
    </>
  )
}

export default Filter