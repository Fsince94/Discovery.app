import React from 'react';
import ViewContainer from '../ViewContainer';
import ThemeToggler from '../ThemeToggler';

/**
 * 🧩 Componente para la vista de "Configuración".
 * 💡 SOLID Insight: Este componente sigue el SRP (Single Responsibility Principle).
 * Su única tarea es componer y mostrar las opciones de configuración disponibles,
 * como el conmutador de tema, en un layout de galería.
 */
const SettingsView: React.FC = () => {
  return (
    <ViewContainer>
      {/* Contenedor del Título y Descripción */}
      <div className="w-full max-w-2xl text-center sm:text-left mb-8 px-4">
        <h1 className="text-4xl font-bold mb-4">Configuración</h1>
        <p className="text-lg text-gray-200 dark:text-gray-400">
          Personaliza tu experiencia. Aquí puedes ajustar las preferencias de la aplicación.
        </p>
      </div>
      
      {/* Galería de Tarjetas de Configuración */}
      <div className="w-full max-w-2xl flex flex-row flex-wrap justify-center sm:justify-start gap-8 px-4">
        {/* ⚙️ Tarjeta 1: Conmutador de Tema */}
        <ThemeToggler />

        {/*  futura Tarjeta 2: Marcador de posición */}
        <div className="w-24 h-40 bg-gray-200/50 dark:bg-gray-700/50 rounded-2xl border-2 border-dashed border-gray-400/50 flex items-center justify-center transition-colors duration-300">
            <span className="text-gray-400 dark:text-gray-500 text-xs text-center p-2">
                Próxima Novedad
            </span>
        </div>
        
        {/* futura Tarjeta 3: Marcador de posición */}
        <div className="w-24 h-40 bg-gray-200/50 dark:bg-gray-700/50 rounded-2xl border-2 border-dashed border-gray-400/50 flex items-center justify-center transition-colors duration-300">
            <span className="text-gray-400 dark:text-gray-500 text-xs text-center p-2">
                Próxima Novedad
            </span>
        </div>
      </div>
    </ViewContainer>
  );
};

export default SettingsView;