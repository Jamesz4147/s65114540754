import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

    container: {
        padding: 20,
        backgroundColor: '#fff',
        flexGrow: 1,
    },
    header: {
        flexDirection: 'row', // จัดวางในแนวนอน
        justifyContent: 'space-between', // ให้ช่องว่างระหว่างปุ่มย้อนกลับและโลโก้
        alignItems: 'center', // จัดให้อยู่ในแนวเดียวกัน
        marginBottom: 0,
    },
    backButton: {
        backgroundColor: '#F0F4FF', // สีพื้นหลังของวงกลม
        borderRadius: 30, // ทำให้เป็นวงกลม
        width: 50, // ความกว้างของวงกลม
        height: 50, // ความสูงของวงกลม (เท่ากับ width)
        justifyContent: 'center', // จัดไอคอนให้อยู่ตรงกลางในแนวตั้ง
        alignItems: 'center', // จัดไอคอนให้อยู่ตรงกลางในแนวนอน
        shadowColor: '#000', // เพิ่มเงา (ถ้าต้องการ)
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2, // สำหรับ Android (สร้างเงา)
    },
    backButtonIcon: {
        fontSize: 40, // ขนาดของไอคอนลูกศร
        color: '#2D5DEC', // สีของไอคอนลูกศร
    },
    logo: {
        width: 130,
        height: 130,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 33,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#000',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    loginLink: {
        color: '#2D5DEC',
        fontWeight: 'bold',
        textDecorationLine: 'underline', // เส้นขีดล่าง
    },
    input: {
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 8,
        padding: 10,
        marginBottom: 25,
        backgroundColor: '#FFFFFF',
        height: 55,
    },
    button: {
        backgroundColor: '#C9F2F6',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#000000',
    },
    buttonText: {
        color: '#1D3557',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default styles;
