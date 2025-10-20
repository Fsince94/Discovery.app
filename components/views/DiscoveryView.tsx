
import React, { useState } from 'react';
// FIX: Separated the `Variants` type import to resolve type resolution errors.
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';

import ChatView from './ChatView';
import ConsultingView from './ConsultingView';
import BlogView from './BlogView';
import { useNavigation } from '../../context/NavigationContext';

// --- Nuevos componentes desacoplados --- //
import SearchBar from '../discovery/SearchBar';
import Toolbar from '../discovery/Toolbar';
import BackButton from '../BackButton';
import DiscoverySwitch from '../discovery/DiscoverySwitch';

/**
 * 🧩 Componente para la vista "Discovery".
 * 💡 SOLID Insight: Este componente ahora usa el hook `useNavigation` (DIP) para
 * navegar a sus sub-vistas. Su responsabilidad (SRP) sigue siendo orquestar la UI
 * de Discovery, pero la lógica de navegación está ahora centralizada y desacoplada.
 */
const DiscoveryView: React.FC = () => {
  const { currentView, navigate } = useNavigation();
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

  const handleToolbarNavigate = (subViewId: string) => {
    setTimeout(() => {
      navigate(subViewId);
    }, 200);
  };
  
  // --- Manejadores para el estado de búsqueda --- //
  const handleOpenSearch = () => setIsSearching(true);
  const handleCloseSearch = () => setIsSearching(false);
  
  const handleTabChange = (tab: 'discovery' | 'artifacts') => {
    if (tab === 'artifacts' && isSearching) {
      setIsSearching(false);
    }
    setActiveTab(tab);
  };

  const renderSubView = () => {
    switch (currentView) {
      // 💡 Las vistas ya no necesitan el prop `onBack`. SubViewLayout lo gestiona.
      case 'chat':
        return <ChatView key="chat" />;
      case 'consulting':
        return <ConsultingView key="consulting" />;
      case 'blog':
        return <BlogView key="blog" />;
      default:
        return null;
    }
  };

  // 💡 Se determina si se debe mostrar la vista principal o una sub-vista.
  const isSubViewActive = ['chat', 'consulting', 'blog'].includes(currentView);

  return (
    <div className="w-full h-full flex-grow">
      <AnimatePresence mode="wait">
        {!isSubViewActive ? (
          <motion.div
            key="discovery-main"
            className="relative w-full h-full flex-grow flex flex-col"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="w-full max-w-lg mx-auto px-4 sm:px-0">
              <DiscoverySwitch activeTab={activeTab} onTabChange={handleTabChange} />
              
              <AnimatePresence>
                {activeTab === 'discovery' && (
                  <motion.div
                    key="searchbar-container"
                    className="relative w-full flex justify-center"
                    initial={{ opacity: 0, height: 0, marginTop: '0rem' }}
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
                    <Toolbar onNavigate={handleToolbarNavigate} />
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
