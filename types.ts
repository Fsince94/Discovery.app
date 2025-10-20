
import type React from 'react';
import { ProfileBrainIcon } from './components/icons/ProfileBrainIcon';
import { SettingsIcon } from './components/icons/SettingsIcon';
/**
 * Define la estructura de un elemento de navegación.
 * Cada elemento tiene un identificador único, una etiqueta para accesibilidad
 * y un componente de ícono para ser renderizado.
 */
export interface NavItem {
  id: string;
  label: string;
  icon: React.FC<{ className?: string }>;
}

/**
 * 💡 ISP (Interface Segregation Principle): Una interfaz específica para los breadcrumbs,
 * que ahora incluye un ícono opcional para una UI más compacta y visual.
 */
export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  icon?: React.FC<{ className?: string }>;
}


// --- Nuevos Tipos para el Sistema de Navegación Centralizado --- //

/**
 * 💡 Define la configuración de una ruta individual en la aplicación.
 * - title: El texto que se mostrará en cabeceras y breadcrumbs.
 * - parent: El `id` de la ruta padre, o `null` si es una ruta raíz.
 * - icon: Un ícono opcional para representar la ruta en los breadcrumbs.
 */
export interface RouteConfig {
  title: string;
  parent: string | null;
  icon?: React.FC<{ className?: string }>;
}

/**
 * 💡 Un mapa que asocia identificadores de ruta (`string`) con su configuración.
 * Esta es la "fuente de la verdad" para toda la estructura de navegación.
 */
export type RoutesMap = Record<string, RouteConfig>;

/**
 * 💡 ISP: Define la forma del contexto de navegación.
 * Expone el estado actual y las acciones necesarias para que los componentes
 * interactúen con el sistema de navegación sin conocer su implementación interna.
 */
export interface NavigationContextType {
  currentView: string;
  history: string[];
  breadcrumbs: BreadcrumbItem[];
  viewTitle: string;
  navigate: (viewId: string) => void;
  goBack: () => void;
  resetTo: (viewId: string) => void;
}
