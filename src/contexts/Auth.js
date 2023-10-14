import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [loading, setLoading] = useState(false);

	const login = () => {
		setLoading(true);
		AsyncStorage.setItem('@auth_data', JSON.stringify('DUMMY_TOKEN'));
		setIsLoggedIn(true);
		setLoading(false);
	}

	const logout = () => {
		setIsLoggedIn(false);
		AsyncStorage.removeItem('@auth_data');
	}

	return (
		<AuthContext.Provider value={{login, logout, isLoggedIn, loading}}>
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