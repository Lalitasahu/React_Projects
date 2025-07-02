import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useWebsiteStore from '../store/websiteStore';

const WebsiteListPage = () => {
  const navigate = useNavigate();
  const websites = useWebsiteStore(state => state.websites);
  const setCurrentWebsite = useWebsiteStore(state => state.setCurrentWebsite);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedWebsites = websites.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(websites.length / itemsPerPage);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Website List</h2>
        <button
          onClick={() => navigate('/website/new')}
          className="btn-primary"
        >
          Add Website
        </button>
      </div>

      {websites.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No websites added yet</p>
          <button
            onClick={() => navigate('/website/new')}
            className="btn-primary"
          >
            Add Your First Website
          </button>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Website URL
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Primary Language
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Country
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Offers Summary
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedWebsites.map(website => (
                  <tr 
                    key={website.id} 
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      setCurrentWebsite(website);
                      navigate(`/website/${website.id}`);
                    }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {website.websiteUrl}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {website.primaryLanguage}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {website.country}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {website.offersSummary?.join(', ') || 'No offers'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentWebsite(website);
                          navigate(`/website/${website.id}`);
                        }}
                        className="text-primary hover:text-secondary"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
              <span className="font-medium">
                {Math.min(startIndex + itemsPerPage, websites.length)}
              </span>{' '}
              of <span className="font-medium">{websites.length}</span> results
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 text-sm rounded ${
                  currentPage === 1 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 text-sm rounded ${
                  currentPage === totalPages 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WebsiteListPage;