import React from 'react';
import { motion, type Variants, AnimatePresence } from 'framer-motion';
import { tapAnimation } from '../../utils/animations';
import { useNavigation } from '../../context/NavigationContext';
import CartView from './CartView';
import { CartIcon } from '../icons/CartIcon';

// --- Iconos para transacciones --- //
const ArrowUpIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
);
const ArrowDownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
);

const viewVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.3, staggerChildren: 0.07 }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    transition: { duration: 0.2 } 
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const mockTransactions = [
  { id: 1, type: 'received', from: 'Stripe', amount: 1250.75, date: 'Hoy' },
  { id: 2, type: 'sent', from: 'Asesoría de IA', amount: -250.00, date: 'Ayer' },
  { id: 3, type: 'received', from: 'Venta de Artefacto', amount: 75.50, date: 'Hace 3 días' },
];

/**
 * 🧩 Vista principal de la Billetera.
 * 💡 SOLID Insight: Su única responsabilidad (SRP) es mostrar el estado de la billetera
 * del usuario. Ahora también actúa como enrutador para su sub-vista (Carrito).
 */
const WalletView: React.FC = () => {
  const { currentView, navigate } = useNavigation();
  const isSubViewActive = currentView === 'cart';

  return (
    <div className="w-full h-full flex-grow">
      <AnimatePresence mode="wait">
        {!isSubViewActive ? (
          <motion.div
            key="wallet-main"
            className="w-full h-full flex-grow flex flex-col items-center px-4 pt-6 text-white"
            variants={viewVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* 💡 Cabecera con título y botón de carrito. */}
            <header className="w-full max-w-md mx-auto mb-4 flex items-center justify-between">
              <h1 className="text-3xl font-bold text-white">Billetera</h1>
              <motion.button
                onClick={() => navigate('cart')}
                aria-label="Ver carrito de compras"
                className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
                whileTap={tapAnimation}
                whileHover={{ scale: 1.1 }}
              >
                <CartIcon className="w-7 h-7 text-white" />
              </motion.button>
            </header>

            {/* Tarjeta de Balance */}
            <motion.div
              className="w-full max-w-md bg-white/10 dark:bg-black/20 backdrop-blur-lg rounded-3xl p-6 flex flex-col shadow-lg"
              variants={itemVariants}
            >
              <span className="text-white/80 text-sm">Balance Total</span>
              <span className="text-4xl font-bold mt-1">$1,076.25</span>
              <div className="flex gap-4 mt-6">
                <motion.button
                  className="flex-1 py-3 bg-white/20 rounded-xl font-semibold"
                  whileTap={tapAnimation}
                >
                  Añadir Fondos
                </motion.button>
                <motion.button
                  className="flex-1 py-3 bg-white/20 rounded-xl font-semibold"
                  whileTap={tapAnimation}
                >
                  Enviar
                </motion.button>
              </div>
            </motion.div>

            {/* Actividad Reciente */}
            <motion.div className="w-full max-w-md mt-8" variants={itemVariants}>
              <h2 className="text-xl font-semibold text-white/90 mb-4">Actividad Reciente</h2>
              <ul className="space-y-3">
                {mockTransactions.map(tx => (
                  <motion.li
                    key={tx.id}
                    className="flex items-center p-4 bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-xl"
                    variants={itemVariants}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${tx.type === 'received' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                      {tx.type === 'received' ? <ArrowDownIcon className="w-6 h-6" /> : <ArrowUpIcon className="w-6 h-6" />}
                    </div>
                    <div className="flex-grow">
                      <p className="font-semibold text-white">{tx.from}</p>
                      <p className="text-sm text-white/70">{tx.date}</p>
                    </div>
                    <span className={`font-bold ${tx.type === 'received' ? 'text-green-300' : 'text-red-300'}`}>
                      {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('es-US', { style: 'currency', currency: 'USD' })}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        ) : (
          <CartView key="cart" />
        )}
      </AnimatePresence>
    </div>
  );
};

export default WalletView;