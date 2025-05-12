import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

const PropertyCard = ({ property }) => {
  const HeartIcon = getIcon('Heart');
  const BedIcon = getIcon('Bed');
  const ShowerIcon = getIcon('Shower');
  const SquareIcon = getIcon('Square');

  return (
    <motion.div 
      className="card group hover:shadow-lg transition-all duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Property Image */}
      <div className="relative overflow-hidden h-48 rounded-t-xl">
        <img 
          src={property.image} 
          alt={property.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2 p-1.5 bg-white/80 dark:bg-surface-900/80 rounded-full">
          <HeartIcon 
            size={18} 
            className={`${property.favorite ? 'fill-red-500 text-red-500' : 'text-surface-500 dark:text-surface-400'}`}
          />
        </div>
        <div className="absolute bottom-2 left-2 bg-primary px-2 py-1 rounded text-white text-xs font-medium">
          {property.status}
        </div>
      </div>
      
      {/* Property Details */}
      <div className="p-4">
        <div className="text-xl font-bold text-surface-900 dark:text-white mb-1">
          ₹{property.price.toLocaleString()}
        </div>
        <h3 className="text-base font-medium mb-2 line-clamp-1">{property.title}</h3>
        <p className="text-surface-600 dark:text-surface-400 text-sm mb-3 line-clamp-1">
          {property.address}, {property.city}
        </p>
        
        {/* Property Features */}
        <div className="flex items-center justify-between text-surface-700 dark:text-surface-300 text-sm">
          <div className="flex items-center gap-1"><BedIcon size={16} /> <span>{property.beds}</span></div>
          <div className="flex items-center gap-1"><ShowerIcon size={16} /> <span>{property.baths}</span></div>
          <div className="flex items-center gap-1"><SquareIcon size={16} /> <span>{property.squareFeet.toLocaleString()} sq ft</span></div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;