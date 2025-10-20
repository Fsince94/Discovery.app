
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SubViewLayout from '../layout/SubViewLayout';
import { SkeletonLoader } from '../ui/SkeletonLoader';

const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

/**
 * 🧩 Vista de Chat.
 * 💡 SOLID Insight: El componente se enfoca únicamente en su responsabilidad (SRP):
 * mostrar la interfaz de chat. La navegación y el layout son gestionados por
 * abstracciones superiores (`SubViewLayout`, `NavigationContext`), lo que resulta en
 * un código más limpio y desacoplado (DIP).
 */
const ChatView: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // 🗑️ La construcción manual de breadcrumbs ya no es necesaria.
  
  return (
    // 💡 `SubViewLayout` obtiene los breadcrumbs del contexto automáticamente.
    <SubViewLayout>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div 
            key="loader" 
            variants={contentVariants} 
            initial="hidden" 
            animate="visible" 
            exit="exit"
            className="w-full max-w-md flex flex-col items-start gap-4"
          >
            <SkeletonLoader className="w-3/4 h-10" />
            <SkeletonLoader className="w-full h-6" />
            <SkeletonLoader className="w-5/6 h-6" />
          </motion.div>
        ) : (
          <motion.div key="content" variants={contentVariants} initial="hidden" animate="visible" exit="exit">
            <h1 className="text-4xl font-bold mb-4">Chat</h1>
            <p className="text-lg">
              Este es el espacio para la comunicación directa. Futuras implementaciones
              incluirán chat en tiempo real.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </SubViewLayout>
  );
};

export default ChatView;
