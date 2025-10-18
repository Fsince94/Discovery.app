import React, { useState, ReactElement } from 'react';
import { AnimatePresence } from 'framer-motion';
import BottomNavBar from './components/BottomNavBar';
import DiscoveryView from './components/views/DiscoveryView';
import ChatView from './components/views/ChatView';
import BlogView from './components/views/BlogView';
import ConsultingView from './components/views/ConsultingView';
import SettingsView from './components/views/SettingsView';
import OverlayContainer from './components/OverlayContainer';

/**
 * 🧩 Componente principal de la aplicación.
 * 💡 SOLID Insight: Este componente actúa como un controlador central (SRP),
 * gestionando el estado de la vista principal (`activeView`) y de los overlays (`activeOverlay`).
 * Pasa funciones de navegación a los componentes hijos (DI), permitiendo que el sistema sea
 * extensible (OCP) sin modificar los componentes de las vistas.
 */
const App: React.FC = () => {
  const [activeView, setActiveView] = useState<string>('profile');
  const [activeOverlay, setActiveOverlay] = useState<string | null>(null);

  /**
   * Maneja la navegación principal desde la BottomNavBar.
   * Cierra cualquier overlay activo al cambiar de vista.
   */
  const handleNavigation = (viewId: string) => {
    setActiveView(viewId);
    setActiveOverlay(null); 
  };

  /**
   * Muestra un overlay específico.
   */
  const handleShowOverlay = (overlayId: string) => {
    setActiveOverlay(overlayId);
  };
  
  /**
   * Cierra el overlay activo.
   */
  const handleCloseOverlay = () => {
    setActiveOverlay(null);
  };

  /**
   * Renderiza la vista base activa.
   * @returns El componente de la vista a renderizar.
   */
  const renderView = (): ReactElement => {
    // DiscoveryView es la única vista que puede tener overlays.
    if (activeView === 'profile') {
      return <DiscoveryView key="discovery" onNavigateOverlay={handleShowOverlay} />;
    }

    // El resto de las vistas principales se renderizan como antes.
    switch (activeView) {
      case 'settings':
        return <SettingsView key="settings" />;
      default:
        // Vista genérica para elementos sin pantalla designada.
        return (
          <div key={activeView} className="flex-grow flex items-center justify-center text-white text-center p-4">
            <div>
              <h1 className="text-4xl font-bold mb-4 capitalize">{activeView}</h1>
              <p className="text-lg">Esta vista está en construcción.</p>
            </div>
          </div>
        );
    }
  };

  /**
   * Renderiza el overlay activo sobre la vista base.
   * @returns El componente del overlay o null.
   */
  const renderOverlay = (): ReactElement | null => {
    switch (activeOverlay) {
      case 'chat':
        return (
          <OverlayContainer title="Chat" onClose={handleCloseOverlay}>
            <ChatView />
          </OverlayContainer>
        );
      case 'consulting':
        return (
          <OverlayContainer title="Consultoría" onClose={handleCloseOverlay}>
            <ConsultingView />
          </OverlayContainer>
        );
      case 'blog':
        return (
          <OverlayContainer title="Blog" onClose={handleCloseOverlay}>
            <BlogView />
          </OverlayContainer>
        );
      default:
        return null;
    }
  };

  return (
    // Se añade `relative` y `overflow-hidden` para que el posicionamiento y las animaciones del overlay funcionen correctamente.
    <div className="relative min-h-screen w-full bg-gradient-to-br from-teal-300 to-cyan-400 flex flex-col items-center justify-between font-sans overflow-hidden">
      <main className="w-full flex-grow flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {renderView()}
        </AnimatePresence>
      </main>

      {/* AnimatePresence maneja la entrada y salida de los overlays */}
      <AnimatePresence>
        {renderOverlay()}
      </AnimatePresence>
      
      <BottomNavBar activeView={activeView} onNavigate={handleNavigation} />
    </div>
  );
};

export default App;
