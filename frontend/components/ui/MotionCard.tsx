"use client";
import { motion } from "framer-motion";

export default function MotionCard({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="bg-white rounded-2xl shadow-md p-6 transition-shadow hover:shadow-xl"
    >
      {title && <h3 className="font-semibold text-xl text-gray-900 mb-4">{title}</h3>}
      <div className="text-gray-700">{children}</div>
    </motion.div>
  );
}