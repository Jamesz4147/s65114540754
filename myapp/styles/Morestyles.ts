import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
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
    divider1: {
        height: 20, // ความสูงของเส้น
        backgroundColor: '#F5F5F5', // สีของเส้น (เทาอ่อน)
        marginVertical: 10, // ระยะห่างด้านบนและล่าง
        width: '130%', // กว้างเต็มจอ
        alignSelf: 'center', // จัดเส้นให้อยู่กึ่งกลาง
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    cardWrapper: {
        width: '50%', // ความกว้างแต่ละคอลัมน์
        marginBottom: 20, // ระยะห่างระหว่างการ์ด
        alignItems: 'center', // จัดให้หัวข้อและการ์ดกึ่งกลาง
    },
    cardSubContent: {
        fontSize: 13,
        color: '#888',
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#D9F7F9', // พื้นหลังฟ้าอ่อน
        borderRadius: 30, // ขอบโค้ง
        borderWidth: 3, // ความหนาของขอบ (หน่วยเป็น px)
        borderColor: '#545454', // สีขอบ (ตัวอย่าง: สีฟ้า)
        padding: 16,
        marginBottom: 16,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
        alignSelf: 'center',
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 15, // เว้นระยะห่างก่อนเส้น divider
        textAlign: 'center',
    },
    divider: {
        height: 7, // ความหนาของเส้น
        backgroundColor: '#D9F7F9', // สีของเส้น
        width: '90%', // ความกว้างของเส้น
        marginBottom: 10, // ระยะห่างระหว่างเส้นกับไอคอน
        borderRadius: 5, // เพิ่มขอบโค้งมน
        shadowColor: '#000000', // สีเงา
        shadowOffset: { width: 0, height: 2 }, // ตำแหน่งเงา (x, y)
        shadowOpacity: 0.3, // ความโปร่งใสของเงา (0 - 1)
        shadowRadius: 4, // ความกระจายของเงา
        elevation: 4, // เงาสำหรับ Android
    },

    icon: {
        width: 55,
        height: 55,
        marginBottom: 10,
    },
    cardContent: {
        fontSize: 17,
        color: '#000000',
        textAlign: 'center',
    },
    gasValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#00C341', // สีข้อความค่าของแก๊ส (ปรับเป็นสีที่ต้องการ)
    },
    ppmText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000', // สีข้อความค่าของแก๊ส (ปรับเป็นสีที่ต้องการ)
    },

    valueText: {
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    iconTemp: {
        width: 30,
        height: 30,
        marginRight: 10,
        marginBottom: 5, // เพิ่มระยะห่างระหว่างรูปภาพกับข้อความ
    },
    iconHumidity: {
        width: 30,
        height: 30,
        marginRight: 10,
        marginTop: 6,
        marginBottom: 5,
    },
    doorcardContent: {
        fontSize: 20,
        textAlign: 'center',
    },
    alertText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
    },

});

export default styles;
