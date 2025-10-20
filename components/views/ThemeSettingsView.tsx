
import React from 'react';
import { motion, type Variants } from 'framer-motion';
import SubViewLayout from '../layout/SubViewLayout';
import ThemeToggler from '../ThemeToggler';

// 💡 Reutilizamos las variantes de animación para mantener consistencia visual.
const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
};


/**
 * 🧩 Vista para la configuración del Tema.
 * 💡 SOLID Insight: Este componente tiene una única responsabilidad (SRP): permitir
 * al usuario cambiar el tema. La navegación y el layout son gestionados por
 * `SubViewLayout` y `NavigationContext`, demostrando una excelente separación de conceptos.
 */
const ThemeSettingsView: React.FC = () => {
  // 🗑️ La definición manual de breadcrumbs y los props de navegación ya no son necesarios.
  
  const PlaceholderCard: React.FC = () => (
    <div className="w-full h-full bg-white/10 dark:bg-gray-700/50 rounded-2xl border-2 border-dashed border-white/20 dark:border-gray-400/50 flex items-center justify-center transition-colors duration-300 p-2">
      <span className="text-white/60 dark:text-gray-500 text-xs text-center">
        Próximamente
      </span>
    </div>
  );

  const gridItems = [
    { id: 'appearance', label: 'Apariencia', component: ThemeToggler },
    { id: 'primary-color', label: 'Color Primario', component: PlaceholderCard },
    { id: 'font', label: 'Tipografía', component: PlaceholderCard },
    { id: 'accent', label: 'Acentos', component: PlaceholderCard },
    { id: 'icons', label: 'Iconos', component: PlaceholderCard },
    { id: 'layout', label: 'Disposición', component: PlaceholderCard },
  ];

  return (
    // 💡 `SubViewLayout` se encarga de todo lo relacionado con la cabecera.
    <SubViewLayout>
      <motion.div 
        className="w-full max-w-md mx-auto grid grid-cols-3 grid-rows-2 gap-4 flex-grow"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
      >
        {gridItems.map((item) => (
          <motion.div key={item.id} variants={itemVariants} className="w-full h-full">
            <div className="w-full h-full flex flex-col items-center">
              <div className="h-10 flex items-center justify-center text-center">
                <h3 className="text-sm font-semibold text-white/90 dark:text-gray-200/90 capitalize">
                  {item.label}
                </h3>
              </div>
              <div className="w-full flex-grow">
                <item.component />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SubViewLayout>
  );
};

export default ThemeSettingsView;
