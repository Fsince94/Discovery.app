
import React, { useEffect } from 'react';
// FIX: Separated the `Variants` type import to resolve type resolution errors.
import { motion, useAnimation } from 'framer-motion';
import type { Variants, PanInfo } from 'framer-motion';
import { DoubleChevronRightIcon } from '../icons/DoubleChevronRightIcon';
import { useNavigation } from '../../context/NavigationContext'; // 💡 Importar el hook de navegación

// 🧩 Reusabilidad: Este layout abstrae la estructura y animación de las sub-vistas.
// 💡 SOLID Insight: Aplica SRP. Su responsabilidad es el layout y la cabecera de una
// sub-vista. Ahora, gracias al hook `useNavigation` (DIP), también se encarga de renderizar
// los breadcrumbs, pero la lógica para generarlos está en el contexto, no aquí.

const subViewVariants: Variants = {
  hidden: { opacity: 0.5, x: '100%' },
  visible: { 
    opacity: 1, 
    x: '0%', 
    transition: { type: 'spring', stiffness: 220, damping: 25 }
  },
  exit: { 
    opacity: 0.5, 
    x: '100%', 
    transition: { type: 'spring', stiffness: 220, damping: 25 }
  },
};

interface SubViewLayoutProps {
  children: React.ReactNode;
}

/**
 * Proporciona un contenedor con animación y una cabecera con breadcrumbs dinámicos
 * para las sub-vistas, generados automáticamente desde el contexto de navegación.
 */
const SubViewLayout: React.FC<SubViewLayoutProps> = ({ children }) => {
  const { breadcrumbs, goBack } = useNavigation();
  const controls = useAnimation();

  // ⚙️ Inicia la animación de entrada "visible" cuando el componente se monta.
  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  /**
   * ⚙️ Maneja el final del gesto de arrastre para la navegación hacia atrás.
   * @param info - Objeto con información sobre el gesto (offset, velocidad).
   */
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const dragThreshold = 100; // El usuario debe arrastrar al menos 100px
    const velocityThreshold = 300; // O arrastrar con una velocidad mínima

    // 💡 Si el usuario deslizó hacia la derecha con suficiente distancia o velocidad, navega hacia atrás.
    if (info.offset.x > dragThreshold || info.velocity.x > velocityThreshold) {
      // La animación `exit` es manejada por AnimatePresence en el componente padre.
      goBack();
    } else {
      // 💡 Si no, la vista vuelve a su posición original con una animación de resorte.
      controls.start({ x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } });
    }
  };

  return (
    <motion.div
      className="absolute inset-0 w-full h-full bg-gradient-to-br from-teal-300 to-cyan-400 dark:from-gray-800 dark:to-slate-900 flex flex-col z-10 transition-colors duration-500"
      variants={subViewVariants}
      initial="hidden"
      // 💡 `animate` está vinculado a los controles para permitir el "snap back".
      animate={controls}
      exit="exit"
      // --- Propiedades para Gestos de Deslizamiento ---
      drag="x" // Habilita el arrastre en el eje horizontal.
      dragConstraints={{ left: 0, right: 300 }} // No se puede arrastrar a la izquierda, límite a la derecha.
      dragElastic={{ right: 0.5, left: 0 }} // Resistencia elástica para una sensación más física.
      onDragEnd={handleDragEnd} // Llama a nuestra lógica cuando el gesto termina.
    >
      {/* ⚙️ Cabecera con Breadcrumbs generados automáticamente */}
      <header className="flex items-center pb-4 px-4 flex-shrink-0 text-white dark:text-gray-100">
        <div className="flex items-center gap-2 flex-wrap" role="navigation" aria-label="Breadcrumb">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            const CrumbIcon = crumb.icon;
            return (
              <React.Fragment key={index}>
                {index > 0 && (
                  <DoubleChevronRightIcon className="w-6 h-6 opacity-50 select-none" aria-hidden="true" />
                )}
                {isLast ? (
                  <h1 className="text-xl font-bold capitalize" aria-current="page">{crumb.label}</h1>
                ) : (
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
