
import React from 'react';
import { motion, type Variants } from 'framer-motion';
import SubViewLayout from '../layout/SubViewLayout';
import { CreditCardIcon } from '../icons/CreditCardIcon';
import { PlusIcon } from '../icons/PlusIcon';
import { tapAnimation } from '../../utils/animations';

// 💡 Variantes de animación para la lista.
const listVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const mockPaymentMethods = [
  { id: 'visa-1234', type: 'Visa', last4: '1234', isDefault: true },
  { id: 'mc-5678', type: 'Mastercard', last4: '5678', isDefault: false },
  { id: 'paypal', type: 'PayPal', last4: 'user@email.com', isDefault: false },
];

/**
 * 🧩 Vista para gestionar los Métodos de Pago.
 * 💡 SOLID Insight: Este componente tiene la responsabilidad única (SRP) de mostrar
 * las opciones de pago del usuario. Delega toda la lógica de layout, cabecera y
 * navegación al componente `SubViewLayout` y al `NavigationContext`.
 */
const PaymentMethodsView: React.FC = () => {
  return (
    // ⚙️ SubViewLayout se encarga de la animación de entrada/salida y de generar
    //    los breadcrumbs automáticamente desde el contexto de navegación.
    <SubViewLayout>
      <div className="w-full max-w-md mx-auto flex flex-col flex-grow items-center text-left">
        <motion.ul 
          className="w-full space-y-4"
          variants={listVariants}
          initial="hidden"
          animate="visible"
        >
          {mockPaymentMethods.map((method) => (
            <motion.li 
              key={method.id}
              variants={itemVariants}
              className="flex items-center p-4 bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-xl shadow-sm"
            >
              <CreditCardIcon className="w-10 h-10 text-white/80 mr-4 flex-shrink-0" />
              <div className="flex-grow">
                <p className="font-bold text-white">
                  {method.type} •••• {method.last4}
                </p>
                <p className="text-sm text-white/70">
                  Expira 12/2028
                </p>
              </div>
              {method.isDefault && (
                <span className="text-xs font-bold text-cyan-200 bg-cyan-800/50 px-2 py-1 rounded-full">
                  Principal
                </span>
              )}
            </motion.li>
          ))}
        </motion.ul>

        <motion.button
          className="w-full mt-8 flex items-center justify-center gap-2 p-4 bg-white/20 dark:bg-black/20 backdrop-blur-lg rounded-xl text-white font-semibold focus:outline-none"
          whileTap={tapAnimation}
          whileHover={{ scale: 1.02 }}
          variants={itemVariants} // Reutilizamos la variante para animar su entrada
        >
          <PlusIcon className="w-6 h-6" />
          Añadir nuevo método
        </motion.button>
      </div>
    </SubViewLayout>
  );
};

export default PaymentMethodsView;
