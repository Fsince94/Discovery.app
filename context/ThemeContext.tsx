import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// 💡 ISP (Interface Segregation Principle): La interfaz del contexto es mínima y específica.
// Se ha actualizado para exponer `setTheme` para un control más preciso.
type Theme = 'light' | 'dark';
interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// ⚙️ Se crea el contexto con un valor por defecto.
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * 🧩 Provider del Tema.
 * 💡 SOLID Insight: Este componente sigue el SRP (Single Responsibility Principle).
 * Su única responsabilidad es gestionar el estado del tema (claro/oscuro) y aplicarlo
 * globalmente.
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  // Este useEffect aplica el tema al documento HTML, permitiendo que TailwindCSS
  // utilice la estrategia de 'class' para el modo oscuro.
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * 훅 personalizado para acceder fácilmente al contexto del tema.
 * 💡 DIP (Dependency Inversion Principle): Los componentes que usan este hook
 * dependen de la abstracción (`ThemeContext`), no de la implementación concreta
 * de cómo se gestiona el estado del tema.
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme debe ser usado dentro de un ThemeProvider');
  }
  return context;
};
