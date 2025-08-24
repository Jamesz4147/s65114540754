import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import styles from '../styles/Morestyles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MoreScreen = ({ navigation }: { navigation: any }) => {
    // ✅ สร้างตัวแปร state สำหรับเก็บค่าต่างๆ
    const [gasValue, setGasValue] = useState<number | null>(null);
    const [waterLeak, setWaterLeak] = useState<{ value: number, status: string, color: string }>({
        value: 0,
        status: "Normal",
        color: "green"
    });

    const [bmeData, setBmeData] = useState<{ temperature: number, humidity: number, air_quality: number }>({
        temperature: 0,
        humidity: 0,
        air_quality: 0
    });
    const [doorStatus, setDoorStatus] = useState('ปิด');


    // ✅ ฟังก์ชันดึงค่าจาก API
    const fetchGasData = async () => {
        try {
            const response = await fetch("/api/gas");
            const data = await response.json();
    
            console.log("📥 Debug: Received Gas Data:", data); // เพิ่ม Debug Log
    
            // ✅ เปลี่ยนจาก data.gas_ppm -> data.ppm
            setGasValue(data.ppm);
        } catch (error) {
            console.error("❌ Error fetching gas data:", error);
        }
    };

    const fetchWaterLeakData = async () => {
        try {
            const response = await fetch("/api/water_leak");
            const data = await response.json();

            console.log("📥 Debug: Received Water Leak Status:", data); // เช็คค่าที่ API ส่งมา

            setWaterLeak(data);
        } catch (error) {
            console.error("❌ Error fetching water leak data:", error);
        }
    };
    

    const fetchBmeData = async () => {
        try {
            const response = await fetch("/api/bme680");
            const data = await response.json();
            setBmeData(data);
        } catch (error) {
            console.error("❌ Error fetching BME680 data:", error);
        }
    };

    const fetchDoorStatus = async () => {
        try {
            const response = await fetch('/api/door_sensor'); // Replace with your API URL
            const data = await response.json();
            setDoorStatus(data.status === 'Door Opened' ? 'เปิด' : 'ปิด'); // Map 'Open' -> 'เปิด', 'Closed' -> 'ปิด'
        } catch (error) {
            console.error('Error fetching door status:', error);
        }
    };

    // ✅ ใช้ useEffect ให้ดึงค่าทุก 3 วินาที
    useEffect(() => {
        fetchGasData();
        fetchWaterLeakData();
        fetchBmeData();

        const interval = setInterval(() => {
            fetchGasData();
            fetchWaterLeakData();
            fetchBmeData();
        }, 2000);

        

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        fetchDoorStatus();  
        const interval = setInterval(fetchDoorStatus, 2000); // Poll every 5 seconds
        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    useEffect(() => {
        console.log("🔥 Debug: waterLeak.status changed ->", waterLeak.status);
    }, [waterLeak]);
    
    // ✅ ฟังก์ชันแปลงค่าความต้านทานของก๊าซเป็นข้อความและสี
    const getAirQualityText = () => {
        if (bmeData.air_quality > 200) return { text: "อากาศสะอาดมาก", color: "green" };
        if (bmeData.air_quality > 100) return { text : "อากาศดี", color: "blue" };
        if (bmeData.air_quality > 50) return { text: "VOCs ปานกลาง", color: "orange" };
        if (bmeData.air_quality > 10) return { text: "VOCs สูง", color: "red" };
        return { text: "อากาศไม่ดี (VOCs สูงมาก)", color: "darkred" };
    };
    // เรียกใช้ฟังก์ชัน getAirQualityText เพื่อรับค่า text และ color
    const airQualityStatus = getAirQualityText();



    const doorTextColor = doorStatus === 'เปิด' ? '#FF0000' : '#00C341'; 


    const getGasLevelStyle = (ppm: number | null | undefined) => {
        if (ppm === null || ppm === undefined) {
            return { color: "gray", text: "ไม่ได้เชื่อมต่อเซ็นเซอร์" }; 
        }
        if (ppm < 70) return { color: "#2ECC71", text: "ปลอดภัย 😊" };  // เขียว
        if (ppm < 300) return { color: "#3498DB", text: "เฝ้าระวัง 🔵" };  // ฟ้า
        if (ppm < 800) return { color: "#F1C40F", text: "ระวัง ⚠️" };  // เหลือง
        if (ppm < 1500) return { color: "#E67E22", text: "อันตราย ❗" };  // ส้ม
        return { color: "#E74C3C", text: "อันตรายมาก 🔥" };  // แดง
    };

    // ✅ ดึงค่าของระดับก๊าซ
    const gasStatus = getGasLevelStyle(gasValue !== null ? gasValue : 0);


    return (
        <ScrollView
            contentContainerStyle={{
                ...styles.container,
                flexGrow: 1,
                paddingBottom: 100,
            }}
            showsVerticalScrollIndicator={false}
        >
            {/* Header */}
            <View style={styles.header}>
                <Image source={require('../assets/e.png')} style={styles.logo} />
                <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
                    <View style={styles.iconCircle}>
                        <Icon name="account-circle" size={60} color="#2D5DEC" style={styles.profileIcon} />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.divider1} />

            {/* Content */}
            <View style={styles.grid}>

           {/* ✅ อุณหภูมิและความชื้น */}
                <View style={styles.cardWrapper}>
                    <Text style={styles.cardTitle}>อุณหภูมิและความชื้น</Text>
                    <View style={styles.divider} />
                    <TouchableOpacity style={styles.card}>
                        <Image source={require('../assets/tem.png')} style={styles.iconTemp} />
                        <Text style={styles.cardContent}>
                            อุณหภูมิ:
                            <Text style={styles.valueText}>
                                {bmeData.temperature !== undefined && bmeData.temperature !== null
                                    ? bmeData.temperature.toFixed(2)
                                    : "ไม่ได้เชื่อมต่อเซ็นเซอร์"}°C
                            </Text>
                        </Text>
                        <Image source={require('../assets/tem2.png')} style={styles.iconHumidity} />
                        <Text style={styles.cardContent}>
                            ความชื้น:
                            <Text style={styles.valueText}>
                                {bmeData.humidity !== undefined && bmeData.humidity !== null
                                    ? bmeData.humidity.toFixed(2)
                                    : "ไม่ได้เชื่อมต่อเซ็นเซอร์"}% RH
                            </Text>
                        </Text>
                    </TouchableOpacity>
                </View>


                {/* ✅ คุณภาพอากาศ */}
                <View style={styles.cardWrapper}>
                    <Text style={styles.cardTitle}>คุณภาพอากาศ</Text>
                    <View style={styles.divider} />
                    <TouchableOpacity style={styles.card}>
                        <Image source={require('../assets/air.png')} style={styles.icon} />
                        <Text style={styles.cardContent}>
                            ระดับสารระเหยอินทรีย์ในอากาศ:
                            {bmeData.air_quality !== undefined && bmeData.air_quality !== null
                                ? bmeData.air_quality.toFixed(2)
                                : "ไม่ได้เชื่อมต่อเซ็นเซอร์"} kΩ
                        </Text>
                        <Text style={[styles.cardSubContent, { color: airQualityStatus.color }]}>
                            {airQualityStatus.text}
                        </Text>
                    </TouchableOpacity>
                </View>


                {/* ✅ ค่าแก๊สหุงต้มในบ้าน */}
                <View style={styles.cardWrapper}>
                    <Text style={styles.cardTitle}>ค่าแก๊สหุงต้มในบ้าน</Text>
                    <View style={styles.divider} />
                    <TouchableOpacity style={styles.card}>
                        <Image source={require('../assets/gas.png')} style={styles.icon} />
                        <Text style={styles.cardContent}>
                            Gas:
                            {/* ใช้ Text ซ้อนเพื่อแยกสีของ gasValue และ ppm */}
                            <Text style={[styles.ppmText, { color: gasStatus.color }]}> {gasValue !== null ? gasValue : "กำลังโหลด..."}</Text>
                            <Text style={styles.ppmText}> ppm</Text>
                        </Text>
                        <Text style={[styles.alertText, { color: gasStatus.color }]}>{gasStatus.text}</Text>
                    </TouchableOpacity>
                </View>



                {/* ✅ สถานะของประตู */}
                <View style={styles.cardWrapper}>
                    <Text style={styles.cardTitle}>สถานะของประตู</Text>
                    <View style={styles.divider} />
                    <TouchableOpacity style={styles.card}>
                        <Image source={require('../assets/dor.png')} style={styles.icon} />
                        <Text style={[styles.doorcardContent, { color: doorTextColor }]}>
                            {doorStatus}
                        </Text>
                    </TouchableOpacity>
                </View>

    
                     {/* ✅ การรั่วซึมของน้ำ */}
                <View style={styles.cardWrapper}>
                    <Text style={styles.cardTitle}>การรั่วซึมของน้ำ</Text>
                    <View style={styles.divider} />
                    <TouchableOpacity style={styles.card}>
                        <Image source={require('../assets/water.png')} style={styles.icon} />
                        <Text style={[styles.cardContent, { color: waterLeak.color }]}>
                            {waterLeak.status?.toLowerCase().includes("leak detected")
                                ? "🚨 มีน้ำรั่ว : ●"
                                : "✅ ไม่มีน้ำรั่ว : ●"}
                        </Text>
                    </TouchableOpacity>
                </View>



            </View>
        </ScrollView>
    );
};

export default MoreScreen;
