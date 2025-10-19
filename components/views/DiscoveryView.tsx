import React, { useState } from 'react';
// FIX: Separated the `Variants` type import to resolve type resolution errors.
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { springTransition, tapAnimation } from '../../utils/animations';

import ChatView from './ChatView';
import ConsultingView from './ConsultingView';
import BlogView from './BlogView';


// --- Iconos para el L-Navbar --- //

const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const CompassIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
);

// --- Iconos para el menú de acciones --- //

const ChatIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
);

const ConsultingIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const BlogIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
    </svg>
);

// --- Icono de cierre para la búsqueda --- //
const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);


const actionItems = [
  { id: 'chat', label: 'Chat', icon: ChatIcon },
  { id: 'consulting', label: 'Consultoría', icon: ConsultingIcon },
  { id: 'blog', label: 'Blog', icon: BlogIcon },
];

/**
 * 🧩 Componente para la vista "Discovery".
 * 💡 SOLID Insight: Ahora tiene una única responsabilidad (SRP): gestionar su propio contenido
 * y la navegación hacia sus sub-vistas. Esto lo convierte en un módulo cohesivo y autónomo.
 */
const DiscoveryView: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
  
  const menuContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
    exit: { opacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } }
  };
  
  const menuItemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };
  
  const handleNavigate = (subViewId: string) => {
    setIsMenuOpen(false); // Cierra el menú para que la animación del PlusIcon se active.

    // 💡 Se introduce un pequeño retardo para asegurar que la animación de cierre del menú
    // sea perceptible antes de que la vista principal comience su transición de salida.
    // Esto mejora la retroalimentación visual para el usuario.
    setTimeout(() => {
      setActiveSubView(subViewId);
    }, 200);
  };
  
  const handleBack = () => {
    setActiveSubView(null);
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
                <motion.div 
                    className="absolute z-20"
                    animate={{ opacity: isSearching ? 0 : 1, x: isSearching ? -20 : 0 }}
                    // 💡 Añadimos un delay a la reaparición para una animación más coreografiada.
                    transition={{ ...springTransition, damping: 30, delay: isSearching ? 0 : 0.15 }}
                >
                    <motion.div 
                        layout 
                        transition={springTransition}
                        className="w-16 bg-white/20 backdrop-blur-lg rounded-full flex flex-col items-center p-4 gap-4 shadow-md"
                    >
                        <motion.button 
                            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                            className="w-10 h-10 text-white hover:text-teal-200 flex-shrink-0" 
                            whileTap={tapAnimation}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            animate={{ rotate: isMenuOpen ? 45 : 0 }}
                            transition={springTransition}
                        >
                            <PlusIcon className="w-full h-full" />
                        </motion.button>
                        
                        <AnimatePresence>
                            {isMenuOpen && (
                            <motion.div 
                                className="flex flex-col items-center gap-5"
                                variants={menuContainerVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                            >
                                {actionItems.map(item => (
                                    <motion.div key={item.id} className="relative flex flex-col items-center" variants={menuItemVariants}>
                                    <motion.button
                                        aria-label={item.label}
                                        onClick={() => handleNavigate(item.id)}
                                        className="w-10 h-10 text-white hover:text-teal-200 focus:outline-none"
                                        whileTap={tapAnimation}
                                    >
                                        <item.icon className="w-full h-full" />
                                    </motion.button>
                                    </motion.div>
                                )
                                )}
                            </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
                <motion.div 
                    layout
                    transition={springTransition}
                    className={`absolute top-0 h-16 bg-white/20 backdrop-blur-lg rounded-full flex items-center shadow-md ${isSearching ? 'left-0 w-full p-4' : 'left-0 w-80 p-4 justify-end'}`}
                >
                    <AnimatePresence mode="wait">
                        {isSearching ? (
                             <motion.div 
                                key="searching-ui"
                                className="w-full flex items-center gap-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: { delay: 0.1 }}}
                                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                            >
                                <SearchIcon className="w-8 h-8 text-white flex-shrink-0" />
                                <input
                                    type="text"
                                    placeholder="Busca lo que necesites..."
                                    className="w-full bg-transparent text-white placeholder-white/70 focus:outline-none text-lg"
                                    autoFocus
                                />
                                <motion.button
                                  aria-label="Cerrar búsqueda"
                                  onClick={() => setIsSearching(false)}
                                  className="w-8 h-8 text-white flex-shrink-0"
                                  whileTap={tapAnimation}
                                >
                                    <CloseIcon className="w-full h-full" />
                                </motion.button>
                            </motion.div>
                        ) : (
                             <motion.button 
                                key="search-button"
                                aria-label="Buscar" 
                                className="w-10 h-10 text-white hover:text-teal-200" 
                                whileTap={tapAnimation}
                                onClick={() => setIsSearching(true)}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                            >
                              <SearchIcon className="w-full h-full" />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </motion.div>
              </div>
            </motion.nav>
            <motion.div 
              className="text-white text-center"
              animate={{ opacity: isSearching ? 0 : 1, y: isSearching ? 20 : 0 }}
              // 💡 Añadimos un delay a la reaparición para una animación más coreografiada.
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