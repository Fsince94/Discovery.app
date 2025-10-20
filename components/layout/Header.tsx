
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRightIcon } from '../icons/ChevronRightIcon';

interface HeaderProps {
  parent: {
    label: string;
    icon: React.FC<{ className?: string }>;
    onBack: () => void;
  };
  currentTitle: string;
}

/**
 * 🧩 Componente de Cabecera con Breadcrumbs basados en íconos.
 * 💡 SOLID Insight: Se actualiza para renderizar un ícono en lugar de texto para
 * la navegación padre, haciendo la UI más compacta. La responsabilidad (SRP)
 * de renderizar la cabecera se mantiene.
 */
const Header: React.FC<HeaderProps> = ({ parent, currentTitle }) => {
  const ParentIcon = parent.icon;

  return (
    <motion.header 
      className="w-full h-20 flex-shrink-0 pt-8 px-4 sm:px-8 flex items-center"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: '5rem' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="flex items-center gap-2 text-white"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        role="navigation"
        aria-label="Breadcrumb"
      >
        {/* 💡 El ícono padre actúa como un botón para volver. */}
        <motion.button
          onClick={parent.onBack}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label={`Volver a ${parent.label}`}
          whileTap={{ scale: 0.95 }}
        >
          <ParentIcon className="w-6 h-6 text-white/90" />
        </motion.button>

        <ChevronRightIcon className="w-5 h-5 opacity-50 select-none" aria-hidden="true" />

        {/* 💡 El título actual se muestra con mayor énfasis y no es interactivo. */}
        <h1 className="text-2xl font-bold capitalize" aria-current="page">{currentTitle}</h1>
      </motion.div>
    </motion.header>
  );
};

export default Header;
