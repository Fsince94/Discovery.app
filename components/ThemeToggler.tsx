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
      className="absolute inset-0 bg-white dark:bg-black rounded-full z-0"
      layoutId="theme-indicator"
      transition={springTransition}
    />
  );

  return (
    <motion.div
      // 🎨 Se eliminó el tamaño fijo para que sea flexible y se adapte a la cuadrícula.
      className="relative w-full h-full bg-gray-200 dark:bg-gray-700 rounded-2xl p-2 flex flex-col items-center shadow-lg"
      whileTap={{ scale: 0.95 }}
      aria-label="Selector de tema"
    >
      <div className="w-full h-full flex flex-col items-center justify-center">
        {/* Contenedor para el icono del Sol (50% de la altura) */}
        <div
          onClick={() => setTheme('light')}
          className="w-full h-1/2 flex items-center justify-center cursor-pointer"
          role="button"
          aria-label="Cambiar a tema claro"
        >
          {/* Contenedor cuadrado para mantener la proporción y la animación */}
          <div className="relative h-2/3 aspect-square flex items-center justify-center">
            {!isDark && <Indicator />}
            <SunIcon className={`w-full h-full p-2 z-10 transition-colors duration-300 ${isDark ? 'text-gray-400' : 'text-yellow-500'}`} />
          </div>
        </div>
        
        {/* Contenedor para el icono de la Luna (50% de la altura) */}
        <div
          onClick={() => setTheme('dark')}
          className="w-full h-1/2 flex items-center justify-center cursor-pointer"
          role="button"
          aria-label="Cambiar a tema oscuro"
        >
          {/* Contenedor cuadrado para mantener la proporción y la animación */}
          <div className="relative h-2/3 aspect-square flex items-center justify-center">
            {isDark && <Indicator />}
            <MoonIcon className={`w-full h-full p-2 z-10 transition-colors duration-300 ${isDark ? 'text-blue-400' : 'text-gray-400'}`} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ThemeToggler;