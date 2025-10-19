import React from 'react';
// FIX: Separated the `Variants` type import to resolve type resolution errors.
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { BackIcon } from '../icons/BackIcon';

// 🧩 Reusabilidad: Este layout abstrae la estructura y animación de las sub-vistas.
// 💡 SOLID Insight: Aplica SRP, ya que su única responsabilidad es el layout de una sub-vista.
// Es OCP porque podemos usarlo con cualquier contenido (`children`) sin modificarlo.

const subViewVariants: Variants = {
  hidden: { opacity: 0.5, x: '100%' },
  visible: { 
    opacity: 1, 
    x: '0%', 
    transition: { type: 'spring', stiffness: 260, damping: 30 }
  },
  exit: { 
    opacity: 0.5, 
    x: '100%', 
    transition: { type: 'spring', stiffness: 260, damping: 30 }
  },
};

interface SubViewLayoutProps {
  title: string;
  onBack: () => void;
  children: React.ReactNode;
}

/**
 * Proporciona un contenedor con animación y una cabecera con botón de retroceso
 * para las sub-vistas que dependen de una vista principal.
 */
const SubViewLayout: React.FC<SubViewLayoutProps> = ({ title, onBack, children }) => {
  return (
    <motion.div
      className="absolute inset-0 w-full h-full bg-gradient-to-br from-teal-300 to-cyan-400 flex flex-col z-10"
      variants={subViewVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <header className="flex items-center p-4 flex-shrink-0 text-white">
        <motion.button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-white/20 transition-colors"
          aria-label={`Volver a Discovery`}
          whileTap={{ scale: 0.9 }}
        >
          <BackIcon className="w-6 h-6" />
        </motion.button>
        <h2 className="text-xl font-bold ml-4">{title}</h2>
      </header>
      <main className="flex-grow p-6 overflow-y-auto text-white flex flex-col items-center text-center">
        {children}
      </main>
    </motion.div>
  );
};

export default SubViewLayout;
