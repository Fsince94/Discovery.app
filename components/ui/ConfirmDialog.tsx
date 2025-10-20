
import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { tapAnimation } from '../../utils/animations';

// ⚙️ Componente de Diálogo de Confirmación reutilizable.
// 💡 SOLID Insight: Este componente sigue el SRP (Single Responsibility Principle).
//    Su única tarea es mostrar un modal, confirmar una acción y notificar al componente padre.
//    Es altamente cohesivo y no conoce la lógica de la acción que confirma.

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const dialogVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', damping: 15 } },
  exit: { opacity: 0, scale: 0.8 },
};

interface ConfirmDialogProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ title, message, onConfirm, onCancel }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <motion.div
        className="w-full max-w-sm bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 text-center"
        variants={dialogVariants}
      >
        <h2 id="dialog-title" className="text-xl font-bold text-gray-800 dark:text-white mb-2">{title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
        <div className="flex justify-center gap-4">
          <motion.button
            onClick={onCancel}
            className="px-6 py-2 rounded-full text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-600 font-semibold"
            whileTap={tapAnimation}
            whileHover={{ scale: 1.05 }}
          >
            Cancelar
          </motion.button>
          <motion.button
            onClick={onConfirm}
            className="px-6 py-2 rounded-full text-white bg-red-500 font-semibold"
            whileTap={tapAnimation}
            whileHover={{ scale: 1.05 }}
          >
            Confirmar
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ConfirmDialog;
