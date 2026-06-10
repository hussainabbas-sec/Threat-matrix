export default function Alerts({ alerts }) {
  if (!alerts || alerts.length === 0) {
    return <div>No alerts</div>;
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>🚨 Live Alerts (Latest 15)</h2>

      {alerts.map((a, i) => {

        const color =
          a.severity === "high"
            ? "#ff4d4f"
            : a.severity === "medium"
            ? "#ffa500"
            : "#22c55e";

        return (
          <div
            key={i}
            style={{
              background: color,
              padding: "12px",
              borderRadius: "10px",
              marginBottom: "10px",
              color: "white",
              fontWeight: "bold"
            }}
          >
            <div>🚨 {a.type.toUpperCase()}</div>
            <div>IP: {a.ip}</div>
            <div>Protocol: {a.protocol}</div>
            <div>Requests: {a.count}</div>
            <div>Severity: {a.severity.toUpperCase()}</div>
            <div>Time: {a.time}</div>
          </div>
        );
      })}
    </div>
  );
}