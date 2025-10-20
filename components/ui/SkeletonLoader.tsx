

import React from 'react';
import { motion } from 'framer-motion';

// ⚙️ Componente SkeletonLoader.
// 💡 SOLID Insight: Este componente sigue el SRP (Single Responsibility Principle),
//    su única responsabilidad es mostrar un placeholder de carga visualmente atractivo.
//    Es reutilizable en cualquier parte de la app que necesite simular la carga de contenido.

interface SkeletonLoaderProps {
  className?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ className }) => {
  return (
    <motion.div
      className={`bg-white/20 dark:bg-gray-700/50 rounded-md ${className}`}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{
        // 💡 UX Tweak: Se aumenta la duración para un pulso más lento y calmado.
        //    Esto hace que la animación de carga sea menos frenética y más natural.
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      aria-busy="true"
      aria-live="polite"
    />
  );
};
