import { motion } from "framer-motion";

export default function StatCard({ title, value, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      style={{
        padding: "20px",
        borderRadius: "16px",
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "white",
      }}
    >
      <h4>{title}</h4>
      <h1 style={{ color }}>{value}</h1>
    </motion.div>
  );
}