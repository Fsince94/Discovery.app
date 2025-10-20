
import React from 'react';
import { motion, type Variants, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import ProfileView from './ProfileView';
import ThemeSettingsView from './ThemeSettingsView';
import PaymentMethodsView from './PaymentMethodsView'; // 💡 Importar la nueva vista
import SubViewLayout from '../layout/SubViewLayout';
import { useNavigation } from '../../context/NavigationContext';
import { PaymentIcon } from '../icons/PaymentIcon'; // 💡 Importar el nuevo icono

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
  visible: { opacity: 1, scale: 1 },
  hover: { scale: 1.05, y: -5 },
  tap: { scale: 0.95 }
};

/**
 * 🧩 Componente para la vista de "Configuración".
 * 💡 SOLID Insight: Este componente ahora usa `useNavigation` (DIP) y actúa como un
 * enrutador para sus propias sub-vistas, manteniendo su responsabilidad (SRP) de
 * gestionar la configuración, pero delegando la navegación al contexto.
 */
const SettingsView: React.FC = () => {
  const { currentView, navigate } = useNavigation();

  const renderSubView = () => {
    switch (currentView) {
      // 💡 Se pasa el `key` para que AnimatePresence detecte el cambio de componente.
      case 'user-profile':
        return <ProfileView key="user-profile" />;
      case 'theme':
        return <ThemeSettingsView key="theme" />;
      // 💡 Añadir el caso para la nueva vista de métodos de pago.
      case 'payment-methods':
        return <PaymentMethodsView key="payment-methods" />;
      default:
        return null;
    }
  };

  const PlaceholderCard = () => (
    <div className="w-full h-full bg-gray-200/50 dark:bg-gray-700/50 rounded-2xl border-2 border-dashed border-gray-400/50 flex items-center justify-center transition-colors duration-300 p-2">
      <span className="text-gray-400 dark:text-gray-500 text-xs text-center">
        Próxima Novedad
      </span>
    </div>
  );
  
  const ThemePreviewCard: React.FC = () => {
    const { theme } = useTheme();
    return (
      <div className="w-full h-full bg-gray-200/50 dark:bg-gray-700/50 rounded-2xl flex items-center justify-center p-2 transition-colors duration-300">
        <span className="text-gray-600 dark:text-gray-300 font-medium capitalize">
          {theme === 'light' ? 'Claro' : 'Oscuro'}
        </span>
      </div>
    );
  };

  /**
   * 🧩 Componente de previsualización para la tarjeta de métodos de pago.
   *    Muestra un icono para dar una pista visual al usuario.
   */
  const PaymentPreviewCard: React.FC = () => (
    <div className="w-full h-full bg-gray-200/50 dark:bg-gray-700/50 rounded-2xl flex items-center justify-center p-2 transition-colors duration-300">
      <PaymentIcon className="w-8 h-8 text-gray-400 dark:text-gray-500" />
    </div>
  );

  // 💡 Se sustituye 'data' por 'payment-methods' y se usa el nuevo componente de previsualización.
  const gridItems = [
    { id: 'theme', label: 'Tema', component: ThemePreviewCard },
    { id: 'user-profile', label: 'Perfil', component: PlaceholderCard },
    { id: 'security', label: 'Seguridad', component: PlaceholderCard },
    { id: 'payment-methods', label: 'Pagos', component: PaymentPreviewCard },
    { id: 'language', label: 'Idioma', component: PlaceholderCard },
    { id: 'help', label: 'Ayuda', component: PlaceholderCard },
    { id: 'about', label: 'Acerca de', component: PlaceholderCard },
    { id: 'privacy', label: 'Privacidad', component: PlaceholderCard },
    { id: 'legal', label: 'Legal', component: PlaceholderCard },
  ];

  const isSubViewActive = ['user-profile', 'theme', 'payment-methods'].includes(currentView);

  return (
    <AnimatePresence mode="wait">
      {!isSubViewActive ? (
        // 💡 Se envuelve la vista principal en SubViewLayout para obtener la cabecera
        // y la animación de forma consistente.
        <SubViewLayout key="settings-main">
          <motion.div
            className="w-full max-w-md mx-auto grid grid-cols-3 grid-rows-3 gap-4 flex-grow"
            variants={viewVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {gridItems.map((item) => {
              // 💡 Se añade 'payment-methods' a los elementos clicables.
              const isClickable = ['user-profile', 'theme', 'payment-methods'].includes(item.id);
              return (
                <motion.div 
                  key={item.id} 
                  variants={itemVariants}
                  whileHover={isClickable ? "hover" : ""}
                  whileTap={isClickable ? "tap" : ""}
                  className="w-full h-full"
                  onClick={isClickable ? () => navigate(item.id) : undefined}
                >
                  <div className={`w-full h-full flex flex-col items-center ${isClickable ? 'cursor-pointer' : ''}`}>
                    <div className="h-12 flex-shrink-0 flex flex-col items-center justify-center text-center">
                      <h3 className="text-sm font-bold text-white/90 dark:text-gray-200/90 capitalize">
                        {item.label}
                      </h3>
                    </div>
                    <div className="w-full flex-grow">
                      <item.component />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </SubViewLayout>
      ) : (
        renderSubView()
      )}
    </AnimatePresence>
  );
};

export default SettingsView;
