import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

export default function NotFound() {
  const HomeIcon = getIcon('Home');
  const AlertTriangleIcon = getIcon('AlertTriangle');

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div 
        className="max-w-md w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center mb-6">
          <motion.div 
            className="w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
          >
            <AlertTriangleIcon size={32} />
          </motion.div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-red-500">
          Page Not Found
        </h1>
        
        <p className="text-surface-600 dark:text-surface-400 mb-8 text-lg">
          We couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link to="/" className="inline-flex items-center px-6 py-3 rounded-lg bg-primary hover:bg-primary-dark text-white font-medium transition-colors duration-200">
            <HomeIcon className="mr-2" size={18} />
            Back to Home
          </Link>
        </motion.div>

        <div className="mt-12 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-surface-200 dark:border-surface-700"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-surface-50 dark:bg-surface-900 px-4 text-sm text-surface-500">
              or explore our featured properties
            </span>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-surface-800 p-4 rounded-lg shadow-card border border-surface-200 dark:border-surface-700 hover:border-primary dark:hover:border-primary transition-colors duration-200 cursor-pointer">
            <div className="text-primary font-medium">Buy Properties</div>
          </div>
          <div className="bg-white dark:bg-surface-800 p-4 rounded-lg shadow-card border border-surface-200 dark:border-surface-700 hover:border-primary dark:hover:border-primary transition-colors duration-200 cursor-pointer">
            <div className="text-primary font-medium">Rent Properties</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}