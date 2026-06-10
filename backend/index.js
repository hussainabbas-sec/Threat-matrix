const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const csv = require("csv-parser");

const app = express();
app.use(cors());
app.use(express.json());

let logs = [];

// ============================
// FILE UPLOAD
// ============================
const upload = multer({ dest: "uploads/" });

app.post("/api/upload", upload.single("file"), (req, res) => {
  logs = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (row) => {
      logs.push({
        ip: row["Source"] || row["ip"] || "unknown",
        protocol: row["Protocol"] || "unknown",
        length: parseInt(row["Length"]) || 0,
        time: new Date(row["Time"] || Date.now())
      });
    })
    .on("end", () => {
      fs.unlinkSync(req.file.path);
      res.json({ message: "File processed" });
    });
});

// ============================
// RESET
// ============================
app.get("/api/reset", (req, res) => {
  logs = [];
  res.json({ message: "reset done" });
});

// ============================
// ✅ SEARCH (UPGRADED)
// ============================
app.get("/api/search", (req, res) => {
  const ip = req.query.ip;

  const filtered = logs.filter((l) => l.ip.includes(ip));

  let map = {};

  filtered.forEach((l) => {
    const key = l.ip + "_" + l.protocol;

    if (!map[key]) {
      map[key] = {
        ip: l.ip,
        protocol: l.protocol,
        count: 1
      };
    } else {
      map[key].count++;
    }
  });

  res.json(Object.values(map));
});

// ============================
// DETECTION ENGINE
// ============================
function detectThreats(logs) {
  let map = {};

  logs.forEach((log) => {
    let type = "NORMAL_TRAFFIC";

    if (log.protocol === "TCP" && log.length > 1000) type = "DDOS_ATTACK";
    else if (log.protocol === "TCP" && log.length < 100) type = "PORT_SCAN";
    else if (log.protocol === "HTTP" && log.length < 300) type = "BRUTE_FORCE";
    else if (log.protocol === "ICMP") type = "PING_SCAN";

    const key = log.ip + "_" + type;

    if (!map[key]) {
      map[key] = { ip: log.ip, type, count: 1 };
    } else {
      map[key].count++;
    }
  });

  let alerts = Object.values(map);

  alerts.forEach((a) => {
    if (a.count > 50) a.severity = "high";
    else if (a.count > 20) a.severity = "medium";
    else a.severity = "low";
  });

  alerts = alerts
    .filter((a) => a.severity !== "low")
    .filter((a) => a.type !== "NORMAL_TRAFFIC");

  alerts.sort((a, b) => b.count - a.count);

  return alerts;
}

// ============================
// DASHBOARD API
// ============================
app.get("/api/dashboard", (req, res) => {
  try {
    const alertList = detectThreats(logs);

    // TREND
    let trendMap = {};

    logs.forEach((log) => {
      const t = new Date(log.time);
      const key = t.getMinutes() + ":" + t.getSeconds();

      if (!trendMap[key]) trendMap[key] = 0;
      trendMap[key]++;
    });

    const trend = Object.keys(trendMap).map((t) => ({
      time: t,
      value: trendMap[t]
    }));

    // THREAT TYPES
    let typeMap = {};

    alertList.forEach((a) => {
      if (!typeMap[a.type]) typeMap[a.type] = 0;
      typeMap[a.type] += a.count;
    });

    const threatDistribution = Object.keys(typeMap).map((t) => ({
      type: t,
      count: typeMap[t]
    }));

    res.json({
      totalLogs: logs.length,
      alerts: alertList.length,
      threats: alertList.filter((a) => a.severity === "high").length,
      alertList: alertList.slice(0, 10),
      trend,
      threatDistribution
    });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
// ============================
// 🔐 LOGIN + OTP SYSTEM (FINAL)
// ============================

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const SECRET = "soc_secret_key";

// fake user
const users = [
  {
    username: "admin",
    password: bcrypt.hashSync("1234", 8),
  },
];

// OTP store
let otpStore = {};
let loginAttempts = {};

// ================= LOGIN =================
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  // brute force protection
  if (loginAttempts[username] >= 5) {
    return res.status(403).json({ message: "Too many attempts. Try later." });
  }

  const isMatch = bcrypt.compareSync(password, user.password);

  if (!isMatch) {
    loginAttempts[username] = (loginAttempts[username] || 0) + 1;
    console.log(`❌ Failed login: ${username}`);
    return res.status(401).json({ message: "Wrong password" });
  }

  // reset attempts
  loginAttempts[username] = 0;

  // generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore[username] = otp;

  console.log(`🔐 OTP for ${username}: ${otp}`);

  res.json({ message: "OTP sent" });
});

// ================= VERIFY OTP =================
app.post("/verify-otp", (req, res) => {
  const { username, otp } = req.body;

  if (otpStore[username] == otp) {
    delete otpStore[username];

    const token = jwt.sign({ username }, SECRET, {
      expiresIn: "1h",
    });

    return res.json({ token });
  }

  res.status(401).json({ message: "Invalid OTP" });
});
app.listen(5000, () => {
  console.log("🔥 Server running on 5000");
});