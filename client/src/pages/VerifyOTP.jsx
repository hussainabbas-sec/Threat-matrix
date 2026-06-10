import { useState } from "react";

export default function VerifyOTP({ email }) {
  const [otp, setOtp] = useState("");

  // 🔥 REAL VERIFY API
  const handleVerify = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          otp
        })
      });

      const data = await res.json();

      if (data.success) {
        alert("OTP Verified ✅");
      } else {
        alert("Invalid OTP ❌");
      }

    } catch (err) {
      alert("Server error");
    }
  };

  const openLoginInNewTab = () => {
    window.open(window.location.origin + "?page=login", "_blank");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Verify Email</h1>

      <div style={styles.card}>

        <p style={styles.info}>
          Enter OTP sent to <b>{email}</b>
        </p>

        <input
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleVerify} style={styles.button}>
          Verify OTP →
        </button>

        <button onClick={openLoginInNewTab} style={styles.loginBtn}>
          Back to Login (New Tab)
        </button>

      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #1e3a8a, #020617)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontFamily: "Inter, sans-serif",
  },
  title: {
    position: "absolute",
    top: "120px",
    fontSize: "28px",
    textShadow: "0 0 15px rgba(168,85,247,0.8)",
  },
  card: {
    backdropFilter: "blur(20px)",
    background: "rgba(30, 41, 59, 0.5)",
    padding: "28px",
    borderRadius: "15px",
    width: "320px",
    textAlign: "center",
    boxShadow: `0 0 25px rgba(168,85,247,0.5)`,
  },
  input: {
    width: "100%",
    padding: "11px",
    marginTop: "15px",
    borderRadius: "8px",
    border: "none",
    background: "rgba(15,23,42,0.7)",
    color: "white",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    background: "linear-gradient(90deg,#a855f7,#ec4899)",
    border: "none",
    borderRadius: "8px",
    color: "white",
  },
  loginBtn: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: "8px",
    color: "#cbd5f5",
    cursor: "pointer",
  },
  info: {
    fontSize: "13px",
    color: "#cbd5f5",
  },
};