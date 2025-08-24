import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import styles from '../styles/ResetPasswordStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const ResetPasswordScreen = ({ navigation }: { navigation: any }) => {
    const [email, setEmail] = useState('');
    const [pin, setPin] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [step, setStep] = useState(1); // Step tracker
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);


    const handleEmailSubmit = async () => {
        try {
            const response = await fetch('/api/auth/request-reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert('สำเร็จ', 'รหัส PIN ถูกส่งไปยังอีเมลของคุณแล้ว!');
                setStep(2);
            } else {
                Alert.alert('ข้อผิดพลาด', data.error || 'ไม่สามารถส่ง PIN ได้');
            }
        } catch (error) {
            Alert.alert('ข้อผิดพลาด', 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
        }
    };

    const handlePinSubmit = async () => {
        if (pin.length !== 6) {
            Alert.alert('ข้อผิดพลาด', 'กรุณากรอกรหัส PIN ให้ถูกต้อง (6 หลัก)');
            return;
        }

        try {
            const response = await fetch('/api/auth/verify-pin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, pin }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert('สำเร็จ', 'รหัส PIN ถูกต้อง');
                setStep(3);
            } else {
                Alert.alert('ข้อผิดพลาด', data.error || 'รหัส PIN ไม่ถูกต้อง');
            }
        } catch (error) {
            Alert.alert('ข้อผิดพลาด', 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
        }
    };

    const handlePasswordSubmit = async () => {
        if (newPassword !== confirmPassword) {
            Alert.alert('ข้อผิดพลาด', 'รหัสผ่านใหม่และการยืนยันรหัสผ่านไม่ตรงกัน');
            return;
        }

        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, pin, newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert('สำเร็จ', 'รีเซ็ตรหัสผ่านสำเร็จแล้ว!');
                navigation.navigate('Login');
            } else {
                Alert.alert('ข้อผิดพลาด', data.error || 'การรีเซ็ตรหัสผ่านล้มเหลว');
            }
        } catch (error) {
            Alert.alert('ข้อผิดพลาด', 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
        }
    };

    const handleResendPin = async () => {
        try {
            const response = await fetch('/api/auth/request-reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert('สำเร็จ', 'รหัส PIN ใหม่ถูกส่งไปยังอีเมลของคุณแล้ว!');
            } else {
                Alert.alert('ข้อผิดพลาด', data.error || 'ไม่สามารถส่ง PIN ใหม่ได้');
            }
        } catch (error) {
            Alert.alert('ข้อผิดพลาด', 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
        }
    };


    return (
        <View style={styles.container}>
            {step === 1 && (
                <>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <MaterialIcons name="arrow-back" size={25} color="#2D5DEC" />
                    </TouchableOpacity>

                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../assets/e.png')}
                            style={styles.logo}
                        />
                    </View>

                    <View style={styles.textContainer}>
                        <Text style={styles.title1}>ลืมรหัสผ่าน</Text>
                        <Text style={styles.description}>
                            โปรดกรอกอีเมลที่ลงทะเบียนไว้เพื่อรับรหัสผ่าน
                        </Text>
                        <Text style={styles.description}>
                            ระบบจะส่งรหัส PIN 6 หลักไปยังอีเมลที่ท่านลงทะเบียน
                        </Text>
                    </View>
                    <TextInput
                        placeholder="กรอกอีเมล"
                        style={styles.input}
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleEmailSubmit}>
                        <Text style={styles.buttonText}>ยืนยัน</Text>
                    </TouchableOpacity>
                </>
            )}
            {step === 2 && (
                <>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <MaterialIcons name="arrow-back" size={28} color="#2D5DEC" />
                    </TouchableOpacity>

                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../assets/e.png')}
                            style={styles.logo}
                        />
                    </View>

                    <View style={styles.textContainer2}>
                        <Text style={styles.title2}>ตรวจสอบอีเมลของคุณ</Text>
                        <Text style={styles.description2}>
                            กรอกรหัส PIN 6 หลักที่ส่งไปยังอีเมลของคุณ
                        </Text>
                    </View>

                    <TextInput
                        placeholder="กรอกรหัส PIN 6 หลัก"
                        style={styles.input}
                        keyboardType="numeric"
                        maxLength={6}
                        value={pin}
                        onChangeText={setPin}
                    />

                    <TouchableOpacity style={styles.button} onPress={handlePinSubmit}>
                        <Text style={styles.buttonText}>ยืนยัน</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.resendButtonContainer2}
                        onPress={handleResendPin}
                    >
                        <Text style={styles.resendButtonText2}>รับรหัสอีกครั้ง</Text>
                    </TouchableOpacity>
                </>
            )}

            {step === 3 && (
                <>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <MaterialIcons name="arrow-back" size={28} color="#2D5DEC" />
                    </TouchableOpacity>

                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../assets/e.png')}
                            style={styles.logo}
                        />
                    </View>

                    <View style={styles.textContainer3}>
                        <Text style={styles.title3}>ตั้งค่ารหัสผ่านใหม่</Text>
                        <Text style={styles.description3}>
                            กรุณากำหนดรหัสผ่านใหม่ที่ต้องการ
                        </Text>
                    </View>

                    {/* รหัสผ่านใหม่ */}
                    <View style={styles.inputContainer3}>
                        <TextInput
                            placeholder="รหัสผ่านใหม่"
                            style={styles.input}
                            secureTextEntry={isPasswordHidden}
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />

                        <TouchableOpacity
                            style={styles.iconContainer3}
                            onPress={() => setIsPasswordHidden(!isPasswordHidden)}
                        >
                            <MaterialIcons name={isPasswordHidden ? 'visibility-off' : 'visibility'} size={24} color="#888" />
                        </TouchableOpacity>
                    </View>

                    {/* ยืนยันรหัสผ่านใหม่ */}
                    <View style={styles.inputContainer3}>
                        <TextInput
                            placeholder="ยืนยันรหัสผ่านอีกครั้ง"
                            style={styles.input}
                            secureTextEntry={isConfirmPasswordHidden}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />

                        <TouchableOpacity
                            style={styles.iconContainer3}
                            onPress={() => setIsConfirmPasswordHidden(!isConfirmPasswordHidden)}
                        >
                            <MaterialIcons name={isConfirmPasswordHidden ? 'visibility-off' : 'visibility'} size={24} color="#6c757d" />
                        </TouchableOpacity>
                    </View>
                    {/* 🔹 ปุ่มยืนยัน */}
                    <TouchableOpacity style={styles.button} onPress={handlePasswordSubmit}>
                        <Text style={styles.buttonText}>ยืนยัน</Text>
                    </TouchableOpacity>

                </>
            )}


        </View>
    );
};

export default ResetPasswordScreen;
