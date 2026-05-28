"use client";

import { motion } from "framer-motion";
import { Users, Store, CalendarCheck, Star } from "lucide-react";

const STATS = [
  { icon: Store, label: "Salons Listed", value: "500+" },
  { icon: Users, label: "Happy Customers", value: "50K+" },
  { icon: CalendarCheck, label: "Bookings Done", value: "1.2L+" },
  { icon: Star, label: "Avg Rating", value: "4.8★" },
];

export default function StatsSection() {
  return (
    <section className="py-16 px-4 bg-rose-500">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center text-center text-white"
          >
            <stat.icon size={28} className="mb-2 opacity-80" />
            <span className="text-3xl font-bold">{stat.value}</span>
            <span className="text-rose-100 text-sm mt-1">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}