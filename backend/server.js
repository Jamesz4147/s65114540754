const serviceAccount = require("./config/firebase-adminsdk.json"); // ✅ ชี้ไปที่โฟลเดอร์ config
const admin = require("./config/firebaseAdmin"); // ✅ เรียกใช้ Firebase Admin SDK
const { google } = require("googleapis");
const axios = require("axios");
const authenticateToken = require("./routes/authmiddleware"); // นำเข้า middleware

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/authRoutes");
const db = require("./config/dbConfig"); // เชื่อมต่อกับ dbConfig
require("dotenv").config(); // โหลดค่าจากไฟล์ .env
const mqtt = require("mqtt"); // ใช้ MQTT

const app = express();
const PORT = process.env.PORT || 8000;

// health check
app.get("/health", (req, res) => res.json({ ok: true }));

// 🟢 **ตั้งค่า MQTT Broker**
// เปลี่ยนค่าของ mqttBroker เป็น HiveMQ Cloud
const mqttBroker =
  "mqtts://481acd0efb2b45088968087f799015b1.s1.eu.hivemq.cloud"; // ใช้ mqtts สำหรับเชื่อมต่อ TLS
const mqttClient = mqtt.connect(mqttBroker, {
  username: "iot_user", // กำหนด username ที่ใช้สำหรับ HiveMQ Cloud
  password: "Zathreeont123", // กำหนด password ที่ใช้สำหรับ HiveMQ Cloud
});

// 🔹 **Topic ของเซ็นเซอร์ต่างๆ**
const gasTopic = "iot/gas"; // ก๊าซ
const waterLeakTopic = "iot/water_leak"; // การรั่วซึมของน้ำ
const bmeTopic = "bme680/data"; // BME680 (อุณหภูมิ, ความชื้น, คุณภาพอากาศ)
const doorSensorTopic = "home/door_sensor"; // 🚪 ประตูเซ็นเซอร์
const HAFTopic = "iot/HAF";
const alertTopic = "iot/alert";

// 🔴 **ตัวแปรเก็บค่าของเซ็นเซอร์**
let gasData = { gas_ppm: 0 };
let waterLeakStatus = { value: 0, status: "Normal", color: "green" };
let bmeData = { temperature: 0, humidity: 0, air_quality: 0 };
let doorStatus = { status: "Closed", timestamp: new Date() }; // 🚪 ค่าเซ็นเซอร์ประตู
let heartrateData = { hr: 0, spo2: 0 };
let latestData = null;

const saveToDatabase = () => {
  if (latestData) {
    // ตรวจสอบค่าก่อนที่จะบันทึก
    if (
      latestData.hr !== null &&
      latestData.hr !== undefined &&
      latestData.spo2 !== null &&
      latestData.spo2 !== undefined
    ) {
      // Query สำหรับ Insert
      const query = `INSERT INTO health_data (hr, spo2) VALUES ($1, $2)`;
      db.query(query, [latestData.hr, latestData.spo2], (err, result) => {
        if (err) {
          console.error("❌ Error saving data:", err.message);
        } else {
          console.log(
            `✅ Data saved: HR=${latestData.hr}, SpO2=${latestData.spo2}`
          );
        }
      });

      // เคลียร์ค่าในตัวแปรเพื่อรอข้อมูลใหม่
      latestData = null;
    } else {
      console.log("⚠️ No valid data received, skipping database insert.");
    }
  } else {
    console.log("⚠️ No data available to save.");
  }
};
// ตั้ง Scheduler ทุก 6 ชั่วโมง (21600000 ms)
setInterval(saveToDatabase, 21600000);

// ตั้ง Scheduler เพื่อลบข้อมูลที่เกิน 30 วัน
setInterval(() => {
  const query = `DELETE FROM health_data WHERE timestamp < NOW() - INTERVAL '30 days';`;
  db.query(query, (err, result) => {
    if (err) console.error("❌ Error deleting old data");
    else console.log(`🗑️ Deleted ${result.affectedRows} old records`);
  });
}, 86400000);

// ✅ **เมื่อเชื่อมต่อกับ MQTT Broker**
mqttClient.on("connect", () => {
  console.log("✅ Connected to MQTT Broker");

  mqttClient.subscribe(
    [gasTopic, waterLeakTopic, bmeTopic, doorSensorTopic, HAFTopic, alertTopic],
    (err) => {
      if (!err) {
        console.log(
          `📡 Subscribed to topics: ${gasTopic}, ${waterLeakTopic}, ${bmeTopic}, ${doorSensorTopic}`
        );
      }
    }
  );
});

//------------------------------------- ส่วนของ Water Sensor

let waterLeakCount = 0;
const leakThreshold = 2000; // กำหนดค่า Threshold
const leakConfirmTime = 10; // ตรวจจับต่อเนื่อง 10 วินาที

const key = require("./config/firebase-adminsdk.json");

const SCOPES = ["https://www.googleapis.com/auth/firebase.messaging"];
const TOKEN_URI = "https://oauth2.googleapis.com/token";

async function getAccessToken() {
  const jwtClient = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    SCOPES,
    null
  );
  const tokens = await jwtClient.authorize();
  return tokens.access_token;
}

async function notifyUsersInHost(host_id, payload) {
  try {
    // ดึง fcm_token ของผู้ใช้ทุกคนใน host
    const { rows: users } = await db.query(
      `
    SELECT fcm_token FROM host_users
    JOIN users ON host_users.user_id = users.id
    WHERE host_id = $1
  `,
      [host_id]
    );

    // ส่งการแจ้งเตือนไปยังผู้ใช้ทุกคนที่มี fcm_token
    for (const user of users) {
      if (user.fcm_token) {
        await sendPushNotification(user.fcm_token, payload); // ส่งการแจ้งเตือน
      }
    }
  } catch (err) {
    console.error("❌ Error sending notifications:", err);
  }
}

async function sendPushNotification(token, payload) {
  const accessToken = await getAccessToken();

  const messagePayload = {
    message: {
      token: token,
      notification: {
        title: payload.title || "📩 แจ้งเตือน",
        body: payload.body || "",
      },
      android: {
        notification: {
          channelId: "default",
          sound: "default",
        },
      },
      apns: {
        payload: {
          aps: {
            sound: "default",
          },
        },
      },
      data: {
        type: payload.type || "general",
      },
    },
  };

  try {
    await axios.post(
      `https://fcm.googleapis.com/v1/projects/${key.project_id}/messages:send`,
      messagePayload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("✅ Notification sent");
  } catch (error) {
    console.error(
      "❌ FCM Error Response:",
      error.response?.data || error.message
    );
    throw error;
  }
}
app.use(express.json());
app.post("/api/test-noti", async (req, res) => {
  const { fcmToken, title, body, type } = req.body;

  if (!fcmToken)
    return res.status(400).json({ error: "FCM token is required" });

  // ใช้ค่า default ถ้าไม่ได้ส่งมา
  const payload = {
    title: title || "🚨 แจ้งเตือน!",
    body: body || "นี่คือข้อความแจ้งเตือนทดสอบ",
    type: type || "test_alert",
  };

  try {
    await sendPushNotification(fcmToken, payload);
    res.json({ message: "✅ Notification sent successfully" });
  } catch (err) {
    console.error("❌ Notification error:", err.message);
    res.status(500).json({ error: "❌ Failed to send notification" });
  }
});

// ✅ **เมื่อได้รับค่าจาก MQTT**
mqttClient.on("message", async (topic, message) => {
  try {
    if (topic === gasTopic) {
      gasData = JSON.parse(message.toString());
      console.log("📥 Received Gas Data:", gasData);

      if (gasData.ppm > 70) {
        console.log("🔥 Gas level is high! Sending alert...");

        // payload สำหรับแจ้งเตือนแก๊สรั่ว
        const gasPayload = {
          title: "🔥 แก๊สรั่ว!",
          body: `ตรวจพบระดับแก๊ส ${gasData.ppm} ppm ซึ่งสูงเกินกว่าปลอดภัย`,
          type: "gas_alert",
        };

        // ส่งแจ้งเตือนไปยังผู้ใช้ใน host (ใส่ host_id ให้ถูกต้อง)
        // await notifyUsersInHost(1, gasPayload); // 👈 เปลี่ยน `1` เป็น host_id ที่ถูกต้องถ้าจำเป็น
        await sendPushNotification(
          "fTC1CJELT3C_Z5VIoDL3rC:APA91bE4cBC0C8tScOAL8cDmpDK7EIbjimpVQYE65dhqfGhid4B04GUrWhX5qlG8HuNY8UQ17mQKFS94VGHZosoD9Nk4v63pbkSvyvvmhi9yj64iHu8h_ro",
          gasPayload
        );
      }
    }

    if (topic === waterLeakTopic) {
      const sensorValue = parseInt(message.toString(), 10);
      console.log("📥 Received Water Sensor Value:", sensorValue);

      // ตรวจสอบว่าค่าต่ำกว่าที่กำหนดหรือไม่
      if (sensorValue < leakThreshold) {
        waterLeakCount++;
      } else {
        waterLeakCount = 0; // รีเซ็ตค่าเมื่อไม่มีน้ำรั่ว
      }

      // ถ้าค่าต่ำกว่าที่กำหนดติดต่อกัน 10 ครั้ง (ประมาณ 10 วินาที)
      if (waterLeakCount >= leakConfirmTime) {
        waterLeakStatus = {
          value: sensorValue,
          status: "🚨 Leak Detected! 🚨",
          color: "red",
        };
      } else {
        waterLeakStatus = {
          value: sensorValue,
          status: "✅ No Leak",
          color: "green",
        };
      }

      console.log("📡 Debug: API sending data ->", waterLeakStatus);
    }

    if (topic === bmeTopic) {
      bmeData = JSON.parse(message.toString());
      console.log("📥 Received BME680 Data:", bmeData);
    }

    if (topic === doorSensorTopic) {
      doorStatus = { status: message.toString(), timestamp: new Date() };
      console.log("📥 Received Door Sensor Data:", doorStatus);
    }

    if (topic === alertTopic) {
      sensorData = message.toString();
      console.log(sensorData);
      console.log("📡 Received data:", sensorData);

      // 🔴 Fall Detected Condition
      if (sensorData === "User has fallen!") {
        const fallPayload = {
          title: "🚨 ผู้ใช้ล้ม!",
          body: `ตรวจพบว่าผู้ใช้ล้ม กรุณาตรวจสอบทันที`,
          type: "fall_alert",
        };
        await sendPushNotification(
          "fTC1CJELT3C_Z5VIoDL3rC:APA91bE4cBC0C8tScOAL8cDmpDK7EIbjimpVQYE65dhqfGhid4B04GUrWhX5qlG8HuNY8UQ17mQKFS94VGHZosoD9Nk4v63pbkSvyvvmhi9yj64iHu8h_ro",
          fallPayload
        );
      }

      // 🔴 Alert Triggered Condition (Button Press or Manual Alert)
      if (sensorData === "Alert Triggered!") {
        const alertPayload = {
          title: "⚠️ แจ้งเตือนฉุกเฉิน!",
          body: `มีการกดปุ่มฉุกเฉิน โปรดตรวจสอบทันที`,
          type: "emergency_alert",
        };
        await sendPushNotification(
          "fTC1CJELT3C_Z5VIoDL3rC:APA91bE4cBC0C8tScOAL8cDmpDK7EIbjimpVQYE65dhqfGhid4B04GUrWhX5qlG8HuNY8UQ17mQKFS94VGHZosoD9Nk4v63pbkSvyvvmhi9yj64iHu8h_ro",
          alertPayload
        );
      }
    }
    if (topic === HAFTopic) {
      heartrateData = JSON.parse(message.toString());
      console.log(heartrateData);
      const hr = heartrateData.hr;
      const spo2 = heartrateData.spo2;

      latestData = {
        hr: parseFloat(heartrateData.hr),
        spo2: parseFloat(heartrateData.spo2),
      };

      console.log(`❤️ HR: ${hr} bpm`);
      console.log(`🩸 SpO2: ${spo2} %`);
    }
  } catch (error) {
    console.error("❌ Error parsing MQTT message:", error);
  }
});
app.get("/api/init-or-create-host/:user_id", async (req, res) => {
  const { user_id } = req.params;

  const { rows: userRows } = await db.query(
    "SELECT full_name FROM users WHERE id = $1 ",
    [user_id]
  );

  const userName =
    userRows.length > 0 ? userRows[0].full_name : `User ${user_id}`;

  try {
    // 1. ตรวจสอบว่าเป็น owner อยู่แล้วหรือไม่
    const { rows: ownerHost } = await db.query(
      "SELECT * FROM hosts WHERE owner_id = $1",
      [user_id]
    );

    if (ownerHost.length > 0) {
      return res.status(200).json({
        role: "owner",
        host_id: ownerHost[0].id,
        host_name: ownerHost[0].host_name,
        owner_id: ownerHost[0].owner_id,
      });
    }

    // 2. ตรวจสอบว่าเป็น member อยู่ใน host ไหนหรือไม่
    const { rows: memberHost } = await db.query(
      `
    SELECT h.id, h.host_name 
    FROM hosts h
    JOIN host_members hm ON h.id = hm.host_id
    WHERE hm.user_id = $1
  `,
      [user_id]
    );

    if (memberHost.length > 0) {
      return res.status(200).json({
        role: "member",
        host_id: memberHost[0].id,
        host_name: memberHost[0].host_name,
      });
    }

    // 3. ถ้าไม่ได้เป็น owner หรือ member → สร้าง host ใหม่ให้เลย
    const hostName = `Host ของคุณ (${userName})`;

    const { rows: created } = await db.query(
      "INSERT INTO hosts (host_name, owner_id) VALUES ($1, $2) RETURNING id",
      [hostName, user_id]
    );
    const newHostId = created[0].id;

    return res.status(201).json({
      role: "owner",
      host_id: newHostId,
      host_name: hostName,
      message: "สร้าง host ใหม่ให้คุณแล้ว",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "เกิดข้อผิดพลาด", error: err });
  }
});

app.post("/api/add-host-members", async (req, res) => {
  const { host_id, member_emails } = req.body;

  if (!host_id || !Array.isArray(member_emails)) {
    return res
      .status(400)
      .json({ message: "กรุณาระบุ host_id และอีเมลสมาชิก" });
  }

  try {
    const { rows: users } = await db.query(
      "SELECT id, email FROM users WHERE email = ANY($1)",
      [member_emails] // member_emails ต้องเป็น array
    );

    const foundEmails = users.map((u) => u.email);
    const notFound = member_emails.filter(
      (email) => !foundEmails.includes(email)
    );
    const userIds = users.map((u) => u.id);
    const values = userIds.map((uid) => [host_id, uid]);

    if (values.length > 0) {
      const insertQuery = `
  INSERT INTO host_members (host_id, user_id)
  VALUES ($1, $2)
  ON CONFLICT (host_id, user_id) DO NOTHING
`;
      for (const val of values) {
        await db.query(insertQuery, val);
      }
    }

    res.status(200).json({
      message: "เพิ่มสมาชิกสำเร็จ",
      added: foundEmails,
      not_found: notFound,
    });
  } catch (err) {
    res.status(500).json({ message: "เกิดข้อผิดพลาด", error: err });
  }
});

app.get("/api/host-members/:host_id", async (req, res) => {
  const { host_id } = req.params;

  try {
    const { rows: members } = await db.query(
      `SELECT u.id, u.full_name AS name, u.email, u.phone
   FROM host_members hm
   JOIN users u ON hm.user_id = u.id
   WHERE hm.host_id = $1`,
      [host_id]
    );

    res.status(200).json({ members });
  } catch (err) {
    res.status(500).json({ message: "เกิดข้อผิดพลาด", error: err });
  }
});

// ✅ **ตรวจสอบการเชื่อมต่อฐานข้อมูล**
const checkDatabaseConnection = async () => {
  try {
    await db.query("SELECT 1"); // Query ทดสอบเพื่อเช็คสถานะ
    console.log("📦 Connected to PostgreSQL database!");
  } catch (err) {
    console.error("❌ Unable to connect to the database:", err);
    process.exit(1); // หยุดเซิร์ฟเวอร์หากฐานข้อมูลล้มเหลว
  }
};
checkDatabaseConnection();

// ✅ **Middleware สำหรับ CORS และ JSON**
app.use(cors());
app.use(bodyParser.json());

// ✅ **Logging Middleware (แสดง Log Request)**
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ✅ **Routes สำหรับระบบ Login/Register**
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// ✅ **API ให้ Mobile App ดึงข้อมูลเซ็นเซอร์**
app.get("/api/gas", (req, res) => {
  res.json(gasData);
});

app.get("/api/heartrate", (req, res) => {
  res.json(heartrateData);
});

app.get("/api/water_leak", (req, res) => {
  res.json(waterLeakStatus);
});

app.get("/api/bme680", (req, res) => {
  res.json(bmeData);
});

app.get("/api/door_sensor", (req, res) => {
  res.json(doorStatus);
});

app.get("/api/history", async (req, res) => {
  const query = `
    SELECT hr, spo2, timestamp 
    FROM health_data 
    ORDER BY timestamp DESC 
    LIMIT 4
  `;

  try {
    // ใช้ async/await เพื่อรอผลลัพธ์จากฐานข้อมูล
    const { rows: results } = await db.query(query);
    if (results.length > 0) {
      res.status(200).json(results);
    } else {
      res.status(404).send("Data not found");
    }
  } catch (err) {
    console.error("❌ Error fetching data:", err.message);
    res.status(500).send("Server Error");
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// ✅ **404 Handler**
app.use((req, res, next) => {
  res.status(404).json({ error: "API endpoint not found" });
});

// ✅ **Global Error Handler**
app.use((err, req, res, next) => {
  console.error("🔥 Global Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});



// ✅ **Server Start**
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});