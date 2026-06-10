import { motion } from "framer-motion";
import FeatureCard from "../components/FeatureCard";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white min-h-screen">

      <div className="flex flex-col items-center justify-center h-screen text-center">

        <motion.h1
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl font-bold text-cyan-400"
        >
          🔐 SOC Threat Monitoring
        </motion.h1>

        <p className="mt-4 text-gray-400 max-w-xl">
          Real-time system for detecting cyber attacks and monitoring logs.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="mt-6 px-6 py-3 bg-cyan-500 rounded-xl hover:bg-cyan-400"
        >
          🚀 Start Monitoring
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-10">
        <FeatureCard title="Secure Login" icon="🔐" />
        <FeatureCard title="Log Monitoring" icon="📊" />
        <FeatureCard title="Attack Detection" icon="🚨" />
      </div>

    </div>
  );
}