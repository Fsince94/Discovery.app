
import { Transition } from 'framer-motion';

/**
 * Configuración de transición de tipo "spring" (resorte).
 * Proporciona una animación elástica y fluida, ideal para el indicador
 * que se mueve entre los íconos de la barra de navegación.
 * - stiffness: Rigidez del resorte. Un valor más alto lo hace más rápido y brusco.
 * - damping: Amortiguación. Un valor más alto reduce la oscilación.
 */
export const springTransition: Transition = {
  type: "spring",
  stiffness: 500,
  damping: 40,
};

/**
 * Variante para animaciones de "tap" (toque) o "hover" (cursor encima).
 * Define una ligera reducción de escala para dar feedback visual al usuario
 * cuando interactúa con un elemento.
 */
export const tapAnimation = {
  scale: 0.9,
};