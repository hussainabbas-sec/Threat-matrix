import { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email & password");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        onLogin();
      } else {
        alert(data.error);
      }

    } catch {
      alert("Server error");
    }
  };

  const openSignup = () => {
    window.open(window.location.origin + "?page=signup", "_blank");
  };

  // 🔥 FORGOT PASSWORD
  const openForgot = () => {
    window.open(window.location.origin + "?page=forgot", "_blank");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Login</h1>

      <form autoComplete="off" style={styles.card}>

        <div style={styles.field}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            name="login_email_xyz"
            autoComplete="off"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            name="login_pass_xyz"
            autoComplete="new-password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>

        <button type="button" onClick={handleLogin} style={styles.button}>
          Login →
        </button>

        {/* 🔥 NEW FORGOT PASSWORD BUTTON */}
        <button type="button" onClick={openForgot} style={styles.forgotBtn}>
          Forgot Password?
        </button>

        <button type="button" onClick={openSignup} style={styles.signupBtn}>
          Create Account 
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
  field: {
    marginBottom: "16px",
  },
  label: {
    fontSize: "13px",
    marginBottom: "6px",
    display: "block",
  },
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
    cursor: "pointer",
  },

  // 🔥 NEW STYLE
  forgotBtn: {
    width: "100%",
    padding: "8px",
    marginTop: "8px",
    background: "transparent",
    border: "none",
    color: "#94a3b8",
    cursor: "pointer",
    fontSize: "12px",
  },

  signupBtn: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "8px",
    color: "#cbd5f5",
    cursor: "pointer",
  },
};