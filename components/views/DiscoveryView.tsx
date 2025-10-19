import React, { useState } from 'react';
// FIX: Separated the `Variants` type import to resolve type resolution errors.
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { springTransition, tapAnimation } from '../../utils/animations';

import ChatView from './ChatView';
import ConsultingView from './ConsultingView';
import BlogView from './BlogView';

// --- Nuevos componentes desacoplados --- //
import SearchBar from '../discovery/SearchBar';
import ActionMenu from '../discovery/ActionMenu';
import { BackIcon } from '../icons/BackIcon';

/**
 * 🧩 Componente para la vista "Discovery".
 * 💡 SOLID Insight: Tras la refactorización, este componente ahora actúa como un "orquestador".
 * Su responsabilidad principal (SRP) es componer los elementos de la UI (SearchBar, ActionMenu)
 * y gestionar la navegación entre sus sub-vistas. La lógica interna de la búsqueda y el menú
 * de acciones ha sido delegada, resultando en un componente mucho más limpio y mantenible.
 */
const DiscoveryView: React.FC = () => {
  const [activeSubView, setActiveSubView] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2, duration: 0.3 }
    },
    exit: { opacity: 0, scale: 0.98, transition: { duration: 0.2 } }
  };

  const itemVariants: Variants = {
    hidden: { y: '1.25rem', opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { ...springTransition, damping: 25, stiffness: 300 } }
  };

  const handleNavigate = (subViewId: string) => {
    // 💡 Se introduce un pequeño retardo para asegurar que la animación de cierre del menú
    // sea perceptible antes de que la vista principal comience su transición de salida.
    setTimeout(() => {
      setActiveSubView(subViewId);
    }, 200);
  };
  
  const handleBack = () => {
    setActiveSubView(null);
  };

  // --- Manejadores para el estado de búsqueda --- //
  const handleOpenSearch = () => setIsSearching(true);
  const handleCloseSearch = () => setIsSearching(false);

  const renderSubView = () => {
    switch (activeSubView) {
      case 'chat':
        return <ChatView key="chat" onBack={handleBack} />;
      case 'consulting':
        return <ConsultingView key="consulting" onBack={handleBack} />;
      case 'blog':
        return <BlogView key="blog" onBack={handleBack} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex-grow">
      <AnimatePresence mode="wait">
        {activeSubView === null ? (
          <motion.div
            key="discovery-main"
            className="relative w-full h-full flex-grow flex flex-col items-center justify-center p-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.nav 
              className="absolute top-8 left-4 sm:left-8 w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)] max-w-lg"
              variants={itemVariants}
            >
              <div className="relative flex items-start" style={{ height: '18rem' }}>
                <AnimatePresence>
                  {isSearching && (
                    <motion.button
                      key="back-from-search"
                      // 🚀 ¡Implementación Fuerte de "Volver Atrás"! 🚀
                      // Este botón es el único responsable de revertir el estado de búsqueda.
                      // Su `onClick` invoca `handleCloseSearch`, que actualiza el estado en este
                      // componente padre. Es la "única fuente de verdad".
                      onClick={handleCloseSearch}
                      className="absolute z-30 w-16 h-16 flex items-center justify-center rounded-full"
                      aria-label="Cerrar búsqueda y volver"
                      initial={{ opacity: 0, x: -20, scale: 0.8 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -20, scale: 0.8 }}
                      transition={{ ...springTransition, damping: 30 }}
                      whileTap={tapAnimation}
                      // 💡 Se añade `whileHover` para un feedback visual inmediato en desktop,
                      // reforzando la interactividad del botón.
                      whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                    >
                      <BackIcon className="w-8 h-8 text-white" />
                    </motion.button>
                  )}
                </AnimatePresence>

                <ActionMenu onNavigate={handleNavigate} isSearchActive={isSearching} />
                <SearchBar 
                  isSearching={isSearching}
                  onOpen={handleOpenSearch}
                />
              </div>
            </motion.nav>
            <motion.div 
              className="text-white dark:text-gray-100 text-center"
              animate={{ opacity: isSearching ? 0 : 1, y: isSearching ? 20 : 0 }}
              transition={{ ...springTransition, damping: 30, delay: isSearching ? 0 : 0.15 }}
            >
              <h1 className="text-5xl font-bold mb-4">Discovery</h1>
              <p className="text-xl max-w-md">
                Aquí es donde la exploración comienza. Descubre nuevo contenido,
                perfiles interesantes y oportunidades únicas.
              </p>
            </motion.div>
          </motion.div>
        ) : (
          renderSubView()
        )}
      </AnimatePresence>
    </div>
  );
};

export default DiscoveryView;