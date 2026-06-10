import { useState } from "react";

export default function Signup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    country: "India",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const countries = [
    "India","USA","UK","Germany","France","Canada","Australia","China","Japan","Russia",
    "Brazil","Italy","Spain","Netherlands","Sweden","Norway","Denmark","Finland",
    "South Korea","Singapore","UAE","Saudi Arabia","South Africa","Mexico","Indonesia",
    "Turkey","Argentina","Poland","Switzerland","Belgium","Thailand","Malaysia",
    "Philippines","Vietnam","Egypt","Pakistan","Bangladesh","Sri Lanka","Nepal"
  ];

  const handleSignup = async () => {
    // 🔥 FRONTEND VALIDATION
    if (!form.email || !form.password || !form.username) {
      alert("All fields required ❌");
      return;
    }

    if (form.password.length < 8) {
      alert("Password must be at least 8 characters ❌");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        alert("Signup successful ✅");
        window.open(window.location.origin + "?page=login", "_blank");
      } else {
        if (data.error === "EMAIL_EXISTS") {
          alert("Email already registered ❌");
        } else if (data.error === "USERNAME_TAKEN") {
          alert("Username already taken ❌");
        } else if (data.error === "WEAK_PASSWORD") {
          alert("Password must be at least 8 characters ❌");
        } else {
          alert(data.error);
        }
      }

    } catch {
      alert("Server error ❌");
    }
  };

  const openLogin = () => {
    window.open(window.location.origin + "?page=login", "_blank");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Create Account</h1>

      <form autoComplete="off" style={styles.card}>

        <div style={styles.field}>
          <label style={styles.label}>Email</label>
          <input
            name="email"
            value={form.email}
            autoComplete="off"
            placeholder="Enter your email"
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            autoComplete="new-password"
            placeholder="Create a password"
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Username</label>
          <input
            name="username"
            value={form.username}
            autoComplete="off"
            placeholder="Enter username"
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Country</label>
          <select
            name="country"
            value={form.country}
            onChange={handleChange}
            style={styles.input}
          >
            {countries.map((c, i) => (
              <option key={i}>{c}</option>
            ))}
          </select>
        </div>

        <button type="button" onClick={handleSignup} style={styles.button}>
          Create Account →
        </button>

        <button type="button" onClick={openLogin} style={styles.loginBtn}>
          Back to Login 
        </button>

      </form>
    </div>
  );
}

// 💀 STYLES
const styles = {
  container: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #1e3a8a, #020617)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontFamily: "Inter, sans-serif",
  },
  title: {
    marginBottom: "24px",
    fontSize: "28px",
    textShadow: "0 0 15px rgba(168,85,247,0.8)",
  },
  card: {
    backdropFilter: "blur(20px)",
    background: "rgba(30, 41, 59, 0.5)",
    padding: "28px",
    borderRadius: "15px",
    width: "320px",
    boxShadow: `0 0 25px rgba(168,85,247,0.5)`,
  },
  field: { marginBottom: "16px" },
  label: { fontSize: "13px", marginBottom: "6px", display: "block" },
  input: {
    width: "100%",
    padding: "11px",
    borderRadius: "8px",
    border: "none",
    background: "rgba(15,23,42,0.7)",
    color: "white",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(90deg,#a855f7,#ec4899)",
    border: "none",
    borderRadius: "8px",
    color: "white",
    marginTop: "10px",
  },
  loginBtn: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "8px",
    color: "#cbd5f5",
  },
};