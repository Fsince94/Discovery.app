
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SubViewLayout from '../layout/SubViewLayout';
import { LoadingSpinner } from '../icons/LoadingSpinner';
import { type BreadcrumbItem } from '../../types';
import { ProfileBrainIcon } from '../icons/ProfileBrainIcon';

interface ConsultingViewProps {
  onBack: () => void;
}

const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const ConsultingView: React.FC<ConsultingViewProps> = ({ onBack }) => {
  const [isLoading, setIsLoading] = useState(true);

  // 💡 Simula la carga de datos. En una app real, aquí iría una llamada a API.
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800); // Simula 1.8s de carga
    return () => clearTimeout(timer); // Limpieza al desmontar
  }, []);

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Discovery', onClick: onBack, icon: ProfileBrainIcon },
    { label: 'Consultoría' },
  ];

  return (
    <SubViewLayout breadcrumbs={breadcrumbs}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div key="loader" variants={contentVariants} initial="hidden" animate="visible" exit="exit">
            <LoadingSpinner />
          </motion.div>
        ) : (
          <motion.div key="content" variants={contentVariants} initial="hidden" animate="visible" exit="exit">
            <h1 className="text-4xl font-bold mb-4">Consultoría</h1>
            <p className="text-lg">
              Un espacio dedicado para agendar y gestionar sesiones de consultoría.
              La integración con calendarios está en camino.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </SubViewLayout>
  );
};

export default ConsultingView;
