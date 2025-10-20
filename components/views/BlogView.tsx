
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SubViewLayout from '../layout/SubViewLayout';
import { LoadingSpinner } from '../icons/LoadingSpinner';
import { type BreadcrumbItem } from '../../types';
import { ProfileBrainIcon } from '../icons/ProfileBrainIcon';

interface BlogViewProps {
  onBack: () => void;
}

const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const BlogView: React.FC<BlogViewProps> = ({ onBack }) => {
  const [isLoading, setIsLoading] = useState(true);

  // 💡 Simula la carga de datos. En una app real, aquí iría una llamada a API.
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200); // Simula 1.2s de carga
    return () => clearTimeout(timer); // Limpieza al desmontar
  }, []);

  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Discovery', onClick: onBack, icon: ProfileBrainIcon },
    { label: 'Blog' },
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
            <h1 className="text-4xl font-bold mb-4">Blog</h1>
            <p className="text-lg">
              Aquí encontrarás artículos, noticias y actualizaciones. Próximamente
              se integrará un CMS para gestionar el contenido.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </SubViewLayout>
  );
};

export default BlogView;
