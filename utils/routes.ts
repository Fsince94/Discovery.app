import { RoutesMap } from '../types';
import { ProfileBrainIcon } from '../components/icons/ProfileBrainIcon';
import { SettingsIcon } from '../components/icons/SettingsIcon';
import { BellIcon } from '../components/icons/BellIcon';
import { BagIcon } from '../components/icons/BagIcon';
import { TrashIcon } from '../components/icons/TrashIcon';


/**
 * 🗺️ Mapa de Rutas de la Aplicación
 * 💡 SOLID Insight: Este objeto es la única fuente de verdad (Single Source of Truth)
 * para la estructura de navegación. Centralizar esta configuración aquí hace que el sistema
 * sea increíblemente fácil de mantener y escalar (OCP). Si necesitas añadir o modificar
 * una vista, solo tienes que tocar este archivo.
 *
 * Sigue el principio DRY (Don't Repeat Yourself), ya que los títulos y las relaciones
 * entre vistas se definen una sola vez.
 */
export const routes: RoutesMap = {
  // --- Vistas de la Barra de Navegación (Raíz) ---
  // 💡 FIX: Las vistas principales ahora tienen `parent: null` para ser consideradas raíces.
  'profile': { title: 'Discovery', parent: null, icon: ProfileBrainIcon },
  'settings': { title: 'Configuración', parent: null, icon: SettingsIcon },
  'notifications': { title: 'Notificaciones', parent: null, icon: BellIcon },
  'cart': { title: 'Carrito', parent: null, icon: BagIcon },
  'delete': { title: 'Eliminar', parent: null, icon: TrashIcon },

  // --- Sub-vistas de Discovery ---
  // 💡 Estas SÍ son hijas de 'profile', por lo que su `parent` es correcto.
  'chat': { title: 'Chat', parent: 'profile' },
  'consulting': { title: 'Consultoría', parent: 'profile' },
  'blog': { title: 'Blog', parent: 'profile' },

  // --- Sub-vistas de Configuración ---
  'user-profile': { title: 'Perfil', parent: 'settings' },
  'theme': { title: 'Tema', parent: 'settings' },
};