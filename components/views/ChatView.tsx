import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SubViewLayout from '../layout/SubViewLayout';
import { LoadingSpinner } from '../icons/LoadingSpinner';

interface ChatViewProps {
  onBack: () => void;
}

const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const ChatView: React.FC<ChatViewProps> = ({ onBack }) => {
  const [isLoading, setIsLoading] = useState(true);

  // 💡 Simula la carga de datos. En una app real, aquí iría una llamada a API.
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500); // Simula 1.5s de carga
    return () => clearTimeout(timer); // Limpieza al desmontar
  }, []);

  return (
    <SubViewLayout title="Chat" onBack={onBack}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div key="loader" variants={contentVariants} initial="hidden" animate="visible" exit="exit">
            <LoadingSpinner />
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
