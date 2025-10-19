import React from 'react';
import ViewContainer from '../ViewContainer';
import ThemeToggler from '../ThemeToggler';

const SettingsView: React.FC = () => {
  return (
    <ViewContainer>
      {/* 🧩 Contenedor principal para alinear el contenido a la izquierda y permitir el crecimiento vertical */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-left">
          <h1 className="text-5xl font-bold mb-4">Configuración</h1>
          <p className="text-xl max-w-2xl mb-12">
            Gestiona las preferencias de tu cuenta, notificaciones y más.
          </p>
        </div>
        
        {/* 🖼️ Galería de tarjetas. Usamos flexbox con wrap para que se adapte a diferentes tamaños de pantalla. */}
        <div className="flex flex-row flex-wrap justify-center sm:justify-start gap-8">
          {/* Tarjeta 1: Selector de Tema */}
          <ThemeToggler />
          
          {/* 💡 Tarjetas de marcador de posición para futuras funcionalidades. */}
          {/* Se calculó el espacio para que quepan 3 tarjetas en fila en pantallas medianas y grandes. */}
          <div className="w-24 h-40 bg-gray-200/50 dark:bg-gray-700/50 rounded-2xl border-2 border-dashed border-gray-400 dark:border-gray-500 flex items-center justify-center transition-colors duration-300">
            <span className="text-xs text-center text-gray-500 dark:text-gray-400 p-2">Próxima Novedad</span>
          </div>
          
          <div className="w-24 h-40 bg-gray-200/50 dark:bg-gray-700/50 rounded-2xl border-2 border-dashed border-gray-400 dark:border-gray-500 flex items-center justify-center transition-colors duration-300">
            <span className="text-xs text-center text-gray-500 dark:text-gray-400 p-2">Otra Novedad</span>
          </div>
        </div>
      </div>
    </ViewContainer>
  );
};

export default SettingsView;
