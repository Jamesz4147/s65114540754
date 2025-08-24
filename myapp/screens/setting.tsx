import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    Login: undefined;
    EditUser: { userId: string }; // ใช้สำหรับส่ง userId ไปยัง EditUser
};

type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface SettingsProps {
    navigation: SettingsScreenNavigationProp;
}

const Settings: React.FC<SettingsProps> = ({ navigation }) => {
    const [userId, setUserId] = useState<string | null>(null); // เก็บ userId จาก AsyncStorage

    // ดึง userId จาก AsyncStorage เมื่อเริ่มหน้าจอ
    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem('userId'); // ดึง userId จาก AsyncStorage
                if (storedUserId) {
                    setUserId(storedUserId); // เก็บ userId ใน state
                }
            } catch (error) {
                console.error('Error fetching userId from AsyncStorage:', error);
            }
        };

        fetchUserId();
    }, []);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('authToken'); // ลบ token เมื่อออกจากระบบ
            navigation.replace('Login'); // นำทางไปยังหน้า Login
        } catch (error) {
            console.error('❌ Error logging out:', error);
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.customHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#2D5DEC" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>การตั้งค่า</Text>
                <Image source={require('../assets/e.png')} style={styles.headerLogo} />
            </View>

            <View style={styles.divider} />

            {/* Account Section */}
            <Text style={styles.sectionTitle}>บัญชี</Text>
            <View style={styles.section}>
                {/* คลิกเพื่อไปหน้าแก้ไขโปรไฟล์ */}
                <TouchableOpacity 
                    style={styles.item} 
                    onPress={() => {
                        if (userId) {
                            navigation.navigate('EditUser', { userId });  // ส่ง userId ไปที่ EditUser
                        }
                    }}
                >
                    <View style={styles.itemLeft}>
                        <Icon name="edit" size={24} color="#5F6368" />
                        <Text style={styles.itemText}>แก้ไขโปรไฟล์</Text>
                    </View>
                    <Icon name="arrow-forward-ios" size={18} color="#5F6368" />
                </TouchableOpacity>

                {/* คลิกเพื่อออกจากระบบ */}
                <TouchableOpacity style={styles.item} onPress={handleLogout}>
                    <View style={styles.itemLeft}>
                        <Icon name="logout" size={24} color="#D32F2F" />
                        <Text style={[styles.itemText, styles.logoutText]}>ออกจากระบบ</Text>
                    </View>
                    <Icon name="arrow-forward-ios" size={18} color="#5F6368" />
                </TouchableOpacity>
            </View>
            <View style={styles.divider1} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
    },
    customHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingBottom: 10,
    },
    headerTitle: {
        fontSize: 27,
        fontWeight: 'bold',
        color: '#333',
    },
    headerLogo: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
    },
    section: {
        borderColor: '#000000', // สีของกรอบ (สีฟ้า)
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#5F6368',
        marginBottom: 10,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 10,
    },
    logoutText: {
        color: '#D32F2F',
    },
    divider: {
        height: 20, // ความสูงของเส้น
        backgroundColor: '#F5F5F5', // สีของเส้น (เทาอ่อน)
        marginVertical: 10, // ระยะห่างด้านบนและล่าง
        width: '130%', // กว้างเต็มจอ
        alignSelf: 'center', // จัดเส้นให้อยู่กึ่งกลาง
    },
    divider1: {
        marginTop: 30, 
        height: 20, // ความสูงของเส้น
        backgroundColor: '#F5F5F5', // สีของเส้น (เทาอ่อน)
        marginVertical: 10, // ระยะห่างด้านบนและล่าง
        width: '130%', // กว้างเต็มจอ
        alignSelf: 'center', // จัดเส้นให้อยู่กึ่งกลาง
    },
});

export default Settings;
