import React from 'react';
import { motion } from 'framer-motion';
import { springTransition, tapAnimation } from '../utils/animations';
import { BackIcon } from './icons/BackIcon';

interface BackButtonProps {
  onClick: () => void;
  ariaLabel: string;
  title?: string; // 💡 New optional prop for the title
  className?: string; // 💡 OCP: Se añade className para permitir sobreescribir estilos.
}

/**
 * ⚙️ Componente reutilizable para el botón de "Volver" con título opcional.
 * 💡 SOLID Insight: Este componente sigue el SRP (Single Responsibility Principle).
 * Su tarea es renderizar un botón de retroceso y, opcionalmente, un título alineado,
 * y ejecutar una función callback. La lógica está encapsulada y desacoplada.
 * Es OCP (Open/Closed Principle) porque se extendió con un título y `className`
 * sin modificar su comportamiento original.
 */
const BackButton: React.FC<BackButtonProps> = ({ onClick, ariaLabel, title, className }) => {
  return (
    <motion.div
      key="back-button-container"
      // ⚙️ Se fusionan las clases base con las que se reciban por props.
      className={["flex items-center", className].filter(Boolean).join(" ")}
      initial={{ opacity: 0, x: -20, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -20, scale: 0.8 }}
      transition={{ ...springTransition, damping: 30 }}
    >
      <motion.button
        onClick={onClick}
        className="w-16 h-16 flex items-center justify-center rounded-full"
        aria-label={ariaLabel}
        whileTap={tapAnimation}
        whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
      >
        <BackIcon className="w-8 h-8 text-white" />
      </motion.button>
      {title && (
        <h1 className="text-3xl font-bold text-white ml-4 capitalize">{title}</h1>
      )}
    </motion.div>
  );
};

export default BackButton;
