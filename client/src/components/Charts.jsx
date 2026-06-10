import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  ResponsiveContainer
} from "recharts";

export default function Charts({ data = [], threatData = [] }) {

  return (
    <>
      {/* ATTACK TREND */}
      <div style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(10px)",
        padding: "20px",
        borderRadius: "20px",
        boxShadow: "0 0 20px rgba(0,255,255,0.2)"
      }}>
        <h3 style={{ color: "#00e5ff" }}>Attack Trend</h3>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid stroke="rgba(255,255,255,0.1)" />

            <XAxis
              dataKey="time"
              stroke="#aaa"
            />

            <YAxis stroke="#aaa" />

            <Tooltip
              contentStyle={{
                backgroundColor: "#111",
                border: "none",
                borderRadius: "10px"
              }}
            />

            <Line
              type="monotone"
              dataKey="value"
              stroke="#00e5ff"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* THREAT TYPES */}
      <div style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(10px)",
        padding: "20px",
        borderRadius: "20px",
        boxShadow: "0 0 20px rgba(255,0,100,0.2)"
      }}>
        <h3 style={{ color: "#ff4d6d" }}>Threat Types</h3>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={threatData}>
            <CartesianGrid stroke="rgba(255,255,255,0.1)" />

            <XAxis dataKey="type" stroke="#aaa" />
            <YAxis stroke="#aaa" />

            <Tooltip
  contentStyle={{
    backgroundColor: "#111",
    border: "none",
    borderRadius: "8px",
    color: "#fff"
  }}
  cursor={{ fill: "transparent" }}   // ✅ YE LINE IMPORTANT HAI
/>

            <Bar
              dataKey="count"
              fill="#ff4d6d"
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}