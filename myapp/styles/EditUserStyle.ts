import { StyleSheet } from "react-native";

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
    backButton: {
        position: "absolute",
        top: 50,
        left: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
        color: "#444", // สีเทาเข้ม
    },
    profileSection: {
        alignItems: "center",
        marginBottom: 20,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#E0E0E0",
        justifyContent: "center",
        alignItems: "center",
    },
    profileLabel: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
    },
    input: {
        width: "100%",
        padding: 12,
        borderWidth: 1,
        borderColor: "#61D9E6", // สีม่วง
        borderRadius: 10,
        backgroundColor: "#fff",
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },
    datePickerContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#61D9E6",
        borderRadius: 10,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },
    datePickerIcon: {
        marginLeft: 10,
    },
    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#61D9E6",
        borderRadius: 10,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },
    passwordInput: {
        flex: 1,
        padding: 12,
    },
    eyeIcon: {
        marginLeft: 10,
    },
    button: {
        backgroundColor: "#ECFBFC",
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: "#000",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default styles;