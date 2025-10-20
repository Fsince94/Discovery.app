
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SubViewLayout from '../layout/SubViewLayout';
import { SkeletonLoader } from '../ui/SkeletonLoader';

const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

/**
 * 🧩 Vista de Consultoría.
 * 💡 SOLID Insight: Este componente ahora se adhiere perfectamente al SRP. Su única
 * preocupación es renderizar el contenido de la vista de consultoría. El `NavigationContext`
 * invierte las dependencias (DIP), liberando a este componente de responsabilidades de navegación.
 */
const ConsultingView: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  // 🗑️ No más breadcrumbs manuales. ¡El contexto se encarga de todo!

  return (
    <SubViewLayout>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div 
            key="loader" 
            variants={contentVariants} 
            initial="hidden" 
            animate="visible" 
            exit="exit"
            className="w-full max-w-md flex flex-col items-start gap-4"
          >
            <SkeletonLoader className="w-3/4 h-10" />
            <SkeletonLoader className="w-full h-6" />
            <SkeletonLoader className="w-5/6 h-6" />
          </motion.div>
        ) : (
          <motion.div key="content" variants={contentVariants} initial="hidden" animate="visible" exit="exit">
            <h1 className="text-4xl font-bold mb-4">Consultoría</h1>
            <p className="text-lg">
              Un espacio dedicado para agendar y gestionar sesiones de consultoría.
              La integración con calendarios está en camino.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </SubViewLayout>
  );
};

export default ConsultingView;
