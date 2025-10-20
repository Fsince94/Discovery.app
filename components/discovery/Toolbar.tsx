
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { springTransition, tapAnimation } from '../../utils/animations';
import { PlusIcon } from '../icons/PlusIcon';

// --- Iconos para acciones secundarias --- //
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

// ⚙️ Se separa la acción principal de las secundarias para una lógica más clara.
const primaryAction = { id: 'create', label: 'Crear Artefacto', icon: PlusIcon };
const secondaryActions = [
  { id: 'chat', label: 'Chat', icon: ChatIcon },
  { id: 'consulting', label: 'Consultoría', icon: ConsultingIcon },
  { id: 'blog', label: 'Blog', icon: BlogIcon },
];

const secondaryActionsContainerVariants: Variants = {
    hidden: { opacity: 0, width: 0 },
    visible: { opacity: 1, width: 'auto', transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
    exit: { opacity: 0, width: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } }
};
  
const actionItemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.5 }
};

interface ToolbarProps {
    onNavigate: (viewId: string) => void;
}

/**
 * ⚙️ Componente Toolbar: Una barra de herramientas expansible.
 * 💡 SOLID Insight: Este componente sigue el SRP. Su única responsabilidad es gestionar
 * su estado (expandido/contraído) y la presentación de las acciones.
 * Notifica al padre sobre la selección de una acción sin conocer su lógica.
 */
const Toolbar: React.FC<ToolbarProps> = ({ onNavigate }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const handleSecondaryActionClick = (id: string) => {
        setIsExpanded(false); // Cierra la barra al navegar
        onNavigate(id);
    };

    return (
        <motion.div 
            // 💡 Se utiliza `layout` para que Framer Motion anime automáticamente
            // el cambio de tamaño cuando se expande/contrae.
            layout 
            transition={springTransition}
            className="h-14 bg-white/20 dark:bg-black/20 backdrop-blur-lg rounded-full flex items-center p-2 gap-2 shadow-md transition-colors duration-300"
        >
            <motion.button 
                aria-label={primaryAction.label}
                className="flex items-center gap-2 px-4 py-2 text-white font-semibold focus:outline-none"
                whileTap={tapAnimation}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <motion.div animate={{ rotate: isExpanded ? 45 : 0 }}>
                    <primaryAction.icon className="w-6 h-6" />
                </motion.div>
                <span>{primaryAction.label}</span>
            </motion.button>
            
            <AnimatePresence>
                {isExpanded && (
                <>
                    {/* Separador visual */}
                    <motion.div 
                      className="w-px h-6 bg-white/30"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                    <motion.div 
                        className="flex items-center gap-2"
                        variants={secondaryActionsContainerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {secondaryActions.map(item => (
                            <motion.div 
                                key={item.id} 
                                className="relative flex flex-col items-center" 
                                variants={actionItemVariants}
                                onHoverStart={() => setHoveredId(item.id)}
                                onHoverEnd={() => setHoveredId(null)}
                            >
                                <motion.button
                                    aria-label={item.label}
                                    onClick={() => handleSecondaryActionClick(item.id)}
                                    className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/10 rounded-full focus:outline-none"
                                    whileTap={tapAnimation}
                                >
                                    <item.icon className="w-6 h-6" />
                                </motion.button>
                                {/* Tooltip animado */}
                                <AnimatePresence>
                                    {hoveredId === item.id && (
                                        <motion.div
                                            className="absolute -top-8 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded-md whitespace-nowrap"
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 5 }}
                                        >
                                            {item.label}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </motion.div>
                </>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Toolbar;
