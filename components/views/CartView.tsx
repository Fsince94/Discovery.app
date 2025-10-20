import React from 'react';
import { motion, type Variants } from 'framer-motion';
import SubViewLayout from '../layout/SubViewLayout';
import { TrashIcon } from '../icons/TrashIcon';
import { tapAnimation } from '../../utils/animations';

// --- Variantes de Animación ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0 }
};

const summaryVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.5, type: 'spring' } }
};

// --- Datos de Ejemplo ---
const mockCartItems = [
  { id: 'item-1', name: 'Artefacto de IA: "Asistente Creativo"', price: 49.99, quantity: 1 },
  { id: 'item-2', name: 'Consultoría UX (1 hora)', price: 150.00, quantity: 1 },
  { id: 'item-3', name: 'Suscripción Blog Premium', price: 9.99, quantity: 1 },
];

/**
 * 🧩 Vista para el Carrito de Compras.
 * 💡 SOLID Insight: Este componente tiene la única responsabilidad (SRP) de mostrar
 * el contenido del carrito. La lógica de navegación y el layout general son gestionados
 * por `SubViewLayout` y `NavigationContext`, demostrando una excelente inversión de
 * dependencias (DIP).
 */
const CartView: React.FC = () => {
  const subtotal = mockCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0.00 : 5.00; // Envío gratis sobre $50
  const total = subtotal + shipping;

  return (
    <SubViewLayout>
      <div className="w-full max-w-lg mx-auto flex flex-col flex-grow items-center text-left">
        {/* Lista de Items */}
        <motion.ul 
          className="w-full space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {mockCartItems.map((item) => (
            <motion.li 
              key={item.id}
              layout
              variants={itemVariants}
              className="flex items-center p-4 bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-xl shadow-sm"
            >
              <div className="flex-grow">
                <p className="font-semibold text-white">{item.name}</p>
                <p className="text-sm text-white/70">
                  Cantidad: {item.quantity}
                </p>
              </div>
              <div className="text-right ml-4 flex-shrink-0">
                <p className="font-bold text-white text-lg">
                  ${item.price.toFixed(2)}
                </p>
                 <motion.button 
                  className="text-red-400/70 hover:text-red-400 mt-1" 
                  aria-label={`Eliminar ${item.name}`}
                  whileTap={tapAnimation}
                 >
                   <TrashIcon className="w-5 h-5" />
                 </motion.button>
              </div>
            </motion.li>
          ))}
        </motion.ul>

        {/* Resumen y Checkout */}
        <motion.div 
          className="w-full mt-auto pt-6 space-y-4"
          variants={summaryVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Líneas de Resumen */}
          <div className="space-y-2 text-white/90">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Envío</span>
              <span className="font-medium">${shipping.toFixed(2)}</span>
            </div>
            <div className="w-full h-px bg-white/20 my-2" />
            <div className="flex justify-between text-xl font-bold text-white">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <motion.button
            className="w-full p-4 bg-cyan-500 dark:bg-teal-400 text-white dark:text-gray-900 rounded-xl font-bold text-lg shadow-lg"
            whileTap={tapAnimation}
            whileHover={{ scale: 1.03 }}
          >
            Proceder al Pago
          </motion.button>
        </motion.div>
      </div>
    </SubViewLayout>
  );
};

export default CartView;