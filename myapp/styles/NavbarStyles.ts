import { StyleSheet } from 'react-native';

const NavbarStyles = StyleSheet.create({
    // วงกลมพื้นหลังของไอคอน
    iconCircle: {
        width: 70,
        height: 35,
        borderRadius: 50, // ทำให้เป็นวงกลม
        backgroundColor: '#EEF2FE', // พื้นหลังสีฟ้าอ่อน
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconCircleActive: {
        backgroundColor: '#EAF0FE', // เปลี่ยนสีพื้นหลังเมื่อ active
    },
    tabLabel: {
        fontSize: 12,
        color: '#5f6368', // สีข้อความเมื่อ inactive
        marginTop: 5,
    },
    tabLabelActive: {
        color: '#113BD4', // สีข้อความเมื่อ active
        fontWeight: 'bold',
    },

});

export default NavbarStyles;
