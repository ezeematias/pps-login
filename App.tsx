import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import IndexScreen from './src/screens/IndexScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import Splash from './src/screens/SplashScreen';

export type RootStackParamList = {
  Home: any;
  Login: any;
  Index: any;
  SignUp: any;
  Splash: any;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
      <NavigationContainer theme={DefaultTheme}>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Splash" component={Splash} />
          <Stack.Screen options={{ headerShown: false }} name="Index" component={IndexScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
          <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUpScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
});
