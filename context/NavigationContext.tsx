import React, { createContext, useState, useContext, ReactNode, useMemo, useCallback } from 'react';
import { type NavigationContextType, type BreadcrumbItem } from '../types';
import { routes } from '../utils/routes';

/**
 * 💡 Contexto de Navegación.
 * Almacena el estado de la navegación global, como el historial de vistas.
 */
const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

interface NavigationProviderProps {
  children: ReactNode;
}

/**
 * 🧩 Provider de Navegación.
 * 💡 SOLID Insight: Este componente tiene una única responsabilidad (SRP): gestionar
 * el estado y la lógica de la navegación de toda la aplicación. Componentes como
 * `App`, `BottomNavBar` y `SubViewLayout` dependen de su abstracción (DIP) a través
 * del hook `useNavigation`.
 */
export const NavigationProvider: React.FC<NavigationProviderProps> = ({ children }) => {
  // El historial se gestiona como una pila, donde el último elemento es la vista activa.
  const [history, setHistory] = useState<string[]>(['profile']);

  const currentView = history[history.length - 1];

  /**
   * ⚙️ Navega a una nueva vista, añadiéndola a la pila del historial.
   */
  const navigate = useCallback((viewId: string) => {
    // Evita añadir duplicados consecutivos a la pila
    if (currentView !== viewId) {
      setHistory(prev => [...prev, viewId]);
    }
  }, [currentView]);

  /**
   * ⚙️ Vuelve a la vista anterior, quitando el último elemento de la pila.
   * No hace nada si ya está en la vista raíz.
   */
  const goBack = useCallback(() => {
    setHistory(prev => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, []);
  
  /**
   * ⚙️ Resetea la navegación a una vista específica (ej: al usar la BottomNavBar).
   * Limpia el historial y establece la nueva vista como la única en la pila.
   */
  const resetTo = useCallback((viewId: string) => {
    setHistory([viewId]);
  }, []);

  /**
   * memoized 🍞 Genera automáticamente los breadcrumbs basándose en el historial.
   * Recorre la jerarquía de rutas hacia atrás desde la vista actual hasta la raíz.
   */
  const breadcrumbs = useMemo<BreadcrumbItem[]>(() => {
    const trail: BreadcrumbItem[] = [];
    let currentId: string | null = currentView;

    while (currentId) {
      const route = routes[currentId];
      if (!route) break;

      // Se crea una función `onClick` que navega a ese punto del historial.
      const viewIdToNav = currentId; 
      const onClick = () => {
        // Encuentra el índice de esta vista en el historial y corta la pila hasta allí.
        const indexInHistory = history.lastIndexOf(viewIdToNav);
        if (indexInHistory !== -1) {
          setHistory(prev => prev.slice(0, indexInHistory + 1));
        }
      };

      trail.unshift({
        label: route.title,
        icon: route.icon,
        onClick: currentId === currentView ? undefined : onClick,
      });
      currentId = route.parent;
    }
    return trail;
  }, [currentView, history]);
  
  // 💡 El título de la vista actual se obtiene del mapa de rutas.
  const viewTitle = useMemo(() => routes[currentView]?.title || 'Vista', [currentView]);

  const value = { currentView, history, breadcrumbs, viewTitle, navigate, goBack, resetTo };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

/**
 * 훅 personalizado para acceder fácilmente al contexto de navegación.
 */
export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation debe ser usado dentro de un NavigationProvider');
  }
  return context;
};
