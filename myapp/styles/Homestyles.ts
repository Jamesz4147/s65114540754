import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#FFFFFF',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    logo: {
        width: 130,
        height: 130,
    },
    // วงกลมสำหรับครอบไอคอน
    iconCircle: {
        width: 70, // กำหนดความกว้างและความสูงเท่ากัน
        height: 70,
        borderRadius: 40, // ค่าครึ่งหนึ่งของ width/height เพื่อให้เป็นวงกลม
        backgroundColor: '#EAF0FE', // สีพื้นหลัง (สีฟ้าอ่อน)
        alignItems: 'center', // จัดให้อยู่กลางในแนวนอน
        justifyContent: 'center', // จัดให้อยู่กลางในแนวตั้ง
        marginTop: -10,
    },
    profileIcon: {
        // ไอคอนจะถูกจัดอยู่ตรงกลางโดยอัตโนมัติในวงกลม
    },
    head: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333',
        marginRight: 5,
        marginTop: -30,
    },
    sunIcon: {
        width: 60,
        height: 60,
        marginTop: -30,
    },
    card: {
        backgroundColor: '#FFD1C2',
        borderRadius: 20,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        width: 250,
        height: 200,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
        borderWidth: 1,
        borderColor: '#000',
        marginBottom: 25,
    },
    heartRateContainer: {
        alignItems: 'center',
    },
    heartIcon: {
        width: 70,
        height: 70,
        marginBottom: 5,
        tintColor: '#F82828',
    },
    heartRateText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    oxygenText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    valueText: {
        fontWeight: 'bold',
        color: '#2ECC71',
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000000',
        textShadowColor: '#', // สีของเงา
        textShadowOffset: { width: 1, height: 4 }, // ตำแหน่งของเงา
        textShadowRadius: 10, // ระดับความเบลอของเงา
    },
    sectionIcon: {
        width: 60,
        height: 60,
        tintColor: '#61D9E6',
    },
    divider: {
        height: 20, // ความสูงของเส้น
        backgroundColor: '#F5F5F5', // สีของเส้น (เทาอ่อน)
        marginVertical: 10, // ระยะห่างด้านบนและล่าง
        width: '130%', // กว้างเต็มจอ
        alignSelf: 'center', // จัดเส้นให้อยู่กึ่งกลาง
    },

    textheart: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    },
    divider1: {
        height: 6,
        backgroundColor: '#F82828',
        marginVertical: 10,
        width: '56%',
        alignSelf: 'center',
        borderRadius: 6,
    },
     // Container หลักของตาราง
     historyContainer1: {
        backgroundColor: '#C9F2F6', // สีพื้นหลังฟ้าอ่อน
        borderRadius: 10, // ขอบมุมโค้งมน
        padding: 16, // ระยะห่างภายใน
        shadowColor: '#000', // สีของเงา
        shadowOpacity: 0.1, // ความเข้มของเงา
        shadowRadius: 4, // ระยะเบลอของเงา
        elevation: 4, // เงาสำหรับ Android
        width: '105%', // กำหนดความกว้างเป็น 90% ของหน้าจอ
        alignSelf: 'center', // จัดให้อยู่ตรงกลางในแนวนอน
        marginTop: 20, // ระยะห่างด้านบน
    },
    // Container ของตารางที่อยู่ภายใน
    historyContainer: {
        backgroundColor: '#FFFFFF', // สีพื้นหลังขาว
        borderRadius: 8, // ขอบมุมโค้งมน
        padding: 16, // ระยะห่างภายใน
        borderWidth: 1, // ขอบความหนา 1
        borderColor: '#000', // สีขอบดำ
    },
    // Header ของตาราง (ส่วนหัวคอลัมน์)
    historyHeader: {
        flexDirection: 'row', // จัดให้อยู่ในแนวนอน
        justifyContent: 'space-between', // กระจายพื้นที่ระหว่างคอลัมน์
        backgroundColor: '#61D9E6', // สีพื้นหลังหัวตาราง
        borderRadius: 8, // ขอบมุมโค้งมน
        paddingVertical: 10, // ระยะห่างบน-ล่าง
        paddingHorizontal: 5, // ระยะห่างซ้าย-ขวา
        marginBottom: 8, // ระยะห่างด้านล่างจากส่วนเนื้อหา
    },
    // แต่ละเซลล์ใน Header
    headerCell: {
        flex: 1, // ใช้พื้นที่เท่ากันในแต่ละคอลัมน์
        alignItems: 'center', // จัดข้อความให้อยู่กลางในแนวนอน
        justifyContent: 'center', // จัดข้อความให้อยู่กลางในแนวตั้ง
        paddingHorizontal: 5, // ระยะห่างภายในเซลล์
    },
    // ข้อความใน Header
    historyHeaderText: {
        fontWeight: 'bold', // ตัวหนา
        fontSize: 14, // ขนาดตัวอักษร
        color: '#000', // สีดำ
        textAlign: 'center', // จัดให้อยู่ตรงกลาง
    },
    // แต่ละแถวของตาราง (Body)
    historyRow: {
        flexDirection: 'row', // จัดให้อยู่ในแนวนอน
        justifyContent: 'space-between', // กระจายพื้นที่ระหว่างคอลัมน์
        borderBottomWidth: 1, // เส้นแบ่งด้านล่างแต่ละแถว
        borderBottomColor: '#D3D3D3', // สีของเส้นแบ่ง
        paddingVertical: 8, // ระยะห่างบน-ล่างในแต่ละแถว
    },
    // แต่ละเซลล์ในแถว
    rowCell: {
        flex: 1, // ใช้พื้นที่เท่ากันในแต่ละคอลัมน์
        alignItems: 'center', // จัดข้อความให้อยู่กลางในแนวนอน
        justifyContent: 'center', // จัดข้อความให้อยู่กลางในแนวตั้ง
        paddingHorizontal: 5, // ระยะห่างภายในเซลล์
    },
    // ข้อความในแต่ละเซลล์ (Body)
    historyText: {
        fontSize: 14, // ขนาดตัวอักษร
        color: '#555', // สีเทา
        textAlign: 'center', // จัดให้อยู่ตรงกลาง
    },
    historyTable: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#7DD1E4',
        borderRadius: 8,
        overflow: 'hidden',
      },
});

export default styles;
