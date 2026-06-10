export default function Glass({ children }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.05)",
      padding: "20px",
      borderRadius: "16px",
      backdropFilter: "blur(12px)",
      border: "1px solid rgba(255,255,255,0.08)"
    }}>
      {children}
    </div>
  );
}