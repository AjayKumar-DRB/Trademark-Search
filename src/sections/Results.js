import { useTrademarkia } from "@/context/TrademarkiaContext";
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { FaFlask } from 'react-icons/fa';

function Results() {
  const { data, selectedStatus, selectedOwners, selectedLawFirms, selectedAttorneys } = useTrademarkia();

  const results = data?.body?.hits?.hits || [];

  const hasNoResults = results.length === 0;

  const filteredResults = results.filter((item) => {
    const source = item._source || {};
    const statusCode = source.status_code || null;
    const owner = source.current_owner || "";
    const lawFirm = source.law_firm_name || "";
    const attorney = source.attorney_name || "";
  
    // Status filter
    const statusMatch =
      selectedStatus === "all" ||
      (selectedStatus === "registered" && statusCode === 800) ||
      (selectedStatus === "pending" && statusCode === 641) ||
      (selectedStatus === "rejected" && statusCode === 622);
  
    // Owner filter
    const ownerMatch =
    Array.isArray(selectedOwners) && selectedOwners.length > 0
      ? selectedOwners.includes(owner)
      : true;
  
    // Law Firm filter
    const lawFirmMatch =
    Array.isArray(selectedLawFirms) && selectedLawFirms.length > 0
      ? selectedLawFirms.includes(lawFirm) || selectedLawFirms.includes(source.law_firm)
      : true;
  
    // Attorney filter
    const attorneyMatch =
    Array.isArray(selectedAttorneys) && selectedAttorneys.length > 0
      ? selectedAttorneys.includes(attorney)
      : true;
  
    return statusMatch && ownerMatch && lawFirmMatch && attorneyMatch;
  });
  

  const showNoFilteredResults = filteredResults.length === 0;

  return (
    <div className="px-6 py-10">
      {hasNoResults || showNoFilteredResults ? (
        <div className="text-center py-[10%]">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Welcome to Trademarkia Search
          </h2>
          <p className="text-gray-500 text-sm">
            Enter a name to check for Trademarks.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Headers */}
          <div className="hidden lg:flex items-center justify-between px-6  font-semibold text-gray-700">
            <div className="w-20">Mark</div>
            <div className="flex-1 flex flex-col max-w-xl ml-6">
              <span>Details</span>
            </div>
            <div className="flex-1 flex flex-col ml-6">
              <span>Status</span>
            </div>
            <div className="lg:min-w-sm ml-5">
              <span>Class/Description</span>
            </div>
          </div>
          <hr className="border-gray-300"/>

          {/* Results */}
          {filteredResults.map((item, index) => {
            const source = item._source;
            const filingDate = new Date(source.filing_date * 1000).toLocaleDateString();
            const statusDate = new Date(source.status_date * 1000).toLocaleDateString();
            const isLive = source.status_type === "registered";

            return (
              <div
                key={index}
                className="flex items-center justify-between flex-col lg:flex-row p-6 bg-white"
              >
                {/* Mark Logo Placeholder */}
                <div className="w-20 h-20 bg-gray-100 flex items-center justify-center border border-gray-300 rounded shadow-neutral-300 shadow-2xl">
                  <span className="text-gray-400">No Image</span>
                </div>

                {/* Trademark Details */}
                <div className="flex flex-1 flex-row lg:flex-col justify-between w-full items-stretch ml-6 mt-6 lg:mt-0 lg:max-w-xl">
                  <div>
                    <h2 className="text-lg font-semibold">{source.mark_identification}</h2>
                    <p className="text-sm text-gray-600">{source.current_owner}</p>
                  </div>
                  <div>
                    <p className="text-base font-semibold lg:mt-2">{source.registration_number}</p>
                    <p className="text-sm text-gray-500">{filingDate}</p>
                  </div>
                </div>

                {/* Status */}
                <div className="flex flex-1 flex-row lg:flex-col justify-between w-full items-stretch ml-6 mt-2 lg:mt-0 space-y-1">
                  <div className="flex flex-col">
                    <span
                      className={`text-sm font-medium ${
                        isLive ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      ● {isLive ? "Live/Registered" : "Inactive"}
                    </span>
                    <span className="text-xs text-gray-600">
                      on <span className="font-semibold text-sm">{statusDate}</span>
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 mt-2">
                    <ArrowPathIcon className="inline size-5 text-red-600" /> 26 Dec 2027
                  </span>
                </div>

                {/* Class / Description */}
                <div className="lg:min-w-sm text-sm text-gray-700 mt-2 ml-5 lg:mt-0">
                  <p className="text-gray-800 text-sm font-normal line-clamp-2 max-w-xs">
                    {source.mark_description_description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-600">
                    <span className="px-2 py-1 border rounded-full">
                      <FaFlask className="inline size-5 text-gray-600" />
                      Class 45
                    </span>
                    <span className="px-2 py-1 border rounded-full">
                      <FaFlask className="inline size-5 text-gray-600" />
                      Class 38
                    </span>
                    <span className="px-2 py-1 border rounded-full">
                      <FaFlask className="inline size-5 text-gray-600" />
                      Class 9
                    </span>
                    <span className="px-2 py-1 border rounded-full">...</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Results;
