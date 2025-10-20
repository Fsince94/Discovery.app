import React from 'react';
import { motion, type Variants } from 'framer-motion';

const orbitVariants: (duration: number, delay: number) => Variants = (duration, delay) => ({
  animate: {
    rotate: 360,
    transition: {
      duration,
      delay,
      ease: 'linear',
      repeat: Infinity,
    },
  },
});

const nodeVariants: (delay: number) => Variants = (delay) => ({
  animate: {
    scale: [1, 1.2, 1],
    transition: {
      duration: 2,
      delay,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
});


/**
 * 🎨 Ilustración animada para la vista de Discovery.
 * 💡 SOLID Insight: Este componente tiene la única responsabilidad (SRP) de renderizar
 * una ilustración SVG decorativa y animada. Es completamente autocontenido y no
 * tiene lógica de negocio, lo que lo hace muy reutilizable y fácil de mantener.
 */
export const DiscoveryIllustration: React.FC = () => {
  return (
    <motion.div
      className="w-48 h-48"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Órbitas */}
        <motion.g
          variants={orbitVariants(12, 0)}
          animate="animate"
          style={{ transformOrigin: '100px 100px' }}
        >
          <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        </motion.g>
        <motion.g
          variants={orbitVariants(18, 0.5)}
          animate="animate"
          style={{ transformOrigin: '100px 100px' }}
        >
          <ellipse cx="100" cy="100" rx="75" ry="40" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        </motion.g>
        
        {/* Nodos orbitando */}
        <motion.g
          variants={orbitVariants(12, 0)}
          animate="animate"
          style={{ transformOrigin: '100px 100px' }}
        >
          <motion.circle
            cx="100" cy="40" r="6"
            fill="rgba(255, 255, 255, 0.8)"
            variants={nodeVariants(0)}
            animate="animate"
            filter="url(#glow)"
          />
        </motion.g>

        <motion.g
          variants={orbitVariants(18, 0.5)}
          animate="animate"
          style={{ transformOrigin: '100px 100px' }}
        >
          <motion.circle
            cx="25" cy="100" r="8"
            fill="rgba(255, 255, 255, 0.9)"
            variants={nodeVariants(0.5)}
            animate="animate"
            filter="url(#glow)"
          />
        </motion.g>
        
        {/* Cerebro central */}
        <motion.g
          initial={{ scale: 0.95, opacity: 0.8 }}
          animate={{ scale: [0.95, 1, 0.95], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path 
            d="M126.4,86.3c-2.3-2-5.4-2.8-8.4-2.1c-2.3,0.5-4.4,1.8-5.9,3.8c-2.6,3.4-3,7.9-1.1,11.7 c2.3,4.6,7.2,7.3,12.3,6.7c3.7-0.4,7-2.5,9-5.5C135.5,96.3,132,89.1,126.4,86.3z M100,65.1c-8.9,0-16.7,3.4-22.6,8.9 c-3.9,3.6-7.1,8-9.4,12.9c-2.8,5.8-4.2,12.1-4.2,18.5c0,13.7,5.5,26.1,14.5,35.1c3.5,3.5,7.6,6.4,12.1,8.6c1.1,0.5,2.2,1,3.3,1.4 c8.3,3.3,17.4,3.3,25.7,0c1.1-0.4,2.2-0.9,3.3-1.4c4.5-2.2,8.6-5.1,12.1-8.6c9-9,14.5-21.4,14.5-35.1 c0-6.4-1.4-12.7-4.2-18.5c-2.3-4.9-5.5-9.3-9.4-12.9C116.7,68.5,108.9,65.1,100,65.1z M73.6,86.3c-5.6,2.8-8.9,9.9-6.1,15.5 c1.9,3,5.2,5.1,9,5.5c5.1,0.6,10-2.1,12.3-6.7c1.9-3.8,1.5-8.3-1.1-11.7c-1.5-2-3.6-3.3-5.9-3.8C79,83.5,75.9,84.3,73.6,86.3z" 
            fill="rgba(255,255,255,0.7)" 
            filter="url(#glow)"
          />
        </motion.g>
      </svg>
    </motion.div>
  );
};
