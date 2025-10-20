
import React from 'react';
// FIX: Separated the `Variants` type import to resolve type resolution errors.
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { type BreadcrumbItem } from '../../types';
import { ChevronRightIcon } from '../icons/ChevronRightIcon';

// 🧩 Reusabilidad: Este layout abstrae la estructura y animación de las sub-vistas.
// 💡 SOLID Insight: Aplica SRP, ya que su única responsabilidad es el layout de una sub-vista.
// Es OCP porque podemos usarlo con cualquier contenido (`children`) sin modificarlo.

const subViewVariants: Variants = {
  hidden: { opacity: 0.5, x: '100%' },
  visible: { 
    opacity: 1, 
    x: '0%', 
    transition: { type: 'spring', stiffness: 260, damping: 30 }
  },
  exit: { 
    opacity: 0.5, 
    x: '100%', 
    transition: { type: 'spring', stiffness: 260, damping: 30 }
  },
};

interface SubViewLayoutProps {
  breadcrumbs: BreadcrumbItem[];
  children: React.ReactNode;
}

/**
 * Proporciona un contenedor con animación y una cabecera con breadcrumbs dinámicos
 * para las sub-vistas que dependen de una vista principal.
 */
const SubViewLayout: React.FC<SubViewLayoutProps> = ({ breadcrumbs, children }) => {
  return (
    <motion.div
      // Se añade fondo para modo oscuro y transición de color
      className="absolute inset-0 w-full h-full bg-gradient-to-br from-teal-300 to-cyan-400 dark:from-gray-800 dark:to-slate-900 flex flex-col z-10 transition-colors duration-500"
      variants={subViewVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* ⚙️ Cabecera con Breadcrumbs de navegación dinámicos */}
      <header className="flex items-center pt-8 pb-4 px-4 flex-shrink-0 text-white dark:text-gray-100">
        <div className="flex items-center gap-2 flex-wrap" role="navigation" aria-label="Breadcrumb">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            const CrumbIcon = crumb.icon;
            return (
              <React.Fragment key={index}>
                {index > 0 && (
                  <ChevronRightIcon className="w-5 h-5 opacity-50 select-none" aria-hidden="true" />
                )}
                {isLast ? (
                  // El último elemento es el título actual y no es interactivo.
                  <h1 className="text-xl font-bold capitalize" aria-current="page">{crumb.label}</h1>
                ) : (
                  // Los elementos anteriores son botones para retroceder, ahora con íconos.
                  <motion.button
                    onClick={crumb.onClick}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                    aria-label={`Volver a ${crumb.label}`}
                    whileTap={{ scale: 0.95 }}
                  >
                    {CrumbIcon ? (
                      <CrumbIcon className="w-6 h-6 text-white/90" />
                    ) : (
                      <h3 className="text-xl font-medium opacity-80 capitalize">{crumb.label}</h3>
                    )}
                  </motion.button>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </header>
      <main className="flex-grow p-6 overflow-y-auto text-white dark:text-gray-100 flex flex-col items-center text-center">
        {children}
      </main>
    </motion.div>
  );
};

export default SubViewLayout;
