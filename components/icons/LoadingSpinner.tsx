import React from 'react';
import { motion } from 'framer-motion';

/**
 * ⚙️ Componente de spinner de carga reutilizable.
 * 💡 SOLID Insight: Este componente sigue el SRP (Single Responsibility Principle)
 * al encargarse únicamente de mostrar una indicación visual de carga.
 * Es altamente cohesivo y reutilizable en toda la aplicación.
 */
export const LoadingSpinner: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className="flex justify-center items-center">
      <motion.div
        className={`w-12 h-12 border-4 border-white dark:border-gray-300 border-t-teal-500 dark:border-t-cyan-500 rounded-full ${className}`}
        animate={{ rotate: 360 }}
        transition={{
          // FIX: Corrected property 'loop' to 'repeat' for infinite animation as per Framer Motion API.
          repeat: Infinity,
          ease: "linear",
          duration: 1,
        }}
        aria-label="Cargando contenido"
        role="status"
      />
    </div>
  );
};