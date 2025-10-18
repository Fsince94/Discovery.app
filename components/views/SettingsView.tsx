import React from 'react';
import ViewContainer from '../ViewContainer';

const SettingsView: React.FC = () => {
  return (
    <ViewContainer>
      <h1 className="text-5xl font-bold mb-4">Configuración</h1>
      <p className="text-xl max-w-md">
        Gestiona las preferencias de tu cuenta, notificaciones y más.
        Esta sección se expandirá con más opciones personalizables.
      </p>
    </ViewContainer>
  );
};

export default SettingsView;