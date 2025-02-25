import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TabContextType {
  activetab: string;
  setActiveTab: (tab: string) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export const TabProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activetab, setActiveTab] = useState('트레저타운');

  return (
    <TabContext.Provider value={{ activetab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTab = (): TabContextType => {
  const context = useContext(TabContext);
  if (!context) throw new Error('useTab must be used within a TabProvider');
  return context;
};