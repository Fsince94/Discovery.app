
import React, { ReactElement } from 'react';
import { AnimatePresence } from 'framer-motion';
import BottomNavBar from './components/BottomNavBar';
import DiscoveryView from './components/views/DiscoveryView';
import SettingsView from './components/views/SettingsView';
import WalletView from './components/views/WalletView';
import LearnView from './components/views/LearnView'; // 💡 Importar la nueva vista de Learn
import { useNavigation } from './context/NavigationContext';
import SubViewLayout from './components/layout/SubViewLayout';

/**
 * 🧩 Componente principal de la aplicación.
 * 💡 SOLID Insight: Tras la refactorización, este componente delega TODA la lógica de
 * navegación al `NavigationContext` (DIP). Su única responsabilidad (SRP) es renderizar
 * el layout principal (barra de navegación y área de contenido) y la vista activa
 * que le indica el contexto.
 */
const App: React.FC = () => {
  const { currentView, viewTitle } = useNavigation();

  /**
   * Renderiza la vista base activa basándose en el estado del contexto de navegación.
   * @returns El componente de la vista a renderizar.
   */
  const renderView = (): ReactElement => {
    switch (currentView) {
      // 💡 Las vistas principales ahora no necesitan props de navegación.
      case 'profile':
        return <DiscoveryView key="discovery" />;
      case 'settings':
        return <SettingsView key="settings" />;
      case 'wallet':
        return <WalletView key="wallet" />;
      case 'learn': // 💡 Añadir el caso para la nueva vista Learn
        return <LearnView key="learn" />;
      
      // 💡 Las sub-vistas que antes se manejaban localmente (como 'chat')
      //    ahora se renderizan en sus componentes padres (`DiscoveryView`, `SettingsView`).
      //    Este default case es para las vistas de la BottomNavBar sin una pantalla compleja.
      default:
        // ⚙️ Vista genérica para elementos sin pantalla designada.
        //    Ahora utiliza SubViewLayout para mantener consistencia en la UI y breadcrumbs.
        return (
          <SubViewLayout key={currentView}>
            <div className="flex-grow flex items-center justify-center text-white dark:text-gray-100 text-center p-4">
              <div>
                <h1 className="text-4xl font-bold mb-4">{viewTitle}</h1>
                <p className="text-lg">Esta vista está en construcción.</p>
              </div>
            </div>
          </SubViewLayout>
        );
    }
  };

  return (
    // ⚙️ Se añade `pb-28` para dejar espacio a la barra de navegación fija.
    <div className="relative min-h-screen w-full bg-gradient-to-br from-teal-300 to-cyan-400 dark:from-gray-800 dark:to-slate-900 flex flex-col items-center font-sans overflow-hidden transition-colors duration-500 pb-28">
      
      {/* ⚙️ FIX: Se cambia `justify-center` a `justify-start` para alinear las vistas arriba. */}
      <main className="w-full flex-grow flex flex-col items-center justify-start relative">
        <AnimatePresence mode="wait">
          {renderView()}
        </AnimatePresence>
      </main>
      
      {/* 💡 BottomNavBar ahora obtiene su estado directamente del contexto. */}
      <BottomNavBar />
    </div>
  );
};

export default App;
