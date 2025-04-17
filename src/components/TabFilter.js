import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useTrademarkia } from '@/context/TrademarkiaContext';

const tabs = ['Owners', 'Law Firms', 'Attorneys'];

function Filter() {

  const { activeTab, setActiveTab, searchTerm, setSearchTerm, selectedOwners, selectedLawFirms, selectedAttorneys, owners, lawFirms, attorneys, handleCheckboxChange } = useTrademarkia();

  return (
    <div className="bg-white flex flex-col justify-start shadow-2xl rounded-2xl p-4 m-4">
      <div className="flex border-b border-gray-200 mb-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm font-medium px-3 pb-2 ${
              activeTab === tab
                ? 'text-black border-b-2 border-black'
                : 'text-gray-400'
            } cursor-pointer transition duration-200 ease-in-out`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="relative w-55 lg:w-fit">
        <input
          type="search"
          name="searchBar"
          id="searchBar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update input value in context
          placeholder={`Search ${activeTab}`}
          className="bg-white border-[0.5px] border-gray-300 text-gray-950 font-semibold rounded-2xl focus:border-gray-500 focus:outline-none focus:ring-0 focus:ring-gray-600 block w-full pl-8 pr-3 py-1.5 text-sm mb-3"
        />
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-500 absolute left-2 top-4 transform -translate-y-1/2" />
      </div>

      <div className="flex flex-col gap-2 overflow-y-auto max-h-60 pr-1">
      {activeTab === 'Owners' ? (
        owners
          .filter((owner) =>
            owner.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((owner, index) => (
            <label
              key={index}
              className={`flex items-center gap-2 px-2 py-1 rounded-xl cursor-pointer transition ${
                selectedOwners.includes(owner)
                  ? 'bg-blue-100 text-blue-600 font-semibold'
                  : 'hover:bg-gray-50'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedOwners.includes(owner)}
                onChange={() => handleCheckboxChange(owner, 'owners')}
                className="form-checkbox text-blue-600 rounded"
              />
              {owner}
            </label>
          ))
      ) : activeTab === 'Law Firms' ? (
        lawFirms
          .filter((lawFirm) =>
            lawFirm.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((lawFirm, index) => (
            <label
              key={index}
              className={`flex items-center gap-2 px-2 py-1 rounded-xl cursor-pointer transition ${
                selectedLawFirms.includes(lawFirm)
                  ? 'bg-blue-100 text-blue-600 font-semibold'
                  : 'hover:bg-gray-50'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedLawFirms.includes(lawFirm)}
                onChange={() => handleCheckboxChange(lawFirm, 'lawFirms')}
                className="form-checkbox text-blue-600 rounded"
              />
              {lawFirm}
            </label>
          ))
      ) : (
        attorneys
          .filter((attorney) =>
            attorney.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((attorney, index) => (
            <label
              key={index}
              className={`flex items-center gap-2 px-2 py-1 rounded-xl cursor-pointer transition ${
                selectedAttorneys.includes(attorney)
                  ? 'bg-blue-100 text-blue-600 font-semibold'
                  : 'hover:bg-gray-50'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedAttorneys.includes(attorney)}
                onChange={() => handleCheckboxChange(attorney, 'attorneys')}
                className="form-checkbox text-blue-600 rounded"
              />
              {attorney}
            </label>
          ))
      )}
      </div>
    </div>
  );
}

export default Filter;
