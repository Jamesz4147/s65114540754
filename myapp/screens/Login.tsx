import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/Loginstyles';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

// กำหนดประเภทของ formData
type FormData = {
    email: string;
    password: string;
};

const LoginScreen = ({ navigation }: { navigation: any }) => {
    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: ''
    });

    const [fcmToken, setFcmToken] = useState<string | null>(null);

    useEffect(() => {
        const getTokenAndSend = async () => {
          try {
            const authStatus = await messaging().requestPermission();
            const enabled =
              authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
              authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      
            if (!enabled) {
              console.warn('⚠️ Notification permission not granted');
              return;
            }
      
            const token = await messaging().getToken();
            console.log('✅ FCM Token:', token);
            setFcmToken(token);
      
            // 🔥 ส่ง token ไปยัง backend
            await fetch('/api/user/save-fcm-token', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                fcmToken: token,
                source: 'login_screen',
              }),
            });
          } catch (error) {
            console.error('🔥 Error getting FCM token:', error);
          }
        };
      
        getTokenAndSend();
      
        // ✅ Foreground Handler → ใช้ Notifee ในการแสดง Notification Bar
        const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
          console.log('📥 Foreground Message:', remoteMessage);
      
          await notifee.displayNotification({
            title: remoteMessage.notification?.title || '📩 แจ้งเตือน',
            body: remoteMessage.notification?.body || '',
            android: {
              channelId: 'default',
              importance: 4,
              pressAction: {
                id: 'default',
              },
            },
          });
        });
      
        messaging().onNotificationOpenedApp(remoteMessage => {
          console.log('🔙 App opened from background:', remoteMessage);
        });
      
        messaging()
          .getInitialNotification()
          .then(remoteMessage => {
            if (remoteMessage) {
              console.log('🚀 App opened from quit state:', remoteMessage);
            }
          });
      
        return unsubscribeOnMessage;
      }, []);

    const handleInputChange = (field: keyof FormData, value: string) => {
      setFormData({ ...formData, [field]: value });
    };

    const handleLogin = async () => {
      try {
          const response = await fetch('/api/auth/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
          });
  
          const data = await response.json();
          console.log(data)
  
          if (response.ok) {
              // 🔐 บันทึก token และ userId
              if (data.token) {
                  await AsyncStorage.setItem('authToken', data.token);
                  await AsyncStorage.setItem('userId', JSON.stringify(data.userId));
              }
  
              // 🔥 ส่ง fcmToken ไปยัง backend หลัง login สำเร็จ
              if (fcmToken) {
                  await fetch('/api/user/save-fcm-token', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                          fcmToken: fcmToken,
                          source: 'after_login',
                          userId: data.userId // ส่ง userId ถ้าจำเป็น
                      }),
                  });
                  console.log('✅ FCM token sent after login');
              } else {
                  console.warn('⚠️ FCM token is null, cannot send');
              }
  
              Alert.alert('Success', 'เข้าสู่ระบบสำเร็จ!');
              navigation.navigate('Main', { screen: 'Home' });
          } else {
              const message = data.error || 'Something went wrong';
              Alert.alert('Error', message);
          }
      } catch (error) {
          console.error('❌ Login Error:', error);
          Alert.alert('Error', 'Unable to connect to the server');
      }
  };
    

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require('../assets/e.png')} style={styles.logo} />
            </View>

            <View style={styles.titleContainer}>
                <Text>
                    <Text style={[styles.title, styles.secureText]}> Secure </Text>
                    <Text style={[styles.title, styles.homeText]}> Home </Text>
                </Text>
            </View>

            <TextInput
                placeholder="กรอกอีเมล"
                style={styles.input}
                keyboardType="email-address"
                onChangeText={(text) => handleInputChange('email', text)}
            />
            <View style={styles.passwordContainer}>
                <TextInput
                    placeholder="กรอกรหัสผ่าน"
                    style={[styles.input, styles.passwordInput]}
                    secureTextEntry
                    onChangeText={(text) => handleInputChange('password', text)}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>เข้าสู่ระบบ</Text>
            </TouchableOpacity>

            <View style={styles.footerLinks}>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.footerLink}>ลงทะเบียน</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
                    <Text style={styles.footerLink}>ลืมรหัสผ่าน</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
};

export default LoginScreen;
