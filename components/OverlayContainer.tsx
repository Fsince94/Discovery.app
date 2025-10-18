import React from 'react';
// FIX: Separated the `Variants` type import to resolve type resolution errors.
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { BackIcon } from './icons/BackIcon';

// 🧩 Reusabilidad: Este componente encapsula toda la UI y lógica de un overlay.
// 💡 SOLID Insight: Aplica SRP, ya que su única responsabilidad es presentar contenido
// en un modal animado. También OCP, ya que podemos pasarle cualquier `children` sin
// modificar su estructura interna.

/**
 * Variantes para la animación del contenedor del overlay (fondo y desenfoque).
 */
const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3, delay: 0.2 } },
};

/**
 * Variantes para la animación del panel de contenido (deslizamiento hacia arriba).
 */
const contentVariants: Variants = {
  hidden: { y: '100%' },
  visible: { y: '0%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
  exit: { y: '100%', transition: { duration: 0.2 } },
};

interface OverlayContainerProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const OverlayContainer: React.FC<OverlayContainerProps> = ({ title, onClose, children }) => {
  return (
    <motion.div
      className="absolute inset-0 z-20 flex flex-col items-center justify-end bg-black/40 backdrop-blur-sm"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      aria-modal="true"
      role="dialog"
    >
      <motion.div
        className="w-full h-[95%] bg-gradient-to-br from-teal-50 to-cyan-100 rounded-t-3xl shadow-2xl flex flex-col overflow-hidden"
        variants={contentVariants}
      >
        <header className="flex items-center p-4 border-b border-gray-200 flex-shrink-0">
          <motion.button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Volver a Discovery"
            whileTap={{ scale: 0.9 }}
          >
            <BackIcon className="w-6 h-6 text-gray-600" />
          </motion.button>
          <h2 className="text-xl font-bold text-gray-800 ml-4">{title}</h2>
        </header>
        <main className="flex-grow p-6 overflow-y-auto text-gray-700">
            {children}
        </main>
      </motion.div>
    </motion.div>
  );
};

export default OverlayContainer;