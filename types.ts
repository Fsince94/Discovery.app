
import type React from 'react';

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
