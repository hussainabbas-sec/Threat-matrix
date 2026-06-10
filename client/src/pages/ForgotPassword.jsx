import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleCheck = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("resetEmail", email);
        window.open(window.location.origin + "?page=reset", "_blank");
      } else {
        alert("Email not found ❌");
      }

    } catch {
      alert("Server error");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Forgot Password</h1>

      <div style={styles.card}>
        <input
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleCheck} style={styles.button}>
          Continue →
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