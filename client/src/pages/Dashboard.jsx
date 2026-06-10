import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import Charts from "../components/Charts";

export default function Dashboard() {

  const [data, setData] = useState([]);
  const [threatData, setThreatData] = useState([]);

  const [logs, setLogs] = useState(0);
  const [alerts, setAlerts] = useState(0);
  const [threats, setThreats] = useState(0);
  const [alertList, setAlertList] = useState([]);

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const [fileName, setFileName] = useState("Upload CSV");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/dashboard");

      setLogs(res.data.totalLogs || 0);
      setAlerts(res.data.alerts || 0);
      setThreats(res.data.threats || 0);
      setAlertList(res.data.alertList || []);

      setData(res.data.trend || []);
      setThreatData(res.data.threatDistribution || []);

    } catch (err) {
      console.log("Fetch Error:", err);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        await axios.get("http://localhost:5000/api/reset");
      } catch (e) {}
      await fetchData();
    };

    init();

    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);

  }, []);

  const handleSearch = async () => {
    try {
      if (!search) {
        setResults([]);
        return;
      }

      const res = await axios.get(
        `http://localhost:5000/api/search?ip=${search}`
      );

      setResults(res.data || []);
    } catch (err) {
      console.log("Search Error:", err);
      setResults([]);
    }
  };

  const handleFileUpload = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      setFileName(file.name);

      const formData = new FormData();
      formData.append("file", file);

      await axios.post("http://localhost:5000/api/upload", formData);

      alert("Uploaded Successfully");
      fetchData();

    } catch (err) {
      console.log("Upload Error:", err);
    }
  };

  return (
    <div style={styles.container}>

      {/* NAVBAR */}
      <div style={styles.navbar}>

        <h1 style={styles.logo}>
          SOC Threat Dashboard 🚀
        </h1>

        <div style={styles.center}>

          <input
            type="text"
            placeholder="Search IP..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (e.target.value === "") setResults([]);
            }}
            style={styles.searchInput}
          />

          <button onClick={handleSearch} style={styles.searchBtn}>
            Search
          </button>

          <label style={styles.uploadBtn}>
            {fileName}
            <input
              type="file"
              accept=".csv"
              hidden
              onChange={handleFileUpload}
            />
          </label>

        </div>

        {/* 🔥 LOGOUT SAME AS SEARCH */}
        <button onClick={handleLogout} style={styles.logout}>
          Logout
        </button>

      </div>

      {/* SEARCH RESULTS */}
      {results.length > 0 && (
        <div style={styles.searchBox}>
          <h3 style={styles.searchTitle}>🔍 Search Results</h3>

          {results.map((r, i) => (
            <div
              key={i}
              style={styles.resultItem}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(168,85,247,0.15)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <span style={styles.icon}>🔍</span>
              <span style={styles.ip}>{r.ip}</span>
              <span style={styles.protocol}>{r.protocol}</span>
              <span style={styles.count}>{r.count} hits</span>
            </div>
          ))}
        </div>
      )}

      <div style={styles.grid3}>
        <Card title="Total Logs" value={logs} />
        <Card title="Alerts" value={alerts} />
        <Card title="Threats" value={threats} />
      </div>

      <div style={styles.grid2}>
        <Charts data={data} threatData={threatData} />
      </div>

      <div style={{ marginTop: "20px" }}>
        <h2>🚨 Live Alerts</h2>

        {alertList.map((a, i) => {

          let color = "#4caf50";
          let icon = "🟢";

          if (a.severity === "medium") {
            color = "#ff9800";
            icon = "🟡";
          }

          if (a.severity === "high") {
            color = "#f44336";
            icon = "🔴";
          }

          return (
            <div key={i} style={{
              background: color,
              padding: "10px",
              borderRadius: "8px",
              marginTop: "10px",
              fontWeight: "bold"
            }}>
              {icon} {a.type} | {a.ip} | {a.severity.toUpperCase()}
            </div>
          );
        })}
      </div>

    </div>
  );
}

// STYLES
const styles = {
  container: {
    padding: "20px 40px",
    maxWidth: "1200px",
    margin: "auto",
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },

  logo: {
    fontSize: "26px",
    fontWeight: "bold",
    background: "linear-gradient(90deg,#22d3ee,#a855f7)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  center: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  searchInput: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: "rgba(15,23,42,0.7)",
    color: "white",
  },

  searchBtn: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(90deg,#6366f1,#a855f7)",
    color: "white",
    cursor: "pointer",
  },

  uploadBtn: {
    padding: "10px 14px",
    borderRadius: "10px",
    background: "rgba(30, 41, 59, 0.5)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#c084fc",
    cursor: "pointer",
  },

  // 🔥 UPDATED LOGOUT STYLE
  logout: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(90deg,#6366f1,#a855f7)",
    color: "white",
    cursor: "pointer",
    fontWeight: "500",
    boxShadow: "0 0 10px rgba(168,85,247,0.4)",
  },

  searchBox: {
    marginTop: "20px",
    padding: "20px",
    borderRadius: "15px",
    background: "rgba(30, 41, 59, 0.5)",
    backdropFilter: "blur(15px)",
    border: "1px solid rgba(255,255,255,0.1)",
  },

  searchTitle: {
    marginBottom: "10px",
    color: "#c084fc",
  },

  resultItem: {
    padding: "12px",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    display: "flex",
    gap: "10px",
  },

  icon: { color: "#a855f7" },
  ip: { flex: 1 },
  protocol: { color: "#38bdf8" },
  count: { color: "#94a3b8" },

  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)
    gap: "20px",
    marginTop: "20px",
  },

  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gap: "20px",
    marginTop: "20px",
  },
};