import React from 'react';


const AuthContext = React.createContext(undefined);

const AuthContextProvider = (props) => {
  const [user, setUser] = React.useState(undefined);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const data = localStorage.getItem('user');
    if(data) {
      setUser(JSON.parse(data));
    }
    setIsLoading(false);
  }, []);

  const login = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  }

  const logout = () => {
    localStorage.clear();
    setUser(undefined);
  }

  const isLoggedIn = () => {
    let isLoggedIn = user ? true : false;
    return isLoggedIn;
  }

  const isAdmin = () => {
    return user && user.role == 'admin';
  }
  
  const context = {
    user,
    login,
    logout,
    isLoggedIn,
    isAdmin,
    isLoading
  }

  return (
    <AuthContext.Provider value={context}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext };

export default AuthContextProvider;