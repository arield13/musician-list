import React, { ReactNode, createContext, useContext, useState } from 'react';

type AppProviderProps = {
    childrenMainContainer: React.ReactNode; //👈 children prop typr
};

interface AppContextProps {
  hideLeftColumn: boolean;
  toggleHideLeftColumn: () => void;
}

const AppContext = createContext<AppContextProps>({
  hideLeftColumn: false,
  toggleHideLeftColumn: () => {},
});

export const useAppContext = () => useContext(AppContext);

export const AppProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [hideLeftColumn, setHideLeftColumn] = useState(false);

  const toggleHideLeftColumn = () => {
    setHideLeftColumn((prevHideLeftColumn) => !prevHideLeftColumn);
  };

  return (
    <AppContext.Provider value={{ hideLeftColumn, toggleHideLeftColumn }}>
      {children}
    </AppContext.Provider>
  );
};
