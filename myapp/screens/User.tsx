import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/Userstyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface User {
    id: string;
    full_name: string;
    email: string;
    birth_date: string; // วันเกิดในรูปแบบ ISO
}

const UserProfile = ({ navigation }: { navigation: any }) => {
    const [user, setUser] = useState<User | null>(null);
    const [formattedDate, setFormattedDate] = useState<string>('');
    const [age, setAge] = useState<number | null>(null);

    const fetchUser = async () => {
        try {
            const token = await AsyncStorage.getItem('authToken');
            if (token) {
                const response = await axios.get('/api/user/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const userData = response.data.user;
                setUser(userData);

                // คำนวณอายุและรูปแบบวันที่
                const birthDate = new Date(userData.birth_date);
                const today = new Date();
                const calculatedAge =
                    today.getFullYear() - birthDate.getFullYear() -
                    (today.getMonth() < birthDate.getMonth() ||
                    (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate()) ? 1 : 0);

                setAge(calculatedAge);

                const thaiDate = `${birthDate.getUTCDate()}/${birthDate.getUTCMonth() + 1}/${birthDate.getUTCFullYear() + 543}`;
                setFormattedDate(thaiDate);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    if (!user) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>กำลังโหลดข้อมูล...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Custom Header */}
            <View style={styles.customHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()}> 
                    <Icon name="arrow-back" size={24} color="#2D5DEC" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>หน้าโปรไฟล์</Text>
                <Image source={require('../assets/e.png')} style={styles.headerLogo} />
            </View>

            {/* ข้อมูลผู้ใช้ */}
            <View style={styles.header}>
                {/* วงกลมครอบไอคอน */}
                <View style={styles.iconCircle}>
                    <Icon name="account-circle" size={60} color="#2D5DEC" />
                </View>
                <Text style={styles.username}>{user.full_name}</Text>
            </View>


            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>ชื่อ-นามสกุล : {user.full_name}</Text>
                <Text style={styles.infoText}>อีเมล : {user.email}</Text>
                <Text style={styles.infoText}>อายุ : {age} ปี</Text>
                <Text style={styles.infoText}>วัน เดือน ปี : {formattedDate}</Text>
            </View>

            <View style={styles.divider} />

            {/* การตั้งค่าเพิ่มเติม */}
            <View style={styles.settingsContainer}>
                <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('Settings')}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="settings" size={24} color="#3A3A3A" />
                        <Text style={styles.settingText}>การตั้งค่าบัญชี</Text>
                    </View>
                    <Icon name="chevron-right" style={styles.arrowIcon} />
                </TouchableOpacity>

                {/* เส้นแบ่ง */}
                <View style={styles.divider1} />

                <TouchableOpacity 
            style={styles.settingItem} 
            onPress={() => { 
                navigation.navigate('HostScreen');  // ทำการนำทางไปยังหน้า Adduser
            }}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="notifications" size={24} color="#3A3A3A" />
                <Text style={styles.settingText}>เพิ่มบัญชีเพื่อรับแจ้งเตือน</Text>
            </View>
            <Icon name="chevron-right" style={styles.arrowIcon} />
        </TouchableOpacity>
            </View>

        </View>
    );
};

export default UserProfile;
