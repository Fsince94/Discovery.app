
import React from 'react';

/**
 * ⚙️ Icono de Chevron para ser usado como separador en los breadcrumbs.
 * Es un componente de UI simple y reutilizable (SRP).
 */
export const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    strokeWidth={3}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);
