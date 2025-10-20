
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SubViewLayout from '../layout/SubViewLayout';
import { SkeletonLoader } from '../ui/SkeletonLoader'; // 💡 Importar el nuevo componente

const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

/**
 * 🧩 Vista de Blog.
 * 💡 SOLID Insight: Este componente ahora sigue el SRP de forma más estricta.
 * Su única responsabilidad es mostrar el contenido del blog (o su estado de carga).
 * Toda la lógica de layout y navegación ha sido abstraída por `SubViewLayout` y
 * el `NavigationContext`.
 */
const BlogView: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // 🗑️ La definición manual de breadcrumbs ha sido eliminada.
  //    `SubViewLayout` ahora los genera automáticamente desde el contexto.

  return (
    // 💡 `SubViewLayout` ya no necesita el prop `breadcrumbs`.
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
            <SkeletonLoader className="w-full h-6" />
            <SkeletonLoader className="w-5/6 h-6" />
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
