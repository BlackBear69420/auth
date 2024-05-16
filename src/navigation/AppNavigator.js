
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import React from 'react'
import Login from '../screens/Login'
import LoginScreen from '../screens/SignUp'
import Home from '../screens/Home'
const Stack=createStackNavigator()
const AppNavigator = () => {
  return (
   <NavigationContainer>
    <Stack.Navigator
  //  screenOptions={{
  //   headerShown: false,
  //   gestureEnabled: true,
  //   gestureDirection: 'vertical',
  //   transitionSpec: {
  //     open: {
  //       animation: 'timing',
  //       config: {
  //         duration: 200,
  //       },
  //     },
  //     close: {
  //       animation: 'timing',
  //       config: {
  //         duration: 200,
  //       },
  //     },
  //   },
  //   cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
  // }}
    >
    <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name="LoginScreen" component={LoginScreen} />
        <Stack.Screen options={{headerShown:false}} name='Home' component={Home}/>
    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default AppNavigator