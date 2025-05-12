import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

const MainFeature = ({ activeTab, onSearch }) => {
  // Icons declaration
  const SearchIcon = getIcon('Search');
  const HomeIcon = getIcon('Home');
  const BuildingIcon = getIcon('Building');
  const BuildingOfficeIcon = getIcon('Building2');
  const LandplotIcon = getIcon('TreePine');
  const BedDoubleIcon = getIcon('BedDouble');
  const BathIcon = getIcon('Shower');
  const SquareFeetIcon = getIcon('Square');
  const ArrowRightIcon = getIcon('ArrowRight');
  const CheckIcon = getIcon('Check');
  const XIcon = getIcon('X');
  const FilterIcon = getIcon('Filter');
  const MapPinIcon = getIcon('MapPin');
  
  // Form state
  const [formData, setFormData] = useState({
    location: '',
    propertyType: 'residential',
    priceRange: [0, 10000000],
    bedrooms: '',
    bathrooms: '',
    minArea: '',
    keywords: '',
    amenities: [],
  });
  
  // UI state
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const [selectedPropertyType, setSelectedPropertyType] = useState('residential');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [priceRangeText, setPriceRangeText] = useState({
    min: '₹0',
    max: '₹1Cr+'
  });
  
  // Amenities list
  const allAmenities = [
    { id: 'parking', label: 'Parking' },
    { id: 'gym', label: 'Gym' },
    { id: 'pool', label: 'Swimming Pool' },
    { id: 'security', label: 'Security' },
    { id: 'elevator', label: 'Elevator' },
    { id: 'furnished', label: 'Furnished' },
  ];
  
  // Dummy location suggestions
  const locationSuggestions = [
    'Mumbai, Maharashtra',
    'Delhi, NCR',
    'Bangalore, Karnataka',
    'Hyderabad, Telangana',
    'Chennai, Tamil Nadu',
    'Kolkata, West Bengal',
    'Pune, Maharashtra',
    'Ahmedabad, Gujarat',
    'Jaipur, Rajasthan',
    'Surat, Gujarat',
  ];
  
  const propertyTypes = [
    { id: 'residential', label: 'Residential', icon: HomeIcon },
    { id: 'apartment', label: 'Apartment', icon: BuildingIcon },
    { id: 'commercial', label: 'Commercial', icon: BuildingOfficeIcon },
    { id: 'land', label: 'Land', icon: LandplotIcon },
  ];
  
  // Effect to reset form when tab changes
  useEffect(() => {
    setFormData({
      ...formData,
      propertyType: 'residential',
    });
    setSelectedPropertyType('residential');
    setIsAdvancedSearch(false);
  }, [activeTab]);
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
    
    if (name === 'location') {
      // Filter location suggestions based on input
      const filtered = locationSuggestions.filter(loc => 
        loc.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0 && value.length > 0);
    }
    
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Handle property type selection
  const handlePropertyTypeSelect = (type) => {
    setSelectedPropertyType(type);
    setFormData({
      ...formData,
      propertyType: type
    });
  };
  
  // Handle location suggestion selection
  const handleSuggestionSelect = (suggestion) => {
    setFormData({
      ...formData,
      location: suggestion
    });
    setShowSuggestions(false);
    
    // Clear location error if it exists
    if (formErrors.location) {
      setFormErrors({
        ...formErrors,
        location: null
      });
    }
  };
  
  // Toggle amenity selection
  const toggleAmenity = (amenityId) => {
    const currentAmenities = [...formData.amenities];
    
    if (currentAmenities.includes(amenityId)) {
      // Remove amenity if already selected
      const newAmenities = currentAmenities.filter(id => id !== amenityId);
      setFormData({
        ...formData,
        amenities: newAmenities
      });
    } else {
      // Add amenity if not selected
      setFormData({
        ...formData,
        amenities: [...currentAmenities, amenityId]
      });
    }
  };
  
  // Validate form before submission
  const validateForm = () => {
    const errors = {};
    
    if (!formData.location.trim()) {
      errors.location = "Location is required";
    }
    
    return errors;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      
      // Show toast for the first error
      const firstError = Object.values(errors)[0];
      toast.error(firstError, {
        position: "bottom-right",
        autoClose: 3000,
      });
      
      return;
    }
    
    // Call the search function with the form data
    onSearch({
      ...formData,
      purpose: activeTab // 'buy' or 'rent'
    });
    
    // Reset advanced search
    setIsAdvancedSearch(false);
  };
  
  // Format price for display
  const formatPrice = (price) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)}Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)}L`;
    } else if (price >= 1000) {
      return `₹${(price / 1000).toFixed(1)}K`;
    } else {
      return `₹${price}`;
    }
  };
  
  // Handle price range input
  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    
    const newPriceRange = [...formData.priceRange];
    if (name === 'minPrice') {
      newPriceRange[0] = parseInt(value);
      setPriceRangeText({
        ...priceRangeText,
        min: formatPrice(parseInt(value))
      });
    } else {
      newPriceRange[1] = parseInt(value);
      setPriceRangeText({
        ...priceRangeText,
        max: formatPrice(parseInt(value))
      });
    }
    
    setFormData({
      ...formData,
      priceRange: newPriceRange
    });
  };
  
  return (
    <motion.div 
      className="w-full max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="card neu-light dark:neu-dark p-6 md:p-8">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Basic Search Section */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
              {/* Location Input with Suggestions */}
              <div className="relative md:col-span-5">
                <label htmlFor="location" className="form-label">Location</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-surface-500">
                    <MapPinIcon size={18} />
                  </div>
                  <input 
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="City, neighborhood, or address"
                    className={`form-input pl-10 ${formErrors.location ? 'border-red-500 focus:ring-red-500' : ''}`}
                    autoComplete="off"
                    onFocus={() => {
                      if (formData.location && suggestions.length > 0) {
                        setShowSuggestions(true);
                      }
                    }}
                    onBlur={() => {
                      // Delay hiding suggestions to allow clicking on them
                      setTimeout(() => setShowSuggestions(false), 200);
                    }}
                  />
                  {formErrors.location && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.location}</p>
                  )}
                  
                  {/* Location Suggestions */}
                  <AnimatePresence>
                    {showSuggestions && (
                      <motion.div 
                        className="absolute z-10 mt-1 w-full bg-white dark:bg-surface-800 shadow-soft rounded-lg border border-surface-200 dark:border-surface-700 overflow-hidden"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ul className="max-h-60 overflow-y-auto py-1 text-sm">
                          {suggestions.map((suggestion, index) => (
                            <li 
                              key={index}
                              className="px-4 py-2 hover:bg-surface-100 dark:hover:bg-surface-700 cursor-pointer flex items-center"
                              onClick={() => handleSuggestionSelect(suggestion)}
                            >
                              <MapPinIcon size={16} className="mr-2 text-surface-500" />
                              {suggestion}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              
              {/* Property Type Selection */}
              <div className="md:col-span-4">
                <label className="form-label">Property Type</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {propertyTypes.map((type) => {
                    const TypeIcon = type.icon;
                    const isSelected = selectedPropertyType === type.id;
                    
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => handlePropertyTypeSelect(type.id)}
                        className={`flex flex-col items-center justify-center py-2 px-1 h-[70px] rounded-lg text-sm transition-all ${
                            isSelected ? 'bg-primary text-white' 
                            : 'bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600'
                        }`}
                      >
                        <TypeIcon size={18} className="mb-1" />
                        </button>
                    );
                  })}
                </div>
              </div>
              
              {/* Search Button */}
              <div className="md:col-span-3">
                <label className="form-label opacity-0 hidden md:block">Search</label>
                <button 
                  type="submit"
                  className="btn btn-primary w-full h-10 md:h-[42px] flex items-center justify-center"
                >
                  <SearchIcon size={18} className="mr-2" />
                  <span>Search</span>
                </button>
              </div>
            </div>
            
            {/* Advanced Search Toggle */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setIsAdvancedSearch(!isAdvancedSearch)}
                className="flex items-center text-primary text-sm font-medium hover:text-primary-dark transition-colors"
              >
                <FilterIcon size={16} className="mr-1" />
                {isAdvancedSearch ? 'Simple Search' : 'Advanced Search'}
              </button>
            </div>
            
            {/* Advanced Search Options */}
            <AnimatePresence>
              {isAdvancedSearch && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6 overflow-hidden"
                >
                  {/* Price Range */}
                  <div>
                    <label className="form-label">Price Range</label>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-surface-600 dark:text-surface-400">{priceRangeText.min}</span>
                      <span className="text-sm text-surface-600 dark:text-surface-400">{priceRangeText.max}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input
                          type="range"
                          name="minPrice"
                          min="0"
                          max="10000000"
                          step="100000"
                          value={formData.priceRange[0]}
                          onChange={handlePriceRangeChange}
                          className="w-full h-2 bg-surface-200 dark:bg-surface-700 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <div>
                        <input
                          type="range"
                          name="maxPrice"
                          min="0"
                          max="10000000"
                          step="100000"
                          value={formData.priceRange[1]}
                          onChange={handlePriceRangeChange}
                          className="w-full h-2 bg-surface-200 dark:bg-surface-700 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Bedrooms, Bathrooms, Area */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="bedrooms" className="form-label flex items-center">
                        <BedDoubleIcon size={16} className="mr-1" />
                        Bedrooms
                      </label>
                      <select
                        id="bedrooms"
                        name="bedrooms"
                        value={formData.bedrooms}
                        onChange={handleInputChange}
                        className="form-select"
                      >
                        <option value="">Any</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                        <option value="5">5+</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="bathrooms" className="form-label flex items-center">
                        <BathIcon size={16} className="mr-1" />
                        Bathrooms
                      </label>
                      <select
                        id="bathrooms"
                        name="bathrooms"
                        value={formData.bathrooms}
                        onChange={handleInputChange}
                        className="form-select"
                      >
                        <option value="">Any</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="3">3+</option>
                        <option value="4">4+</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="minArea" className="form-label flex items-center">
                        <SquareFeetIcon size={16} className="mr-1" />
                        Min Area (sq.ft)
                      </label>
                      <input
                        type="number"
                        id="minArea"
                        name="minArea"
                        value={formData.minArea}
                        onChange={handleInputChange}
                        placeholder="Minimum area"
                        className="form-input"
                        min="0"
                      />
                    </div>
                  </div>
                  
                  {/* Keywords */}
                  <div>
                    <label htmlFor="keywords" className="form-label">Keywords</label>
                    <input
                      type="text"
                      id="keywords"
                      name="keywords"
                      value={formData.keywords}
                      onChange={handleInputChange}
                      placeholder="e.g. garden, modern, renovated"
                      className="form-input"
                    />
                  </div>
                  
                  {/* Amenities */}
                  <div>
                    <label className="form-label">Amenities</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {allAmenities.map((amenity) => {
                        const isSelected = formData.amenities.includes(amenity.id);
                        
                        return (
                          <div
                            key={amenity.id}
                            onClick={() => toggleAmenity(amenity.id)}
                            className={`flex items-center p-2 rounded-lg cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-primary/10 dark:bg-primary/20 border border-primary/30 text-primary'
                                : 'bg-surface-100 dark:bg-surface-700 border border-transparent text-surface-700 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-600'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded flex items-center justify-center mr-2 ${
                              isSelected
                                ? 'bg-primary text-white'
                                : 'bg-white dark:bg-surface-600 text-surface-400 dark:text-surface-300'
                            }`}>
                              {isSelected ? <CheckIcon size={14} /> : <XIcon size={14} />}
                            </div>
                            <span className="text-sm">{amenity.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Apply Filters Button */}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="btn btn-primary px-6"
                    >
                      <FilterIcon size={16} className="mr-2" />
                      Apply Filters
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </form>
        
        {/* Quick searches */}
        <div className="mt-8 border-t border-surface-200 dark:border-surface-700 pt-6">
          <div className="flex flex-wrap justify-center gap-2">
            <button 
              type="button"
              onClick={() => {
                setFormData({
                  ...formData,
                  location: 'Mumbai, Maharashtra',
                  propertyType: 'apartment',
                  bedrooms: '2'
                });
                toast.info("Quick search applied", { autoClose: 2000 });
              }}
              className="flex items-center space-x-1 px-3 py-1 bg-surface-100 dark:bg-surface-800 rounded-full text-sm text-surface-700 dark:text-surface-300 hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <BuildingIcon size={14} />
              <span>2BHK in Mumbai</span>
              <ArrowRightIcon size={14} />
            </button>
            
            <button 
              type="button"
              onClick={() => {
                setFormData({
                  ...formData,
                  location: 'Bangalore, Karnataka',
                  propertyType: 'residential',
                  amenities: ['parking', 'security']
                });
                toast.info("Quick search applied", { autoClose: 2000 });
              }}
              className="flex items-center space-x-1 px-3 py-1 bg-surface-100 dark:bg-surface-800 rounded-full text-sm text-surface-700 dark:text-surface-300 hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <HomeIcon size={14} />
              <span>Homes in Bangalore</span>
              <ArrowRightIcon size={14} />
            </button>
            
            <button 
              type="button"
              onClick={() => {
                setFormData({
                  ...formData,
                  location: 'Delhi, NCR',
                  propertyType: 'commercial'
                });
                toast.info("Quick search applied", { autoClose: 2000 });
              }}
              className="flex items-center space-x-1 px-3 py-1 bg-surface-100 dark:bg-surface-800 rounded-full text-sm text-surface-700 dark:text-surface-300 hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <BuildingOfficeIcon size={14} />
              <span>Commercial in Delhi</span>
              <ArrowRightIcon size={14} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MainFeature;