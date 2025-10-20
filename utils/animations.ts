import { Transition } from 'framer-motion';

/**
 * Configuración de transición de tipo "spring" (resorte).
 * 💡 UX Tweak: Se ha reducido la rigidez (stiffness) y la amortiguación (damping)
 * para crear una animación más suave y "natural". Un resorte menos rígido
 * se siente más orgánico y menos abrupto.
 * - stiffness: Rigidez del resorte. Un valor más bajo lo hace más suave.
 * - damping: Amortiguación. Un valor más bajo permite una ligera oscilación al final.
 */
export const springTransition: Transition = {
  type: "spring",
  stiffness: 380,
  damping: 30,
};

/**
 * Variante para animaciones de "tap" (toque) o "hover" (cursor encima).
 * Define una ligera reducción de escala para dar feedback visual al usuario
 * cuando interactúa con un elemento.
 */
export const tapAnimation = {
  scale: 0.9,
};