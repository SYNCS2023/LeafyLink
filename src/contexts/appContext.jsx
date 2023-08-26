import { createContext, useContext, useState } from 'react';

export const AppContext = createContext(null);

export default function AppContextProvider(children) {
  const [budget, setBudget] = useState(0);
  const [location, setLocation] = useState([]);
  const [property, setProperty] = useState('');
  const [time, setTime] = useState('');
  const [potted, setPotted] = useState('');

  return (
    <AppContext.Provider
      value={{
        budget,
        setBudget,
        location,
        setLocation,
        property,
        setProperty,
        time,
        setTime,
        potted,
        setPotted,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within a AppContextProvider');
  }
  return context;
}
