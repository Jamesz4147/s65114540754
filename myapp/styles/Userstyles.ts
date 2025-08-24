import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF', // สีพื้นหลังของหน้าจอ
        padding: 20,
    },
    customHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 1,
        paddingVertical: 1,
        borderBottomWidth: 0, // ซ่อนขอบล่าง
        elevation: 0, // Android
        shadowOpacity: 0, // iOS
        marginTop: 1,
    },

    headerTitle: {
        fontSize: 27,
        fontWeight: 'bold',
        color: '#000000',
    },
    headerLogo: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
    },
    iconCircle: {
        width: 70, // ความกว้างของวงกลม
        height: 70, // ความสูงของวงกลม (เท่ากับความกว้าง)
        borderRadius: 40, // ครึ่งหนึ่งของ width/height เพื่อสร้างวงกลม
        backgroundColor: '#EAF0FE', // สีพื้นหลังของวงกลม
        alignItems: 'center', // จัดไอคอนไว้ตรงกลางแนวนอน
        justifyContent: 'center', // จัดไอคอนไว้ตรงกลางแนวตั้ง
        marginBottom: 10, // ระยะห่างด้านล่างของวงกลม
        marginTop: -25,
    },
    header: {
        alignItems: 'center',
        marginBottom: 50,
    },
    username: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000000',
        marginTop: -11,
    },
    infoContainer: {
        borderColor: '#61D9E6', // สีของกรอบ (สีฟ้า)
        borderWidth: 1,
        backgroundColor: '#ECFBFC', // สีพื้นหลังของกล่องข้อมูล
        borderRadius: 10,
        padding: 20,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 4, // เงา (สำหรับ Android)
        marginTop: -30,
    },
    infoText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10,
    },
    settingsContainer: {
        backgroundColor: '#FFFFFF', // สีพื้นหลังของการตั้งค่า
        borderRadius: 10, // มุมโค้ง
        paddingVertical: 10, // ระยะห่างแนวตั้ง
        paddingHorizontal: 15, // ระยะห่างแนวนอน
        shadowColor: '#000', // เงา
        shadowOpacity: 0.1, // ความทึบของเงา
        shadowRadius: 5, // ขนาดของเงา
        shadowOffset: { width: 0, height: 2 }, // ระยะเงา
        elevation: 4, // เงา (สำหรับ Android)
        marginTop: 30, // ระยะห่างด้านบน
        borderWidth: 1, // เส้นกรอบบางๆ
        borderColor: '#DDE2E5', // สีกรอบอ่อนๆ
    },
    settingItem: {
        flexDirection: 'row', // จัดไอคอนและข้อความแนวนอน
        alignItems: 'center', // จัดให้อยู่ตรงกลาง
        justifyContent: 'space-between', // ไอคอนลูกศรอยู่ชิดขวา
        paddingVertical: 10, // ระยะห่างแนวตั้งในแต่ละรายการ
        paddingHorizontal: 10, // ระยะห่างแนวนอนในแต่ละรายการ
    },
    settingText: {
        flex: 1, // กำหนดให้ข้อความยืดเต็มพื้นที่ที่เหลือ
        fontSize: 16, // ขนาดตัวอักษร
        color: '#3A3A3A', // สีข้อความ
        fontWeight: '500', // น้ำหนักตัวอักษร
    },
    divider1: {
        height: 1, // ความหนาของเส้น
        backgroundColor: '#DDE2E5', // สีเส้น
        marginHorizontal: 10, // ระยะห่างแนวนอนของเส้น
    },
    arrowIcon: {
        color: '#909090', // สีของลูกศร
        fontSize: 20, // ขนาดของลูกศร
    },
    loadingText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#999',
    },
    divider: {
        height: 20, // ความสูงของเส้น
        backgroundColor: '#F5F5F5', // สีของเส้น (เทาอ่อน)
        marginVertical: 10, // ระยะห่างด้านบนและล่าง
        width: '130%', // กว้างเต็มจอ
        alignSelf: 'center', // จัดเส้นให้อยู่กึ่งกลาง
    },

});

export default styles;
