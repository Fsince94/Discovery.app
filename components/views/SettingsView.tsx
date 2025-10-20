
import React, { useState } from 'react';
import { motion, type Variants, AnimatePresence } from 'framer-motion';
import ThemeToggler from '../ThemeToggler';
import { useTheme } from '../../context/ThemeContext';
import ProfileView from './ProfileView'; // 💡 Importar la nueva sub-vista
import Header from '../layout/Header'; // 💡 Importar el componente de cabecera
import { ProfileBrainIcon } from '../icons/ProfileBrainIcon';

// 💡 Se definen variantes de animación locales para mantener la consistencia
// con el resto de la app, pero permitiendo un layout de altura completa.
const viewVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.3, staggerChildren: 0.05 }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    transition: { duration: 0.2 } 
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
};

interface SettingsViewProps {
  onBackToDiscovery: () => void;
}

/**
 * 🧩 Componente para la vista de "Configuración".
 * 💡 SOLID Insight: Este componente ahora actúa como un "controlador de navegación"
 * para sus sub-vistas (SRP), gestionando qué vista mostrar. Sigue siendo extensible (OCP)
 * para añadir más sub-vistas en el futuro.
 */
const SettingsView: React.FC<SettingsViewProps> = ({ onBackToDiscovery }) => {
  const { theme } = useTheme();
  const [activeSubView, setActiveSubView] = useState<string | null>(null);

  // --- Manejadores para la navegación a sub-vistas --- //
  const handleNavigate = (subViewId: string) => setActiveSubView(subViewId);
  const handleBack = () => setActiveSubView(null);

  const renderSubView = () => {
    switch (activeSubView) {
      case 'profile':
        return (
          <ProfileView 
            key="profile" 
            onBack={handleBack} 
            onBackToDiscovery={onBackToDiscovery} 
          />
        );
      default:
        return null;
    }
  };

  // 🧩 Componente de marcador de posición para celdas vacías de la cuadrícula.
  const PlaceholderCard = () => (
    <div className="w-full h-full bg-gray-200/50 dark:bg-gray-700/50 rounded-2xl border-2 border-dashed border-gray-400/50 flex items-center justify-center transition-colors duration-300 p-2">
      <span className="text-gray-400 dark:text-gray-500 text-xs text-center">
        Próxima Novedad
      </span>
    </div>
  );

  // ⚙️ Estructura de datos para la cuadrícula 3x3. Facilita la gestión de cada celda.
  const gridItems = [
    { id: 'theme', label: 'Tema', component: ThemeToggler },
    { id: 'profile', label: 'Perfil', component: PlaceholderCard },
    { id: 'security', label: 'Seguridad', component: PlaceholderCard },
    { id: 'data', label: 'Datos', component: PlaceholderCard },
    { id: 'language', label: 'Idioma', component: PlaceholderCard },
    { id: 'help', label: 'Ayuda', component: PlaceholderCard },
    { id: 'about', label: 'Acerca de', component: PlaceholderCard },
    { id: 'privacy', label: 'Privacidad', component: PlaceholderCard },
    { id: 'legal', label: 'Legal', component: PlaceholderCard },
  ];


  return (
    // 💡 AnimatePresence gestiona la transición entre la cuadrícula y la sub-vista.
    <AnimatePresence mode="wait">
      {activeSubView === null ? (
        <motion.div
          key="settings-main"
          className="w-full h-full flex flex-col"
          variants={viewVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* 💡 Esta vista ahora gestiona su propia cabecera con un ícono. */}
          <Header
            parent={{
              label: 'Discovery',
              icon: ProfileBrainIcon,
              onBack: onBackToDiscovery,
            }}
            currentTitle="Configuración"
          />

          <div className="w-full max-w-md mx-auto grid grid-cols-3 grid-rows-3 gap-4 flex-grow px-4 pb-4">
            {gridItems.map((item) => (
              <motion.div 
                key={item.id} 
                variants={itemVariants} 
                className="w-full h-full"
                // ⚙️ Se añade el evento onClick solo a la tarjeta de perfil.
                onClick={item.id === 'profile' ? () => handleNavigate('profile') : undefined}
                whileTap={item.id === 'profile' ? { scale: 0.95 } : {}}
              >
                {/* ⚙️ Se añade `cursor-pointer` para dar feedback visual de que es clickeable. */}
                <div className={`w-full h-full flex flex-col items-center ${item.id === 'profile' ? 'cursor-pointer' : ''}`}>
                  <div className="h-12 flex-shrink-0 flex flex-col items-center justify-center text-center">
                    <h3 className="text-sm font-bold text-white/90 dark:text-gray-200/90 capitalize">
                      {item.label}
                    </h3>
                    {item.id === 'theme' && (
                      <p className="text-xs text-white/70 dark:text-gray-400/80">
                        {theme === 'light' ? 'Claro' : 'Oscuro'}
                      </p>
                    )}
                  </div>
                  <div className="w-full flex-grow">
                    <item.component />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        renderSubView()
      )}
    </AnimatePresence>
  );
};

export default SettingsView;
