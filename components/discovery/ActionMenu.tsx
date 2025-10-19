import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { springTransition, tapAnimation } from '../../utils/animations';

// --- Iconos --- //
const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

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

const actionItems = [
  { id: 'chat', label: 'Chat', icon: ChatIcon },
  { id: 'consulting', label: 'Consultoría', icon: ConsultingIcon },
  { id: 'blog', label: 'Blog', icon: BlogIcon },
];

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

interface ActionMenuProps {
    onNavigate: (viewId: string) => void;
    isSearchActive: boolean;
}

/**
 * ⚙️ Componente del Menú de Acciones.
 * 💡 SOLID Insight: Este componente tiene la única responsabilidad (SRP) de gestionar
 * la apertura/cierre del menú de acciones y notificar al padre cuando se selecciona
 * un ítem. Es un componente altamente cohesivo y autónomo.
 */
const ActionMenu: React.FC<ActionMenuProps> = ({ onNavigate, isSearchActive }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleItemClick = (id: string) => {
        setIsMenuOpen(false); // Cierra el menú al navegar
        onNavigate(id);
    };

    return (
        <motion.div 
            className="absolute z-20"
            animate={{ opacity: isSearchActive ? 0 : 1, x: isSearchActive ? -20 : 0 }}
            transition={{ ...springTransition, damping: 30, delay: isSearchActive ? 0 : 0.15 }}
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
                                onClick={() => handleItemClick(item.id)}
                                className="w-10 h-10 text-white hover:text-teal-200 focus:outline-none"
                                whileTap={tapAnimation}
                            >
                                <item.icon className="w-full h-full" />
                            </motion.button>
                            </motion.div>
                        ))}
                    </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

export default ActionMenu;
