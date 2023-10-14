import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const login = () => {
		setIsLoggedIn(true);
	}

	const logout = () => {
		setIsLoggedIn(false);
	}

	return (
		<AuthContext.Provider value={{login, logout, isLoggedIn}}>
			{children}
		</AuthContext.Provider>
	)
};

// A simple hooks to facilitate the access to the AuthContext
// and permit components to subscribe to AuthContext updates
function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export {AuthContext, AuthProvider, useAuth};