import { format } from 'date-fns';

/**
 * Generate sample property data
 * @returns {Array} Array of property objects
 */
export function generateSampleProperties(count = 100) {
  const propertyTypes = ['Apartment', 'House', 'Condo', 'Townhouse', 'Villa', 'Duplex', 'Studio', 'Penthouse'];
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'Austin'];
  const neighborhoods = ['Downtown', 'Midtown', 'Uptown', 'West End', 'East Side', 'South Side', 'North Hills', 'Riverside', 'Lakefront', 'Suburbia'];
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
      const price = type === 'Penthouse' || type === 'Villa' 
        ? getRandomPrice(500000, 2000000) 
        : getRandomPrice(150000, 800000);
      const pricePerSqFt = Math.floor(price / squareFeet);
      
      // Random image using placeholder service
      const imageId = Math.floor(Math.random() * 100) + 1;
      
      return {
        id,
        title: `${bedrooms} Bedroom ${type} in ${neighborhood}`,
        type,
        price,
        pricePerSqFt,
        address: `${Math.floor(Math.random() * 9999) + 1} ${neighborhood} St.`,
        city,
        state: 'NY', // Just for sample data
        zipCode: `${Math.floor(Math.random() * 90000) + 10000}`,
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
          name: `Agent ${Math.floor(Math.random() * 20) + 1}`,
          phone: `(555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
          email: `agent${Math.floor(Math.random() * 99) + 1}@propspotter.com`,
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