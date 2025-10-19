import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { springTransition, tapAnimation } from '../../utils/animations';

// --- Iconos --- //
const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);
  
interface SearchBarProps {
    isSearching: boolean;
    onOpen: () => void;
}

/**
 * ⚙️ Componente de Barra de Búsqueda (Controlado).
 * 💡 SOLID Insight: Este componente ya no gestiona su propio estado de apertura.
 * Recibe el estado (`isSearching`) y las funciones para cambiarlo (`onOpen`, `onClose`)
 * desde su padre. Esto lo hace más predecible y reutilizable.
 */
const SearchBar: React.FC<SearchBarProps> = ({ isSearching, onOpen }) => {
    // 💡 Estado local para controlar la visibilidad del icono de búsqueda *interno*.
    // Esto permite que el icono desaparezca después de la animación principal para una UI más limpia.
    const [showInternalIcon, setShowInternalIcon] = useState(true);

    useEffect(() => {
        if (isSearching) {
            // Aseguramos que el icono sea visible al inicio de la animación de búsqueda.
            setShowInternalIcon(true);
            
            // Programamos la desaparición del icono para *después* de que la barra se haya expandido.
            const timer = setTimeout(() => {
                setShowInternalIcon(false);
            }, 600); // Retraso ajustado para que coincida con la animación de expansión.

            // Limpieza del temporizador si el componente se desmonta o el estado cambia.
            return () => clearTimeout(timer);
        } else {
            // Reseteamos el estado del icono cuando la búsqueda se cierra.
            setShowInternalIcon(true);
        }
    }, [isSearching]);

    return (
        <motion.div 
            layout
            transition={springTransition}
            // 💡 Se ajusta el `padding-left` a pl-20 cuando la búsqueda está activa
            // para dejar espacio al nuevo botón de "Volver" externo.
            className={`absolute top-0 h-16 bg-white/20 backdrop-blur-lg rounded-full flex items-center shadow-md ${isSearching ? 'left-0 w-full pl-20 pr-4' : 'left-0 w-80 pr-4 pl-4 justify-end'}`}
        >
            <AnimatePresence mode="wait">
                {isSearching ? (
                     <motion.div 
                        key="searching-ui"
                        className="w-full flex items-center gap-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: 0.2 }}}
                        exit={{ opacity: 0, transition: { duration: 0.1 } }}
                    >
                        <AnimatePresence>
                            {showInternalIcon && (
                                <motion.div
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: '2rem', transition: { delay: 0.2 } }}
                                    exit={{ opacity: 0, width: 0, transition: { duration: 0.3 } }}
                                    className="flex-shrink-0"
                                >
                                    <SearchIcon className="w-8 h-8 text-white" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                        
                        <input
                            type="text"
                            placeholder="Busca lo que necesites..."
                            className="flex-grow bg-transparent text-white placeholder-white/70 focus:outline-none text-lg"
                            autoFocus
                        />
                    </motion.div>
                ) : (
                     <motion.button 
                        key="search-button"
                        aria-label="Buscar" 
                        className="w-10 h-10 text-white hover:text-teal-200" 
                        whileTap={tapAnimation}
                        onClick={onOpen}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.1 } }}
                    >
                      <SearchIcon className="w-full h-full" />
                    </motion.button>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default SearchBar;