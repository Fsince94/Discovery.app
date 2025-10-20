import React from 'react';
import { motion } from 'framer-motion';
import { type NavItem } from '../types';
import { tapAnimation, springTransition } from '../utils/animations';
import { useNavigation } from '../context/NavigationContext';

import { ProfileBrainIcon } from './icons/ProfileBrainIcon';
import { BellIcon } from './icons/BellIcon';
import { TrashIcon } from './icons/TrashIcon';
import { BagIcon } from './icons/BagIcon';
import { SettingsIcon } from './icons/SettingsIcon';

const navItems: NavItem[] = [
  { id: 'notifications', label: 'Notificaciones', icon: BellIcon },
  { id: 'cart', label: 'Carrito', icon: BagIcon },
  { id: 'profile', label: 'Discovery', icon: ProfileBrainIcon },
  { id: 'delete', label: 'Eliminar', icon: TrashIcon },
  { id: 'settings', label: 'Configuración', icon: SettingsIcon },
];

/**
 * Componente de la barra de navegación inferior.
 * 💡 DIP: Ahora depende de la abstracción del `useNavigation` hook, no de props
 * pasadas desde `App.tsx`. Esto lo hace más autónomo y reutilizable.
 */
const BottomNavBar: React.FC = () => {
  // 💡 FIX: Se utiliza `resetTo` en lugar de `navigate` para la navegación principal.
  const { currentView, resetTo } = useNavigation();

  // 💡 UX Tweak: Se definen tamaños para animar el botón activo.
  const baseButtonSizeRem = 3.5; // Equivalente a w-14/h-14 (56px)
  const activeButtonSizeRem = baseButtonSizeRem * 1.2; // 20% más grande -> 4.2rem (67.2px)

  return (
    <footer className="fixed bottom-0 left-0 right-0 w-full flex justify-center p-4 z-50">
      <div className="relative w-full max-w-sm h-16 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl flex items-center justify-around shadow-lg mt-8 transition-colors duration-300">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <div key={item.id} className="flex flex-col items-center justify-center">
              <motion.button
                // 💡 Llama a la función `resetTo` del contexto para reiniciar la pila de navegación.
                onClick={() => resetTo(item.id)}
                aria-label={item.label}
                className="relative flex items-center justify-center rounded-full focus:outline-none z-10"
                whileTap={tapAnimation}
                animate={{
                  y: isActive ? '-1.1rem' : 0,
                  width: `${isActive ? activeButtonSizeRem : baseButtonSizeRem}rem`,
                  height: `${isActive ? activeButtonSizeRem : baseButtonSizeRem}rem`,
                }}
                transition={springTransition}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-background"
                    className="absolute inset-0 bg-gradient-to-br from-teal-300 to-cyan-400 dark:from-gray-800 dark:to-slate-900 bg-fixed rounded-full"
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
                      isActive ? 'text-white' : 'text-gray-400 dark:text-gray-500'
                    }`}
                  />
                </motion.div>
              </motion.button>
              
              {isActive && item.id === 'profile' && (
                <motion.span
                  className="absolute bottom-1 text-xs font-bold text-teal-600 dark:text-teal-300"
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
        <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
      </div>
    </footer>
  );
};

export default BottomNavBar;