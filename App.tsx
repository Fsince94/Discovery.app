import React, { useState, ReactElement } from 'react';
import { AnimatePresence } from 'framer-motion';
import BottomNavBar from './components/BottomNavBar';
import DiscoveryView from './components/views/DiscoveryView';
import SettingsView from './components/views/SettingsView';

/**
 * 🧩 Componente principal de la aplicación.
 * 💡 SOLID Insight: Este componente actúa como un controlador central (SRP),
 * gestionando únicamente el estado de la vista principal (`activeView`). La lógica
 * de sub-navegación se ha delegado a sus hijos (como DiscoveryView), promoviendo
 * la encapsulación y la cohesión.
 */
const App: React.FC = () => {
  const [activeView, setActiveView] = useState<string>('profile');

  /**
   * Maneja la navegación principal desde la BottomNavBar.
   */
  const handleNavigation = (viewId: string) => {
    setActiveView(viewId);
  };

  /**
   * Renderiza la vista base activa.
   * @returns El componente de la vista a renderizar.
   */
  const renderView = (): ReactElement => {
    switch (activeView) {
      case 'profile':
        return <DiscoveryView key="discovery" />;
      case 'settings':
        return <SettingsView key="settings" />;
      default:
        // Vista genérica para elementos sin pantalla designada.
        return (
          <div key={activeView} className="flex-grow flex items-center justify-center text-white dark:text-gray-100 text-center p-4">
            <div>
              <h1 className="text-4xl font-bold mb-4 capitalize">{activeView}</h1>
              <p className="text-lg">Esta vista está en construcción.</p>
            </div>
          </div>
        );
    }
  };

  return (
    // Se añade el fondo para el modo oscuro y una transición de color.
    <div className="relative min-h-screen w-full bg-gradient-to-br from-teal-300 to-cyan-400 dark:from-gray-800 dark:to-slate-900 flex flex-col items-center justify-between font-sans overflow-hidden transition-colors duration-500">
      <main className="w-full flex-grow flex flex-col items-center justify-center relative">
        <AnimatePresence mode="wait">
          {renderView()}
        </AnimatePresence>
      </main>
      
      <BottomNavBar activeView={activeView} onNavigate={handleNavigation} />
    </div>
  );
};

export default App;