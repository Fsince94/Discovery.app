
import React, { useState, ReactElement } from 'react';
import { AnimatePresence } from 'framer-motion';
import BottomNavBar from './components/BottomNavBar';
import DiscoveryView from './components/views/DiscoveryView';
import SettingsView from './components/views/SettingsView';
import Header from './components/layout/Header';
import { ProfileBrainIcon } from './components/icons/ProfileBrainIcon';

// 💡 Mapa para centralizar los títulos de las vistas.
// Facilita el mantenimiento y mantiene el componente App como única fuente de verdad
// para la navegación principal.
const viewTitles: Record<string, string> = {
  settings: 'Configuración',
  notifications: 'Notificaciones',
  cart: 'Carrito',
  delete: 'Eliminar',
};

/**
 * 🧩 Componente principal de la aplicación.
 * 💡 SOLID Insight: Este componente actúa como un controlador central (SRP),
 * gestionando únicamente el estado de la vista principal (`activeView`). La lógica
 * de la UI de cada vista, incluyendo sus cabeceras, ha sido delegada a los componentes
 * hijos, mejorando la encapsulación y la cohesión.
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
        // 💡 Se pasa la función para volver a Discovery a través de props.
        //    SettingsView ahora gestionará su propia cabecera.
        return <SettingsView key="settings" onBackToDiscovery={() => handleNavigation('profile')} />;
      default:
        // ⚙️ Vista genérica para elementos sin pantalla designada.
        //    Ahora incluye su propia cabecera para mantener la consistencia en la navegación.
        return (
          <div key={activeView} className="w-full h-full flex flex-col">
            <Header
              parent={{
                label: 'Discovery',
                icon: ProfileBrainIcon,
                onBack: () => handleNavigation('profile'),
              }}
              currentTitle={viewTitles[activeView]}
            />
            <div className="flex-grow flex items-center justify-center text-white dark:text-gray-100 text-center p-4">
              <div>
                <p className="text-lg">Esta vista está en construcción.</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    // ⚙️ Se añade `pb-28` para dejar espacio a la barra de navegación fija.
    <div className="relative min-h-screen w-full bg-gradient-to-br from-teal-300 to-cyan-400 dark:from-gray-800 dark:to-slate-900 flex flex-col items-center font-sans overflow-hidden transition-colors duration-500 pb-28">
      {/* 
        ✅ La cabecera global ha sido eliminada.
        Ahora, cada vista es responsable de renderizar su propia cabecera (Header)
        o layout de sub-vista (SubViewLayout). Esto resuelve el conflicto de
        breadcrumbs duplicados y sigue el principio de Responsabilidad Única (SRP).
      */}
      
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
