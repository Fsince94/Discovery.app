
import React, { useState } from 'react';
// FIX: Separated the `Variants` type import to resolve type resolution errors.
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { springTransition } from '../../utils/animations';

import ChatView from './ChatView';
import ConsultingView from './ConsultingView';
import BlogView from './BlogView';

// --- Nuevos componentes desacoplados --- //
import SearchBar from '../discovery/SearchBar';
import ActionMenu from '../discovery/ActionMenu';
import BackButton from '../BackButton';
import DiscoverySwitch from '../discovery/DiscoverySwitch'; // Import the new component

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
  const [activeTab, setActiveTab] = useState<'discovery' | 'artifacts'>('discovery');

  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2, duration: 0.3 }
    },
    exit: { opacity: 0, scale: 0.98, transition: { duration: 0.2 } }
  };
  
  const tabContentVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.2 } }
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
  
  // ⚙️ Al cambiar de pestaña, se cierra la búsqueda si está abierta para una mejor UX.
  const handleTabChange = (tab: 'discovery' | 'artifacts') => {
    if (tab === 'artifacts' && isSearching) {
      setIsSearching(false);
    }
    setActiveTab(tab);
  };

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
            // 💡 Se elimina el título y se sube el contenido añadiendo padding superior.
            className="relative w-full h-full flex-grow flex flex-col pt-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* ⚙️ Contenedor de Controles (Switch y Barra de Búsqueda) */}
            {/* 💡 Se elimina el margen superior para que se posicione más arriba. */}
            <div className="w-full max-w-lg mx-auto px-4 sm:px-0">
              <DiscoverySwitch activeTab={activeTab} onTabChange={handleTabChange} />
              
              <AnimatePresence>
                {activeTab === 'discovery' && (
                  <motion.div
                    key="searchbar-container"
                    // ⚙️ Centrado: Se añade flex y justify-center para centrar la barra.
                    className="relative w-full flex justify-center"
                    initial={{ opacity: 0, height: 0, marginTop: '0rem' }}
                    // ⚙️ Separación mínima: Se reduce el margen superior a 0.5rem.
                    animate={{ opacity: 1, height: '4rem', marginTop: '0.5rem' }}
                    exit={{ opacity: 0, height: 0, marginTop: '0rem' }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="absolute top-0 left-0 h-full flex items-center gap-2 z-30">
                      <AnimatePresence>
                        {isSearching && (
                          <BackButton
                            onClick={handleCloseSearch}
                            ariaLabel="Cerrar búsqueda y volver"
                          />
                        )}
                      </AnimatePresence>
                    </div>
                    
                    <SearchBar
                      isSearching={isSearching}
                      onOpen={handleOpenSearch}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* ⚙️ Contenido de las Pestañas */}
            <main className="w-full flex-grow flex flex-col items-center justify-center relative mt-4">
              <AnimatePresence mode="wait">
                {activeTab === 'discovery' ? (
                  <motion.div
                    key="discovery-content"
                    className="flex flex-col items-center text-center"
                    variants={tabContentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <h2 className="text-2xl font-semibold text-white">Bienvenido a Discovery</h2>
                    <p className="text-white/80 mt-2 max-w-md">
                      Explora el contenido principal, busca lo que necesites y descubre nuevas funcionalidades.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="artifacts-content"
                    className="flex flex-col items-center text-center"
                    variants={tabContentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <ActionMenu onNavigate={handleNavigate} />
                    <p className="text-white/80 mt-8 max-w-md">
                      Gestiona tus artefactos y accede a acciones rápidas como el chat, consultoría o el blog.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </main>

          </motion.div>
        ) : (
          renderSubView()
        )}
      </AnimatePresence>
    </div>
  );
};

export default DiscoveryView;
