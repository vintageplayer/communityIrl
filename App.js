import React from 'react';
import {AuthProvider} from './src/contexts/Auth';
import { Root } from './src/Root';

const App = () => {
  return (
    <AuthProvider>
      <Root/>
    </AuthProvider>
  );

};

export default App;