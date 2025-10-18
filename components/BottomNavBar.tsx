import React from 'react';
import { motion } from 'framer-motion';
import { type NavItem } from '../types';
import { tapAnimation, springTransition } from '../utils/animations';

import { ProfileBrainIcon } from './icons/ProfileBrainIcon';
import { BellIcon } from './icons/BellIcon';
import { TrashIcon } from './icons/TrashIcon';
import { BagIcon } from './icons/BagIcon';
import { SettingsIcon } from './icons/SettingsIcon';

// Se actualiza el orden de los íconos para tener 5 elementos
// con 'Discovery' en el centro.
const navItems: NavItem[] = [
  { id: 'notifications', label: 'Notificaciones', icon: BellIcon },
  { id: 'cart', label: 'Carrito', icon: BagIcon },
  { id: 'profile', label: 'Discovery', icon: ProfileBrainIcon },
  { id: 'delete', label: 'Eliminar', icon: TrashIcon },
  { id: 'settings', label: 'Configuración', icon: SettingsIcon },
];

interface BottomNavBarProps {
  activeView: string;
  onNavigate: (id: string) => void;
}

/**
 * Componente de la barra de navegación inferior.
 * Recibe el estado activo desde su componente padre para controlar la UI.
 * Muestra texto descriptivo solo para el ícono de perfil cuando está activo.
 */
const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeView, onNavigate }) => {
  return (
    <footer className="w-full flex justify-center p-4">
      <div className="relative w-full max-w-sm h-16 bg-white/90 backdrop-blur-sm rounded-3xl flex items-center justify-around shadow-lg mt-8">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <div key={item.id} className="flex flex-col items-center justify-center">
              <motion.button
                onClick={() => onNavigate(item.id)}
                aria-label={item.label}
                className="relative w-14 h-14 flex items-center justify-center rounded-full focus:outline-none z-10"
                whileTap={tapAnimation}
                animate={{ y: isActive ? '-1.2rem' : 0 }} 
                transition={springTransition}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-background"
                    className="absolute inset-0 bg-teal-400 rounded-full"
                    transition={springTransition}
                  />
                )}
                <motion.div
                  className="relative"
                  animate={{ scale: isActive ? 1.6 : 1 }}
                  transition={springTransition}
                >
                  <item.icon
                    className={`w-7 h-7 transition-colors duration-200 ${
                      isActive ? 'text-white' : 'text-gray-400'
                    }`}
                  />
                </motion.div>
              </motion.button>
              
              {/* Muestra el texto "Discovery" solo si el ícono de perfil está activo */}
              {isActive && item.id === 'profile' && (
                <motion.span
                  className="absolute bottom-1 text-xs font-bold text-teal-600"
                  initial={{ opacity: 0, y: '0.3125rem' }} 
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                >
                  {item.label}
                </motion.span>
              )}
            </div>
          );
        })}
        <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-300 rounded-full" />
      </div>
    </footer>
  );
};

export default BottomNavBar;