"use client";

import { motion } from "framer-motion";
import { SERVICES } from "@/lib/constants";

export default function ServicesSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-zinc-900 mb-2">Our Services</h2>
          <p className="text-zinc-500">Everything you need, all in one place</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-zinc-100 hover:border-rose-200 hover:shadow-md cursor-pointer transition-all group"
            >
              <span className="text-4xl">{service.icon}</span>
              <span className="text-sm font-medium text-zinc-700 group-hover:text-rose-500 transition-colors">
                {service.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}