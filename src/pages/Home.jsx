import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';
import { toast } from 'react-toastify';
import PropertyGrid from '../components/PropertyGrid';
import { generateSampleProperties, filterProperties } from '../utils/propertyUtils';
import getIcon from '../utils/iconUtils';
import { generateSampleProperties } from '../utils/propertyUtils';

  const [searchCriteria, setSearchCriteria] = useState(null);
  const [allProperties, setAllProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const FilterIcon = getIcon('Filter');
function Home() {
  const [activeTab, setActiveTab] = useState('buy');
  
  const BuildingIcon = getIcon('Building');
  const HomeIcon = getIcon('Home');
  const SearchIcon = getIcon('Search');
  const MapPinIcon = getIcon('MapPin');
  const DollarSignIcon = getIcon('DollarSign');
  const SquareIcon = getIcon('Square');

  const properties = generateSampleProperties(100);
  
    // Generate sample properties
    const properties = generateSampleProperties(100);
    setAllProperties(properties);
    setFilteredProperties(properties);
    { id: 'buy', label: 'Buy', icon: HomeIcon },
    { id: 'rent', label: 'Rent', icon: BuildingIcon },
  // Handle search form submission
  const handleSearch = (formData) => {
    setSearchCriteria(formData);
    const filtered = filterProperties(allProperties, formData);
    setFilteredProperties(filtered);
    
    toast.success(`Found ${filtered.length} properties matching your criteria`, {
      autoClose: 3000
    });
  };
  
  // Clear all filters
  const clearFilters = () => {
    setSearchCriteria(null);
    setFilteredProperties(allProperties);
    toast.info('All filters cleared', {
      autoClose: 2000
    });
  };
  
  ];
  const hasFilters = searchCriteria !== null;
  const totalProperties = filteredProperties.length;
  const totalAllProperties = allProperties.length;
  const heroFeatures = [
  // Render component
    { 
      title: "Extensive Property Database", 
      description: "Browse thousands of verified listings across the country",
      icon: SearchIcon 
    },
    { 
      title: "Advanced Location Search", 
      description: "Find properties in your preferred neighborhoods and areas",
      icon: MapPinIcon 
    },
    { 
      title: "Transparent Pricing", 
      description: "Clear pricing information with no hidden fees",
      icon: DollarSignIcon 
    },
    { 
      title: "Detailed Floor Plans", 
      description: "Explore property layouts before scheduling a visit",
      icon: SquareIcon 
    },
  ];
  
  const handleSearch = (searchData) => {
    console.log('Search Data:', searchData);
    toast.success(`Searching for ${searchData.propertyType} in ${searchData.location}`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10">
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5 dark:opacity-10"></div>
      <MainFeature activeTab={activeTab} onSearch={handleSearch} />
        
        <div className="container mx-auto px-4 relative z-10">
      <div className="mt-16 space-y-6">
        {/* Search Results Info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <h2 className="text-xl md:text-2xl font-semibold">
            {hasFilters
              ? `${totalProperties} Properties Found`
              : `All Properties (${totalAllProperties})`
            }
          </h2>
          
          {hasFilters && (
            <div className="flex items-center mt-3 md:mt-0">
              <div className="flex items-center bg-primary/10 text-primary px-3 py-1.5 rounded-lg mr-3">
                <FilterIcon size={16} className="mr-1.5" />
                <span className="text-sm font-medium">Filters Applied</span>
              </div>
              
              <button
                onClick={clearFilters}
                className="text-sm text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
        
        {totalProperties === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="text-4xl mb-4">🏠</div>
            <h3 className="text-xl font-medium mb-2">No properties found</h3>
            <p className="text-surface-600 dark:text-surface-400 max-w-md">Try adjusting your search criteria to find properties that match your preferences.</p>
          </div>
        )}
        
            <motion.h1 
              className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Find Your Dream Property Effortlessly
          <PropertyGrid properties={filteredProperties} />
            <motion.p 
              className="text-lg md:text-xl text-surface-700 dark:text-surface-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Your trusted platform for buying, selling, and renting properties across the country
            </motion.p>
          
            {/* Tab Navigation */}
            <div className="bg-white dark:bg-surface-800 p-1.5 rounded-lg inline-flex shadow-soft mb-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center space-x-2 px-6 py-2.5 rounded-md font-medium transition-all duration-200 ${
                      activeTab === tab.id 
                        ? 'text-white z-10' 
                        : 'text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white'
                    }`}
                  >
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTabBg"
                        className="absolute inset-0 bg-primary rounded-md"
                        initial={false}
                        transition={{ type: 'spring', duration: 0.5 }}
                      />
                    )}
                    <Icon className="relative z-10" size={18} />
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        
          <MainFeature activeTab={activeTab} onSearch={handleSearch} />
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-16">
            {heroFeatures.map((feature, index) => {
              const FeatureIcon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="card p-6 flex flex-col items-center text-center group hover:border-primary transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-14 h-14 rounded-full flex items-center justify-center bg-primary/10 dark:bg-primary/20 text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <FeatureIcon size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-surface-600 dark:text-surface-400 text-sm">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section className="py-12 md:py-16 bg-surface-50 dark:bg-surface-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <motion.h2 
              className="text-2xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Featured Properties
            </motion.h2>
            <motion.p 
              className="text-surface-600 dark:text-surface-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Explore our curated selection of premium properties across various locations
            </motion.p>
          </div>
          
          {/* Property Grid with Pagination */}
          <PropertyGrid properties={properties} />
        </div>
      </section>
    </div>
  );
}
export default Home;