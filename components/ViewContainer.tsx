import React from 'react';
// FIX: Separated the `Variants` type import to resolve type resolution errors.
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const viewVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.3, staggerChildren: 0.1 }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    transition: { duration: 0.2 } 
  },
};

const itemVariants: Variants = {
    hidden: { y: '1.25rem', opacity: 0 },
    visible: { y: 0, opacity: 1 }
};

interface ViewContainerProps {
  children: React.ReactNode;
}

/**
 * Un contenedor reutilizable que proporciona un layout y animación consistentes
 * para las vistas principales de la aplicación.
 */
const ViewContainer: React.FC<ViewContainerProps> = ({ children }) => {
  return (
    <motion.div
      className="w-full h-full flex-grow flex flex-col items-center justify-center text-center p-4 text-white"
      variants={viewVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={itemVariants} className="w-full flex flex-col items-center">
            {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ViewContainer;