import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { springTransition } from '../utils/animations';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';

/**
 * ⚙️ Componente conmutador de tema.
 * 💡 SOLID Insight: Este componente sigue el SRP (Single Responsibility Principle),
 * ya que su única función es mostrar la UI para cambiar el tema y ejecutar la lógica
 * obtenida del contexto.
 * 
 * 🚀 Lógica de Clic Estricta:
 * Se ha refactorizado para que cada icono tenga su propio `onClick`. Esto asegura
 * que al hacer clic en el icono del tema ya activo, la llamada a `setTheme` sea
 * idempotente y no cause un cambio de estado no deseado.
 */
const ThemeToggler: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  const Indicator = () => (
    <motion.div
      className="absolute inset-0 w-12 h-12 bg-white dark:bg-black rounded-full z-0"
      layoutId="theme-indicator"
      transition={springTransition}
    />
  );

  return (
    <motion.div
      className="relative w-24 h-40 bg-gray-200 dark:bg-gray-700 rounded-2xl p-3 flex flex-col items-center shadow-lg"
      whileTap={{ scale: 0.95 }}
      aria-label="Selector de tema"
    >
      <div className="w-full h-full flex flex-col items-center justify-around">
        {/* Contenedor para el icono del Sol con su propio onClick */}
        <div
          onClick={() => setTheme('light')}
          className="relative w-12 h-12 flex items-center justify-center cursor-pointer"
          role="button"
          aria-label="Cambiar a tema claro"
        >
          {!isDark && <Indicator />}
          <SunIcon className={`w-8 h-8 z-10 transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-yellow-500'}`} />
        </div>
        
        {/* Contenedor para el icono de la Luna con su propio onClick */}
        <div
          onClick={() => setTheme('dark')}
          className="relative w-12 h-12 flex items-center justify-center cursor-pointer"
          role="button"
          aria-label="Cambiar a tema oscuro"
        >
          {isDark && <Indicator />}
          <MoonIcon className={`w-8 h-8 z-10 transition-colors duration-300 ${isDark ? 'text-blue-400' : 'text-gray-400'}`} />
        </div>
      </div>
    </motion.div>
  );
};

export default ThemeToggler;
