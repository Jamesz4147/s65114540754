import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from "axios";
import styles from '../styles/EditUserStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditUser = () => {
    const navigation = useNavigation();
    const [userId, setUserId] = useState<string | null>(null); // เก็บ userId
    const [userData, setUserData] = useState({
        full_name: "",
        birth_date: "",
        phone: "",
        email: "",
        password: "",
        confirm_password: ""
    });

    const [secureText, setSecureText] = useState(true);
    const [confirmSecureText, setConfirmSecureText] = useState(true);

    // ดึง userId จาก AsyncStorage
    useEffect(() => {
        const getUserId = async () => {
            try {
                const storedUserId = await AsyncStorage.getItem('userId');
                if (storedUserId) {
                    setUserId(storedUserId); // แปลง string -> number หรือ string
                }
            } catch (error) {
                console.error("Error fetching userId from AsyncStorage:", error);
            }
        };
        getUserId();
    }, []);

    // ดึงข้อมูลผู้ใช้จาก API
    useEffect(() => {
        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    const fetchUserData = async () => {
        try {
            const authToken = await AsyncStorage.getItem('authToken');
            const response = await axios.get('/api/user/me', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            const user = response.data.user;
            setUserData({
                full_name: user.full_name || "",
                birth_date: user.birth_date ? new Date(user.birth_date).toISOString().split("T")[0] : "",
                phone: user.phone || "",
                email: user.email || "",
                password: "",
                confirm_password: ""
            });

        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    // ฟังก์ชันจัดการการเปลี่ยนแปลงของข้อมูลผู้ใช้
    const handleChange = (name: string, value: string) => {
        setUserData({ ...userData, [name]: value });
    };

    // ฟังก์ชันสำหรับอัปเดตข้อมูลผู้ใช้
    const handleUpdate = async () => {
        if (userData.password !== userData.confirm_password) {
            Alert.alert("รหัสผ่านไม่ตรงกัน");
            return;
        }

        try {
            const authToken = await AsyncStorage.getItem('authToken');

            const payload = {
                ...userData,
                birth_date: userData.birth_date ? new Date(userData.birth_date).toISOString() : "",
            };

            const response = await axios.put(`/api/user/me`, payload, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            Alert.alert("User updated successfully!");
            navigation.goBack();
        } catch (error) {
            console.error("Error updating user:", error);
            Alert.alert("Failed to update user information.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.customHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color="#2D5DEC" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>แก้ไขโปรไฟล์</Text>
                <Image source={require('../assets/e.png')} style={styles.headerLogo} />
            </View>

            <View style={styles.profileSection}>
                <Image source={require("../assets/profile-placeholder.png")} style={styles.profileImage} />
                <Text style={styles.profileLabel}>โปรไฟล์ของคุณ</Text>
            </View>

            <TextInput
                style={styles.input}
                value={userData.full_name}
                onChangeText={(text) => handleChange("full_name", text)}
            />
            <TextInput
                style={styles.input}
                value={userData.birth_date}
                onChangeText={(text) => handleChange("birth_date", text)}
            />
            <TextInput
                style={styles.input}
                value={userData.phone}
                keyboardType="phone-pad"
                onChangeText={(text) => handleChange("phone", text)}
            />
            <TextInput
                style={styles.input}
                value={userData.email}
                keyboardType="email-address"
                onChangeText={(text) => handleChange("email", text)}
            />

            <View style={styles.passwordContainer}>
                <TextInput style={styles.passwordInput} placeholder="รหัสผ่าน" secureTextEntry={secureText} value={userData.password} onChangeText={(text) => handleChange("password", text)} />
                <TouchableOpacity onPress={() => setSecureText(!secureText)}></TouchableOpacity>
            </View>

            <View style={styles.passwordContainer}>
                <TextInput style={styles.passwordInput} placeholder="ยืนยันรหัสผ่าน" secureTextEntry={confirmSecureText} value={userData.confirm_password} onChangeText={(text) => handleChange("confirm_password", text)} />
                <TouchableOpacity onPress={() => setConfirmSecureText(!confirmSecureText)}></TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                <Text style={styles.buttonText}>บันทึก</Text>
            </TouchableOpacity>
        </View>
    );
};

export default EditUser;
