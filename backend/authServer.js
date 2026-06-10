const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = [];

// SIGNUP
app.post("/api/signup", (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ error: "All fields required" });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: "WEAK_PASSWORD" });
  }

  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ error: "EMAIL_EXISTS" });
  }

  if (users.find((u) => u.username === username)) {
    return res.status(400).json({ error: "USERNAME_TAKEN" });
  }

  users.push({ email, password, username });

  res.json({ message: "Signup success" });
});

// LOGIN
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  res.json({ token: "demo_token" });
});

// FORGOT
app.post("/api/forgot-password", (req, res) => {
  const { email } = req.body;

  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(400).json({ error: "EMAIL_NOT_FOUND" });
  }

  res.json({ message: "Email found" });
});

// RESET
app.post("/api/reset-password", (req, res) => {
  const { email, newPassword } = req.body;

  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(400).json({ error: "EMAIL_NOT_FOUND" });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({ error: "WEAK_PASSWORD" });
  }

  user.password = newPassword;

  res.json({ message: "Password updated" });
});

app.listen(4000, () => {
  console.log("🔥 Server running on http://localhost:4000");
});