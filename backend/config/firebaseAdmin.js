const admin = require("firebase-admin");
const serviceAccount = require("../config/firebase-adminsdk.json"); // ✅ ใช้ไฟล์ที่ถูกต้อง

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
