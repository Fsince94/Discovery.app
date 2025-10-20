import React from 'react';

/**
 * ⚙️ Icono que representa un carrito de compras.
 * 💡 SOLID Insight: Sigue el SRP, su única responsabilidad es renderizar un ícono SVG.
 */
export const CartIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    strokeWidth={1.5}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.343 1.087-.835l1.823-6.423a.75.75 0 00-.67-1.035H5.166c-.34 0-.622.28-.622.622v.046a.75.75 0 01-.75.75H3.75M16.5 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM8.25 18.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" 
    />
  </svg>
);