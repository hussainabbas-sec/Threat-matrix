import { motion } from "framer-motion";

export default function FeatureCard({ title, icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-700"
    >
      <h2 className="text-xl text-cyan-400">{icon} {title}</h2>
    </motion.div>
  );
}