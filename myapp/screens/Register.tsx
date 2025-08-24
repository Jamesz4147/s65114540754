import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import styles from '../styles/Registerstyles';
import axios from 'axios'; // เพิ่ม axios
import { NavigationProp } from '@react-navigation/native';  // เพิ่มการนำเข้า NavigationProp
import { RootStackParamList } from '../types';  // ประเภทของการ navigations (จะพูดถึงด้านล่าง)

type RegisterScreenNavigationProp = NavigationProp<RootStackParamList, 'Register'>; // กำหนดประเภท navigation

type Props = {
    navigation: RegisterScreenNavigationProp; // กำหนด props สำหรับ navigation
};

const RegisterScreen = ({ navigation }: Props) => {
    const [formData, setFormData] = useState({
        full_name: '',
        birth_date: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (field: keyof typeof formData, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleRegister = async () => {
        if (formData.password !== formData.confirmPassword) {
            return Alert.alert('Error', 'Passwords do not match!');
        }
    
        try {
            const response = await axios.post('/api/auth/register', {
                full_name: formData.full_name,
                birth_date: formData.birth_date,
                phone: formData.phone,
                email: formData.email,
                password: formData.password,
            });
    
            // แสดงการแจ้งเตือนความสำเร็จ
            Alert.alert(
                'Success',
                response.data.message || 'ลงทะเบียนสำเร็จ!',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('Login'), // นำผู้ใช้ไปหน้า Login
                    },
                ]
            );
        } catch (error: any) {  // ใช้ `any` เพื่อจัดการกับ error ทุกกรณี
            const message = error.response?.data?.error || 'Something went wrong';
            Alert.alert('Error', message);
        }
    };
    

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={styles.backButton}>
                        <Text style={styles.backButtonIcon}>{'←'}</Text>
                    </View>
                </TouchableOpacity>
                <Image source={require('../assets/e.png')} style={styles.logo} />
            </View>
            <Text style={styles.title}>ลงทะเบียน</Text>
            <Text style={styles.subtitle}>
                กรอกรายละเอียดบัญชีของคุณด้านล่างหรือ{' '}
                <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
                    เข้าสู่ระบบ
                </Text>
            </Text>
            <TextInput
                placeholder="ชื่อ - นามสกุล"
                style={styles.input}
                onChangeText={(text) => handleInputChange('full_name', text)}
            />
            <TextInput
                placeholder="วันเกิด (YYYY-MM-DD)"
                style={styles.input}
                onChangeText={(text) => handleInputChange('birth_date', text)}
            />
            <TextInput
                placeholder="เบอร์โทรศัพท์"
                style={styles.input}
                keyboardType="phone-pad"
                onChangeText={(text) => handleInputChange('phone', text)}
            />
            <TextInput
                placeholder="อีเมล"
                style={styles.input}
                keyboardType="email-address"
                onChangeText={(text) => handleInputChange('email', text)}
            />
            <TextInput
                placeholder="รหัสผ่าน"
                style={styles.input}
                secureTextEntry
                onChangeText={(text) => handleInputChange('password', text)}
            />
            <TextInput
                placeholder="ยืนยันรหัสผ่าน"
                style={styles.input}
                secureTextEntry
                onChangeText={(text) => handleInputChange('confirmPassword', text)}
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>ลงทะเบียน</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default RegisterScreen;
