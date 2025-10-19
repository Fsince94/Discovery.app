import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("No se pudo encontrar el elemento raíz para montar la aplicación.");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    {/* 💡 DIP (Dependency Inversion Principle): App y sus hijos ahora dependen de la abstracción
        del ThemeProvider, no de una implementación concreta de manejo de temas. */}
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);