import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
   <>
    <StatusBar backgroundColor="#e6e6fa" barStyle="dark-content" />
      <AppNavigator />
   </>
     
  );
};

export default App;