import { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import { paginateItems } from '../utils/propertyUtils';
import getIcon from '../utils/iconUtils';

const PropertyGrid = ({ properties }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [paginatedData, setPaginatedData] = useState({ items: [], meta: {} });
  
  const ChevronLeftIcon = getIcon('ChevronLeft');
  const ChevronRightIcon = getIcon('ChevronRight');
  
  useEffect(() => {
    if (properties && properties.length > 0) {
      const data = paginateItems(properties, currentPage, itemsPerPage);
      setPaginatedData(data);
    }
  }, [properties, currentPage, itemsPerPage]);
  
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= paginatedData.meta.totalPages) {
      setCurrentPage(newPage);
      // Scroll to top of grid
      window.scrollTo({ top: document.getElementById('property-grid').offsetTop - 100, behavior: 'smooth' });
    }
  };
  
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };
  
  if (!properties || properties.length === 0) {
    return <div className="text-center py-12">No properties found</div>;
  }
  
  return (
    <div id="property-grid">
      {/* Properties Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedData.items.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
      
      {/* Pagination Controls */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between">
        <div className="text-sm text-surface-600 dark:text-surface-400 mb-4 sm:mb-0">
          Showing {paginatedData.meta.startIndex} to {paginatedData.meta.endIndex} of {paginatedData.meta.totalItems} properties
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="mr-4">
            <select 
              className="form-select text-sm py-1.5 px-3 rounded-md bg-white dark:bg-surface-800" 
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              aria-label="Items per page"
            >
              <option value="4">4 per page</option>
              <option value="8">8 per page</option>
              <option value="12">12 per page</option>
              <option value="16">16 per page</option>
            </select>
          </div>
          
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-md text-surface-700 dark:text-surface-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-100 dark:hover:bg-surface-800"
            aria-label="Previous page"
          >
            <ChevronLeftIcon size={20} />
          </button>
          
          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === paginatedData.meta.totalPages}
            className="p-2 rounded-md text-surface-700 dark:text-surface-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-100 dark:hover:bg-surface-800"
            aria-label="Next page"
          >
            <ChevronRightIcon size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyGrid;