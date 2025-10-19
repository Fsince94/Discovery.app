import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { springTransition, tapAnimation } from '../../utils/animations';

// --- Icono de Búsqueda --- //
const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);

const searchBarVariants: Variants = {
    closed: {
        width: '4rem',
        transition: { ...springTransition, damping: 30 }
    },
    open: {
        // 💡 Responsive Fix: El ancho ahora es 100% para adaptarse a cualquier pantalla.
        width: '100%',
        transition: { ...springTransition, damping: 30 }
    }
};

const searchInputVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    // 💡 El input aparece un poco después de que la barra empieza a expandirse.
    visible: { opacity: 1, x: 0, transition: { delay: 0.25, duration: 0.3 } },
    exit: { opacity: 0 }
};

interface SearchBarProps {
    isSearching: boolean;
    onOpen: () => void;
}

/**
 * ⚙️ Componente de la Barra de Búsqueda.
 * 💡 SOLID Insight: Este componente tiene la única responsabilidad (SRP) de gestionar
 * la UI y las interacciones de la barra de búsqueda.
 */
const SearchBar: React.FC<SearchBarProps> = ({ isSearching, onOpen }) => {
    return (
        <motion.div
            layout
            onClick={!isSearching ? onOpen : undefined}
            variants={searchBarVariants}
            initial="closed"
            animate={isSearching ? 'open' : 'closed'}
            className="absolute right-0 w-16 h-16 bg-white/20 dark:bg-black/20 backdrop-blur-lg rounded-full flex items-center justify-center p-4 shadow-md cursor-pointer transition-colors duration-300"
        >
            <div className="relative w-full h-full flex items-center justify-center">
                {/* 
                  💡 Animación del Icono:
                  Este icono se anima para "correrse a la izquierda" y desvanecerse
                  cuando la búsqueda se activa.
                */}
                <motion.div
                    animate={{
                        opacity: isSearching ? 0 : 1,
                        x: isSearching ? -20 : 0,
                    }}
                    transition={{
                        duration: 0.4,
                        delay: isSearching ? 0.1 : 0,
                    }}
                    whileTap={!isSearching ? tapAnimation : {}}
                    className="absolute" // Se posiciona absoluto para no afectar al input
                >
                    <SearchIcon className="w-8 h-8 text-white" />
                </motion.div>
                
                <AnimatePresence>
                    {isSearching && (
                        <motion.input
                            key="search-input"
                            variants={searchInputVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            type="text"
                            placeholder="Buscar contenido..."
                            // El padding izquierdo (pl-12) deja espacio para el icono que se desvanece
                            className="w-full h-full bg-transparent text-white placeholder-gray-200 dark:placeholder-gray-400 text-lg focus:outline-none pl-12 pr-4"
                            autoFocus
                        />
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default SearchBar;