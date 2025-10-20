
import React from 'react';
import { motion, type Variants } from 'framer-motion';
import SubViewLayout from '../layout/SubViewLayout';

// 💡 Reutilizamos las variantes de animación para mantener consistencia visual.
const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
};

const profileItems = [
  { id: 'edit-profile', label: 'Editar Perfil' },
  { id: 'account-security', label: 'Seguridad' },
  { id: 'notifications', label: 'Notificaciones' },
  { id: 'privacy', label: 'Privacidad' },
  { id: 'payment-methods', label: 'Pagos' },
  { id: 'history', label: 'Historial' },
];

/**
 * 🧩 Componente de marcador de posición, similar al de SettingsView.
 */
const PlaceholderCard: React.FC = () => (
  <div className="w-full h-full bg-white/10 dark:bg-gray-700/50 rounded-2xl border-2 border-dashed border-white/20 dark:border-gray-400/50 flex items-center justify-center transition-colors duration-300 p-2">
    <span className="text-white/60 dark:text-gray-500 text-xs text-center">
      Próximamente
    </span>
  </div>
);

/**
 * 🧩 Vista para la configuración del Perfil.
 * 💡 SOLID Insight: Sigue el SRP. Su única responsabilidad es mostrar las opciones
 * de perfil. Delega el layout y la navegación al `SubViewLayout`, que ahora
 * obtiene toda la información necesaria del `NavigationContext`.
 */
const ProfileView: React.FC = () => {
  
  // 🗑️ La construcción de breadcrumbs y la recepción de props de navegación
  //    han sido eliminadas para simplificar el componente.

  return (
    // ⚙️ Se utiliza SubViewLayout, que ahora genera los breadcrumbs automáticamente.
    <SubViewLayout>
      <motion.div 
        className="w-full max-w-md mx-auto grid grid-cols-2 grid-rows-3 gap-4 flex-grow"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
      >
        {profileItems.map((item) => (
          <motion.div key={item.id} variants={itemVariants} className="w-full h-full">
            <div className="w-full h-full flex flex-col items-center">
              <div className="h-10 flex items-center justify-center text-center">
                <h3 className="text-sm font-semibold text-white/90 dark:text-gray-200/90 capitalize">
                  {item.label}
                </h3>
              </div>
              <div className="w-full flex-grow">
                <PlaceholderCard />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SubViewLayout>
  );
};

export default ProfileView;
