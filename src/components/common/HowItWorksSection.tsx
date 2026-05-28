"use client";

import { motion } from "framer-motion";
import { Search, CalendarCheck, Sparkles } from "lucide-react";

const STEPS = [
  { icon: Search, title: "Find a Salon", desc: "Search by service, city, or salon name to discover top-rated options near you." },
  { icon: CalendarCheck, title: "Book Instantly", desc: "Pick your service, choose a time slot, and confirm your booking in seconds." },
  { icon: Sparkles, title: "Get Pampered", desc: "Walk in and enjoy a premium experience. Pay at the salon or online." },
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 px-4 bg-zinc-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl font-bold text-zinc-900 mb-2">How It Works</h2>
          <p className="text-zinc-500">Book your next appointment in 3 easy steps</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-px bg-zinc-200 z-0" />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative z-10 flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mb-4 border-4 border-white shadow">
                <step.icon size={24} className="text-rose-500" />
              </div>
              <div className="text-xs font-bold text-rose-400 mb-1">STEP {i + 1}</div>
              <h3 className="font-semibold text-zinc-900 text-lg mb-2">{step.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}