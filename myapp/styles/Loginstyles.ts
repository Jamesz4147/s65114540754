import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flexGrow: 1
    },
    titleContainer: {
        backgroundColor: '#E0F7FA', // สีพื้นหลังของกรอบ
        borderRadius: 30, // มุมโค้งของกรอบ
        padding: 50, // ระยะห่างรอบข้อความ
        alignSelf: 'center', // จัดให้อยู่กลางหน้าจอ
        shadowColor: '#000', // เงาของกรอบ
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // เงาสำหรับ Android
        width: '108%', // กำหนดความกว้างเป็น 90% ของหน้าจอ
        alignItems: 'center', // จัดข้อความให้อยู่กึ่งกลางในแนวนอน
        marginBottom: 40,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        textShadowColor: '#000', // สีของเงา
        textShadowOffset: { width: 2, height: 2 }, // ตำแหน่งเงา
        textShadowRadius: 8, // ความเบลอของเงา
    },
    secureText: {
        color: '#5CE1E6', // สีของคำว่า "Secure"
    },
    homeText: {
        color: '#545454', // สีของคำว่า "Home"
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    backButton: {
        backgroundColor: '#F0F4FF',
        borderRadius: 30,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2
    },
    backButtonIcon: {
        fontSize: 24,
        color: '#2D5DEC'
    },
    logoContainer: {
         // ใช้พื้นที่เต็มหน้าจอ
        justifyContent: 'center', // จัดให้อยู่กลางในแนวตั้ง
        alignItems: 'center', // จัดให้อยู่กลางในแนวนอน
    },
    logo: {
        width: 130,
        height: 130,
        resizeMode: 'contain',
    },
    input: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 8,
        padding: 10,
        marginBottom: 50,
        backgroundColor: '#f9f9f9',
        width: 370,
        height: 60,
    },
    passwordContainer: {
        position: 'relative',
        marginBottom: 15,
    },
    passwordInput: {
        paddingRight: 40,
        marginBottom: 25,
    },
    eyeButton: {
        position: 'absolute',
        right: 10,
        top: 10
    },
    eyeIcon: {
        fontSize: 20,
        color: '#000'
    },
    button: {
        backgroundColor: '#C9F2F6', // สีพื้นหลังของปุ่ม
        borderWidth: 1, // ขอบปุ่ม
        borderColor: '#000', // สีของขอบ
        borderRadius: 10, // มุมโค้งของปุ่ม
        paddingVertical: 15, // ระยะห่างแนวตั้งของข้อความ
        paddingHorizontal: 30, // ระยะห่างแนวนอนของข้อความ
        alignItems: 'center', // จัดข้อความให้อยู่ตรงกลาง
        justifyContent: 'center', // จัดข้อความให้อยู่กึ่งกลางในแนวตั้ง
        shadowColor: '#000', // สีของเงา
        shadowOffset: { width: 0, height: 2 }, // ระยะห่างเงา
        shadowOpacity: 0.2, // ความโปร่งใสของเงา
        shadowRadius: 4, // ความเบลอของเงา
        elevation: 3, // เงาสำหรับ Android
        marginTop: 20, // ระยะห่างด้านบน
        width: 370,
        height: 60,// กำหนดความกว้างของปุ่ม
        alignSelf: 'center', // จัดให้อยู่กลางหน้าจอ
    },
    buttonText: {
        color: '#545454', // สีข้อความ
        fontWeight: 'bold', // ตัวหนา
        fontSize: 18, // ขนาดข้อความ
    },
    footerLinks: {
        marginTop: 30, // ระยะห่างจากปุ่มด้านบน
        alignItems: 'center', // จัดให้อยู่ตรงกลางในแนวนอน
    },
    footerLink: {
        color: '#000', // สีข้อความ
        fontWeight: 'bold', // ตัวหนา
        fontSize: 16, // ขนาดข้อความ
        marginBottom: 10, // ระยะห่างระหว่างลิงก์
        textDecorationLine: 'underline', // ขีดเส้นใต้ข้อความ
    },
});
export default styles;