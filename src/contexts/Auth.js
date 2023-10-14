import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();
const auth_data_key = '@auth_data'

const AuthProvider = ({children}) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

  //the AuthContext start with loading equals true
  //and stay like this, until the data be load from Async Storage
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  	//Every time the App is opened, this provider is rendered
    //and loadAuthDataFromStorage() is invoked
  	loadAuthDataFromStorage();
  },[]);

  async function loadAuthDataFromStorage() {
  	try {
  		const authDataSerialized = await AsyncStorage.getItem(auth_data_key);
  		if (authDataSerialized) {
  			const auth_token = JSON.parse(authDataSerialized);
  			setIsLoggedIn(true);
  		}
  	} catch (error) {  		
  	} finally {
  		setLoading(false);
  	}
  }

	const login = () => {
		setLoading(true);
		AsyncStorage.setItem(auth_data_key, JSON.stringify('DUMMY_TOKEN'));
		setIsLoggedIn(true);
		setLoading(false);
	}

	const logout = () => {
		setIsLoggedIn(false);
		AsyncStorage.removeItem(auth_data_key);
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