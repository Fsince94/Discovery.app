
import React from 'react';
import SubViewLayout from '../layout/SubViewLayout';
import { motion } from 'framer-motion';

/**
 * 🧩 Vista "Learn".
 * 💡 SOLID Insight: Este componente sigue el SRP. Su única responsabilidad es
 * renderizar el contenido de la vista de aprendizaje. El layout y la navegación
 * son manejados por abstracciones (`SubViewLayout`, `NavigationContext`).
 */
const LearnView: React.FC = () => {
  return (
    <SubViewLayout>
      <div className="flex-grow flex items-center justify-center text-white dark:text-gray-100 text-center p-4">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-4">Learn</h1>
          <p className="text-lg">
            Aquí encontrarás cursos, tutoriales y recursos de aprendizaje.
            <br/>
            Esta vista está en construcción.
          </p>
        </motion.div>
      </div>
    </SubViewLayout>
  );
};

export default LearnView;
