import React from 'react';

const AppContext = React.createContext(undefined);

const AppContextProvider = (props) => {
  const [loading, setLoading] = React.useState(false);
  
  const context = {
    loading,
    setLoading
  }

  return (
    <AppContext.Provider value={context}>
      {props.children}
    </AppContext.Provider>
  );
}

export { AppContextProvider };

export const useApp = () => {
  const context = React.useContext(AppContext)
  return context
}