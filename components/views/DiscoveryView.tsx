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
import { DiscoveryIllustration } from '../illustrations/DiscoveryIllustration';
import { tapAnimation } from '../../utils/animations';

/**
 * 🧩 Componente para la vista "Discovery".
 * 💡 SOLID Insight: Este componente ahora usa el hook `useNavigation` (DIP) para
 * navegar a sus sub-vistas. Su responsabilidad (SRP) sigue siendo orquestar la UI
 * de Discovery, pero la lógica de navegación está ahora centralizada y desacoplada.
 */
const DiscoveryView: React.FC = () => {
  const { currentView, navigate, viewTitle } = useNavigation();
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState<'discovery' | 'artifacts'>('discovery');
  // 💡 Nuevo estado para controlar la dirección de la animación de las pestañas.
  const [direction, setDirection] = useState(0);

  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2, duration: 0.3 }
    },
    exit: { opacity: 0, scale: 0.98, transition: { duration: 0.2 } }
  };
  
  /**
   * ⚙️ Variantes para la animación de deslizamiento horizontal entre pestañas.
   *    La dirección del deslizamiento se controla con el parámetro `direction`.
   *    💡 Se ha ajustado la animación a un tipo 'tween' para un deslizamiento más suave
   *       y se ha aumentado la distancia para que el contenido salga de la pantalla.
   */
  const tabSlideVariants: Variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "tween", ease: "circOut", duration: 0.5 },
        opacity: { duration: 0.3 }
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      transition: {
        x: { type: "tween", ease: "circIn", duration: 0.3 },
        opacity: { duration: 0.2 }
      }
    }),
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
    if (tab === activeTab) return; // Evitar re-render si la pestaña no cambia

    // 💡 Determinar la dirección del movimiento para la animación.
    setDirection(tab === 'artifacts' ? 1 : -1);

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
            className="relative w-full h-full flex-grow flex flex-col pt-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* 💡 Cabecera para el título. El botón del carrito se ha movido a WalletView. */}
            <header className="w-full max-w-lg mx-auto px-4 sm:px-0 mb-4 flex items-center justify-between">
              <h1 className="text-3xl font-bold text-white">
                {viewTitle}
              </h1>
            </header>
            
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
            
            {/* 💡 Se añade `overflow-hidden` para contener la animación de deslizamiento. */}
            <main className="w-full flex-grow flex flex-col items-center justify-center relative mt-4 overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                {activeTab === 'discovery' ? (
                  <motion.div
                    key="discovery-content"
                    className="flex flex-col items-center text-center"
                    custom={direction}
                    variants={tabSlideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    {/* 💡 UX Mejora: Se reemplaza el texto por una ilustración animada. */}
                    <DiscoveryIllustration />
                    <h2 className="text-2xl font-semibold text-white mt-4">Todo empieza aquí</h2>
                    <p className="text-white/80 mt-2 max-w-md">
                      Usa la barra de búsqueda para encontrar lo que necesitas o crea algo nuevo desde la pestaña de artefactos.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="artifacts-content"
                    className="flex flex-col items-center text-center"
                    custom={direction}
                    variants={tabSlideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    {/* 💡 UX Mejora: Se añade una animación de pulso para guiar al usuario. */}
                    <motion.div
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="rounded-full"
                    >
                      <Toolbar onNavigate={handleToolbarNavigate} />
                    </motion.div>
                    {/* 💡 UX Mejora: Mensaje de estado vacío más claro y directo. */}
                    <p className="text-white/80 mt-8 max-w-md">
                      ¡Aún no has creado nada! <br /> Pulsa 'Crear Artefacto' para empezar.
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