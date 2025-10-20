import React from 'react';
import { motion } from 'framer-motion';

interface DiscoverySwitchProps {
  activeTab: 'discovery' | 'artifacts';
  onTabChange: (tab: 'discovery' | 'artifacts') => void;
}

const TABS = [
  { id: 'discovery', label: 'Discovery' },
  { id: 'artifacts', label: 'Artefactos' },
] as const;

/**
 * ⚙️ Componente para el selector de sub-vistas de Discovery.
 * 💡 SOLID Insight: Este componente sigue el SRP (Single Responsibility Principle),
 * ya que su única tarea es renderizar el selector y notificar al padre
 * sobre el cambio de pestaña, sin conocer la lógica de lo que cada pestaña muestra.
 */
const DiscoverySwitch: React.FC<DiscoverySwitchProps> = ({ activeTab, onTabChange }) => {
  return (
    // ⚙️ w-fit hace que el contenedor se ajuste al ancho de su contenido.
    //    justify-center y gap-1 organizan los botones en el centro.
    <div className="relative w-fit mx-auto flex items-center justify-center gap-1 bg-white/10 dark:bg-black/10 backdrop-blur-sm rounded-full p-1 transition-colors duration-300">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          // ⚙️ Se elimina w-1/2 y se añade padding horizontal (px-6) para que
          //    el botón se ajuste al tamaño del texto.
          className={`relative rounded-full py-2 px-6 text-sm font-bold focus:outline-none transition-colors duration-300 ${
            activeTab === tab.id
              ? 'text-teal-800 dark:text-cyan-800'
              : 'text-white/80 hover:bg-white/10'
          }`}
          aria-pressed={activeTab === tab.id}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="discovery-switch-indicator"
              className="absolute inset-0 bg-white dark:bg-cyan-300 rounded-full"
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default DiscoverySwitch;
