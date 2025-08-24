import React from 'react'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text } from 'react-native';
import HomeScreen from '../screens/Home';
import MoreScreen from '../screens/More';
import styles from '../styles/NavbarStyles';
const Tab = createBottomTabNavigator();

const Navbar = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          const icons: Record<string, string> = {
            Home: 'home', // ไอคอนสำหรับหน้าหลัก
            More: 'menu', // ไอคอนสำหรับเพิ่มเติม
          };

          const iconName = icons[route.name];

          if (!iconName) {
            console.warn(`⚠️ Icon not found for route: ${route.name}`);
            return null;
          }

          // ดีไซน์วงกลมพื้นหลังสำหรับไอคอน
          return (
            <View
              style={[
                styles.iconCircle,
                focused && styles.iconCircleActive, // เพิ่มสีพื้นหลังเมื่อ active
              ]}
            >
              <Icon
                name={iconName}
                size={focused ? size + 5 : size} // ขยายไอคอนเมื่อ active
                color={focused ? '#113BD4' : '#5f6368'}
              />
            </View>
          );
        },
        tabBarLabel: ({ focused }) => (
          <Text
            style={[
              styles.tabLabel,
              focused && styles.tabLabelActive, // เปลี่ยนสีข้อความเมื่อ active
            ]}
          >
            {route.name === 'Home' ? 'หน้าหลัก' : 'เพิ่มเติม'}
          </Text>
        ),
        tabBarStyle: {
          height: 70, // ความสูงของ Navbar
          backgroundColor: '#F8F8F8', // สีพื้นหลังของ Navbar
          borderTopLeftRadius: 20, // มุมโค้งด้านบนซ้าย
          borderTopRightRadius: 20, // มุมโค้งด้านบนขวา
          position: 'absolute', // วาง Navbar ให้ลอยอยู่
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          paddingTop: 10, // เพิ่มระยะด้านบนของ Navbar
          paddingBottom: 15, // เพิ่มระยะด้านล่างของ Navbar
        },
        headerShown: false, // ซ่อน Header ด้านบน
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
};

export default Navbar;
