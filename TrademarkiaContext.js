'use client'
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const TrademarkiaContext = createContext();

export const useTrademarkia = () => {
  return useContext(TrademarkiaContext);
};

export const TrademarkiaProvider = ({ children }) => {
  // State for search input
  const [input, setInput] = useState('');

  // State to store search results
  const [data, setData] = useState([]);

  // Perform the search API call
  const handleSearch = async (searchQuery) => {
    try {
      const response = await axios.post(
        '/api/trademark-search',
        {
          input_query: searchQuery, // Use the passed search query
          input_query_type: "",
          sort_by: "default",
          status: [],
          exact_match: false,
          date_query: false,
          owners: [],
          attorneys: [],
          law_firms: [],
          mark_description_description: [],
          classes: [],
          page: 1,
          rows: 10,
          sort_order: "desc",
          states: [],
          counties: [],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );

      setData(response.data); // Store the search results
      
      //Clear filters to avoid retaining previous data
      setSelectedOwners([]); 
      setSelectedLawFirms([]);
      setSelectedAttorneys([]);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch trademarks.\n Enter a valid name or try again later.');
    }
  };

  //Status Filter
  const statuses = [
    { id: 1, name: 'all', flag: null },
    { id: 2, name: 'registered', flag: 'bg-green-500' },
    { id: 3, name: 'pending', flag: 'bg-yellow-500' },
    { id: 4, name: 'rejected', flag: 'bg-red-500' },
    { id: 5, name: 'others', flag: 'bg-blue-500' },
  ];

  const [selectedStatus, setSelectedStatus] = useState('all');

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  //FilterButton
  const [showFilter, setShowFilter] = useState(true);

  const handleShowFilter = () => {
    setShowFilter(!showFilter);
    console.log(!showFilter);
  };

  //TabFilters
  const [activeTab, setActiveTab] = useState('Owners');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOwners, setSelectedOwners] = useState([]);
  const [selectedLawFirms, setSelectedLawFirms] = useState([]);
  const [selectedAttorneys, setSelectedAttorneys] = useState([]);

  const results = data?.body?.hits?.hits || [];

  const owners = [...new Set(results.map(item => item._source?.current_owner).filter(Boolean))];
  const lawFirms = [...new Set(results.map(item => item._source?.law_firm).filter(Boolean))];
  const attorneys = [...new Set(results.map(item => item._source?.attorney_name).filter(Boolean))];
  

  const handleCheckboxChange = (item, type) => {
    switch (type) {
      case 'owners':
        setSelectedOwners((prev) =>
          prev.includes(item)
            ? prev.filter((owner) => owner !== item)
            : [...prev, item]
        );
        break;
      case 'lawFirms':
        setSelectedLawFirms((prev) =>
          prev.includes(item)
            ? prev.filter((lawFirm) => lawFirm !== item)
            : [...prev, item]
        );
        break;
      case 'attorneys':
        setSelectedAttorneys((prev) =>
          prev.includes(item)
            ? prev.filter((attorney) => attorney !== item)
            : [...prev, item]
        );
        break;
      default:
        console.error('Invalid type');
    }
  };
  

  return (
    <TrademarkiaContext.Provider value={{ input, setInput, data, setData, handleSearch, statuses, selectedStatus, setSelectedStatus, handleStatusChange, showFilter, setShowFilter, handleShowFilter, activeTab, setActiveTab, searchTerm, setSearchTerm, selectedOwners, setSelectedOwners, selectedLawFirms, setSelectedLawFirms, selectedAttorneys, setSelectedAttorneys, owners, lawFirms, attorneys, handleCheckboxChange }}>
      {children}
    </TrademarkiaContext.Provider>
  );
};
