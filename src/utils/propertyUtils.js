import { format } from 'date-fns';

/**
 * Generate sample property data
 * @returns {Array} Array of property objects
 */
export function generateSampleProperties(count = 100) {
  const propertyTypes = ['Apartment', 'Flat', 'Villa', 'Builder Floor', 'Penthouse', 'Bungalow', 'Independent House', 'Row House'];
  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Gurgaon'];
  const neighborhoods = ['Bandra', 'Andheri', 'Powai', 'Malad', 'Indiranagar', 'Koramangala', 'Whitefield', 'Jubilee Hills', 'T Nagar', 'Salt Lake'];
  const features = ['Air Conditioning', 'Swimming Pool', 'Gym', 'Parking', 'Balcony', 'Garden', 'Fireplace', 'Security System', 'Elevator', 'Storage'];
  
  const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];
  const getRandomItems = (array, max) => {
    const count = Math.floor(Math.random() * max) + 1;
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };
  
  // Generate random dates within the last 30 days
  const getRandomDate = () => {
    const now = new Date();
    const daysAgo = Math.floor(Math.random() * 30);
    const date = new Date(now.setDate(now.getDate() - daysAgo));
    return format(date, 'MMM dd, yyyy');
  };
  
  // Generate random price between min and max
  const getRandomPrice = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  
  return Array(count)
    .fill(null)
    .map((_, index) => {
      const id = index + 1;
      const type = getRandomItem(propertyTypes);
      const city = getRandomItem(cities);
      const neighborhood = getRandomItem(neighborhoods);
      const bedrooms = Math.floor(Math.random() * 5) + 1;
      const bathrooms = Math.floor(Math.random() * 3) + 1;
      const squareFeet = Math.floor(Math.random() * 2000) + 500;
      // Indian property prices (in INR)
      const price = type === 'Penthouse' || type === 'Villa' || type === 'Bungalow'
        ? getRandomPrice(15000000, 80000000) 
        : getRandomPrice(3000000, 15000000);
      const pricePerSqFt = Math.floor(price / squareFeet);
      
      // Random image using placeholder service
      const imageId = Math.floor(Math.random() * 100) + 1;
      
      return {
        id,
        title: `${bedrooms} Bedroom ${type} in ${neighborhood}`,
        type,
        price,
        pricePerSqFt,
        address: `${Math.floor(Math.random() * 999) + 1}, ${neighborhood}`,
        city,
        state: getRandomItem(['MH', 'DL', 'KA', 'TL', 'TN', 'WB', 'GJ', 'RJ']), // Indian state codes
        zipCode: `${Math.floor(Math.random() * 90000) + 100000}`, // Indian PIN codes are 6 digits
        beds: bedrooms,
        baths: bathrooms,
        squareFeet,
        yearBuilt: Math.floor(Math.random() * 70) + 1950,
        features: getRandomItems(features, 5),
        description: `Beautiful ${bedrooms} bedroom ${type.toLowerCase()} located in the heart of ${neighborhood}, ${city}. This property features ${bathrooms} bathrooms and approximately ${squareFeet} square feet of living space.`,
        listedDate: getRandomDate(),
        status: Math.random() > 0.2 ? 'For Sale' : 'Under Contract',
        favorite: Math.random() > 0.8,
        image: `https://picsum.photos/seed/${id}/800/600`,
        agent: {
          name: `Agent ${['Sharma', 'Patel', 'Singh', 'Gupta', 'Kumar', 'Verma', 'Nair', 'Iyer'][Math.floor(Math.random() * 8)]}`,
          phone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`, // Indian phone numbers
          email: `agent${Math.floor(Math.random() * 99) + 1}@propspotter.in`,
        }
      };
    });
}

/**
 * Paginate an array of items
 * @param {Array} items The array to paginate
 * @param {Number} currentPage The current page number (1-based)
 * @param {Number} itemsPerPage Number of items per page
 * @returns {Object} Paginated data and metadata
 */
export function paginateItems(items, currentPage, itemsPerPage) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = items.slice(startIndex, endIndex);
  
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  return {
    items: paginatedItems,
    meta: {
      currentPage,
      itemsPerPage,
      totalItems,
      totalPages,
      startIndex: startIndex + 1,
      endIndex: Math.min(endIndex, totalItems)
    }
  };
}

/**
 * Filter properties based on search criteria
 * @param {Array} properties - Array of properties to filter
 * @param {Object} criteria - Search criteria object
 * @returns {Array} Filtered properties
 */
export function filterProperties(properties, criteria) {
  if (!properties || !criteria) return properties;
  
  return properties.filter(property => {
    // Location filter (case insensitive partial match)
    if (criteria.location && criteria.location.trim() !== '') {
      const locationString = `${property.address} ${property.city} ${property.state} ${property.zipCode}`.toLowerCase();
      if (!locationString.includes(criteria.location.toLowerCase())) {
        return false;
      }
    }
    
    // Property type filter
    if (criteria.propertyType && criteria.propertyType !== 'residential') {
      // Map the search form property types to actual property types
      const typeMap = {
        'apartment': ['Apartment', 'Flat', 'Penthouse'],
        'commercial': ['Commercial', 'Office Space', 'Shop', 'Retail'],
        'land': ['Land', 'Plot']
      };
      
      if (typeMap[criteria.propertyType]) {
        if (!typeMap[criteria.propertyType].some(type => property.type.includes(type))) {
          return false;
        }
      }
    }
    
    // Price range filter
    if (criteria.priceRange && Array.isArray(criteria.priceRange) && criteria.priceRange.length === 2) {
      const [minPrice, maxPrice] = criteria.priceRange;
      if (property.price < minPrice || (maxPrice > 0 && property.price > maxPrice)) {
        return false;
      }
    }
    
    // Bedrooms filter
    if (criteria.bedrooms && criteria.bedrooms !== '') {
      if (property.beds < parseInt(criteria.bedrooms)) {
        return false;
      }
    }
    
    // Bathrooms filter
    if (criteria.bathrooms && criteria.bathrooms !== '') {
      if (property.baths < parseInt(criteria.bathrooms)) {
        return false;
      }
    }
    
    // Minimum area filter
    if (criteria.minArea && criteria.minArea !== '') {
      if (property.squareFeet < parseInt(criteria.minArea)) {
        return false;
      }
    }
    
    // Keywords filter (case insensitive search in title and description)
    if (criteria.keywords && criteria.keywords.trim() !== '') {
      const searchString = `${property.title} ${property.description}`.toLowerCase();
      const keywords = criteria.keywords.toLowerCase().split(/\s+/);
      if (!keywords.every(keyword => searchString.includes(keyword))) {
        return false;
      }
    }
    
    // Amenities filter
    if (criteria.amenities && criteria.amenities.length > 0) {
      // Map amenity IDs to property feature names
      const amenityMap = {
        'parking': 'Parking',
        'gym': 'Gym',
        'pool': 'Swimming Pool',
        'security': 'Security System',
        'elevator': 'Elevator',
        'furnished': 'Furnished'
      };
      
      for (const amenityId of criteria.amenities) {
        const featureName = amenityMap[amenityId];
        if (featureName && !property.features.includes(featureName)) {
          return false;
        }
      }
    }
    
    return true;
  });
}