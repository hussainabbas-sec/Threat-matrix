import { useState } from "react";

export default function ResetPassword() {
  const [password, setPassword] = useState("");

  const handleReset = async () => {
    const email = localStorage.getItem("resetEmail");

    if (password.length < 8) {
      alert("Password must be at least 8 characters ❌");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, newPassword: password })
      });

      if (res.ok) {
        alert("Password updated ✅");
        window.open(window.location.origin + "?page=login", "_blank");
      } else {
        alert("Error ❌");
      }

    } catch {
      alert("Server error");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Reset Password</h1>

      <div style={styles.card}>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleReset} style={styles.button}>
          Reset →
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
    flexDirection: "column",
    color: "white",
  },
  title: {
    marginBottom: "20px",
  },
  card: {
    padding: "20px",
    background: "rgba(30,41,59,0.5)",
    borderRadius: "10px",
  },
  input: {
    padding: "10px",
    width: "250px",
    marginBottom: "10px",
  },
  button: {
    padding: "10px",
    width: "100%",
  },
};