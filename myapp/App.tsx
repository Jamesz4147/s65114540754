import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import Navbar from './components/Navbar';
import UserProfile from './screens/User';
import Settings from './screens/setting';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import EditUser from './screens/EditUser';
import HostScreen from './screens/HostScreen';
import UserDetailScreen from './screens/UserDetailScreen';
import notifee, { AndroidImportance } from '@notifee/react-native';

// ตั้งค่า baseURL ให้ทั้งแอป
const BASE_URL =
  Platform.OS === 'android' ? 'http://10.0.2.2:8000' : 'http://localhost:8000';
axios.defaults.baseURL = BASE_URL;
axios.defaults.timeout = 10000;

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    async function createNotificationChannel() {
      if (Platform.OS === 'android') {
        await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
          importance: AndroidImportance.HIGH,
          sound: 'default',
        });
        console.log('Notification channel created');
      }
    }
    createNotificationChannel();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={Navbar} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="HostScreen" component={HostScreen} />
        <Stack.Screen name="UserDetail" component={UserDetailScreen} />
        <Stack.Screen name="EditUser" component={EditUser} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
