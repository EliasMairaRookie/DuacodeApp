import React, { createContext, useState, useContext, useEffect } from 'react';

// Crear el contexto
const OfficeContext = createContext();

// Proveedor del contexto
export const OfficeProvider = ({ children }) => {
  const [selectedOffice, setSelectedOffice] = useState(() => {
    // Intenta obtener la oficina seleccionada desde localStorage
    return localStorage.getItem('selectedOffice') || 'Galicia';
  });

  useEffect(() => {
    // Guarda el valor de selectedOffice en localStorage cada vez que cambie
    localStorage.setItem('selectedOffice', selectedOffice);
  }, [selectedOffice]);

  return (
    <OfficeContext.Provider value={{ selectedOffice, setSelectedOffice }}>
      {children}
    </OfficeContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useOffice = () => useContext(OfficeContext);
