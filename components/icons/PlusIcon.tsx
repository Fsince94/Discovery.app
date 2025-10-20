
import React from 'react';

/**
 * ⚙️ Icono de "Más" o "Crear".
 * 💡 SOLID Insight: Sigue el SRP, su única responsabilidad es renderizar un ícono SVG.
 */
export const PlusIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
