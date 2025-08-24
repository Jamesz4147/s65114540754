import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color:'#545F71',

    },
    input: {
        borderWidth: 1,
        borderColor: '#2D2D2D',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
        marginTop: 100, // เพิ่มระยะห่างจากด้านบน
        fontSize: 16,
        width: 370,
        height: 60,
        paddingRight: 40, // ป้องกันไอคอนทับข้อความ
    },
    button: {
        backgroundColor: '#C9F2F6',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 100, // เพิ่มระยะห่างจากด้านบน
        borderColor: '#1C1919', // สีของเส้นขอบ
        borderWidth: 1, // ความหนาของเส้นขอบ
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#6E6969',
    },
    logoContainer: {
        position: 'absolute',
        top: 20, // ระยะห่างจากขอบบน
        right: 20, // ระยะห่างจากขอบขวา
        zIndex: 10, // ให้โลโก้อยู่ด้านบนสุด

    },
    logo: {
        width: 130,
        height: 130,
        alignSelf: 'center',
        marginBottom: 20,
        resizeMode: 'contain',
    },
    textContainer: {
        marginTop: -100, // เพิ่มระยะห่างจากโลโก้
        paddingHorizontal: 10,
    },
    title1: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        color: '#6b6b6b',
        marginBottom: 5,
    },
    backButton: {
        position: 'absolute',
        top: 70, // ระยะห่างจากด้านบน
        left: 20, // ระยะห่างจากด้านซ้าย
        zIndex: 10, // เพื่อให้แสดงอยู่ด้านบนสุด
    },
    textContainer2: {
        marginHorizontal: 0, // ระยะห่างซ้ายขวาของข้อความ
        marginBottom: 20, // ระยะห่างด้านล่างของข้อความ
        paddingLeft: 0, // ชิดขอบซ้ายสุด
    },
    title2: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'left', // จัดข้อความให้ชิดซ้าย
        color: '#2E2E2E',
        marginBottom: 10,

    },
    description2: {
        fontSize: 16,
        color: '#6b6b6b',
        textAlign: 'left', // จัดข้อความให้ชิดซ้าย
        lineHeight: 22, // เพิ่มระยะห่างระหว่างบรรทัด
    },
    resendButtonContainer2: {
        marginTop: 15, // ระยะห่างจากปุ่มด้านบน
        alignItems: 'center', // จัดให้อยู่ตรงกลาง
    },
    resendButtonText2: {
        fontSize: 16,
        color: '#2D5DEC', // สีของข้อความ
        textDecorationLine: 'underline', // ขีดเส้นใต้
        fontWeight: 'bold',
    },
    textContainer3: {
        alignItems: 'flex-start', // ชิดซ้าย
        paddingHorizontal: -10,
        marginBottom: -60,
        marginTop: -80, // เพิ่มระยะห่างจากโลโก้
    },
    title3: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2D5DEC',
        marginBottom: 8,
    },
    description3: {
        fontSize: 16,
        color: '#6c757d',
    },

    inputContainer3: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        paddingHorizontal: 1,
        marginBottom: -60,
        marginTop: 5, // เพิ่มระยะห่างจากโลโก้
        position: 'relative', // เพิ่มเพื่อให้ icon อยู่ใน input

    },
    iconContainer3: {
        padding: 10,
        position: 'static',
        right: 60, // จัดวางไอคอนให้ติดขอบขวาภายในอินพุต
        top:42, 
    },
    input3: {
        borderWidth: 1,
        borderColor: '#2D2D2D',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
        marginTop: -30, // เพิ่มระยะห่างจากด้านบน
        fontSize: 16,
        width: 370,
        height: 60,
    },
    input4: {
        borderWidth: 1,
        borderColor: '#2D2D2D',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
        marginTop: 50, // เพิ่มระยะห่างจากด้านบน
        fontSize: 16,
        width: 370,
        height: 60,
    },
});

export default styles;
