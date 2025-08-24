import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';

async function setupNotificationChannel() {
    if (Platform.OS === 'android') {
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
        sound: 'default',
      });
    }
  }
  setupNotificationChannel();
  
  // ✅ รับ Notification ตอนแอป background/ปิด และแสดง noti bar
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('📬 Message handled in the background!', remoteMessage);
  
    // ✅ แสดง Notification จาก background
    await notifee.displayNotification({
      title: remoteMessage.notification?.title ?? '📩 แจ้งเตือน',
      body: remoteMessage.notification?.body ?? '',
      android: {
        channelId: 'default',
        smallIcon: 'ic_launcher',
        importance: AndroidImportance.HIGH,
        pressAction: {
          id: 'default',
        },
      },
    });
  });
  
  // ✅ จัดการตอนผู้ใช้กด Notification
  notifee.onBackgroundEvent(async ({ type, detail }) => {
    console.log('📥 Background Notifee Event:', type, detail);
  
    if (type === EventType.PRESS) {
      console.log('🔔 Notification Pressed:', detail.notification?.title);
      // 👉 คุณสามารถใช้ AsyncStorage หรือ navigation flag เพื่อไปยังหน้าที่เกี่ยวข้อง
    }
  });

AppRegistry.registerComponent(appName, () => App);
