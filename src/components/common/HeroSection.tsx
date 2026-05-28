"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-zinc-50 px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-rose-100 rounded-full blur-3xl opacity-40" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-zinc-100 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="relative max-w-3xl w-full text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold text-zinc-900 mb-4 leading-tight"
        >
          Look Good,<br />
          <span className="text-rose-500">Feel Great</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-zinc-500 text-lg mb-10"
        >
          Book top salons & spas near you in seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-2 flex flex-col md:flex-row gap-2"
        >
          <div className="flex items-center gap-2 flex-1 px-3">
            <Search size={18} className="text-zinc-400 shrink-0" />
            <input
              type="text"
              placeholder="Search salons or services..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full outline-none text-sm text-zinc-700 placeholder:text-zinc-400 py-2"
            />
          </div>

          <div className="hidden md:block w-px bg-zinc-100" />

          <div className="flex items-center gap-2 flex-1 px-3">
            <MapPin size={18} className="text-zinc-400 shrink-0" />
            <input
              type="text"
              placeholder="Enter your city..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full outline-none text-sm text-zinc-700 placeholder:text-zinc-400 py-2"
            />
          </div>

          <Button className="bg-rose-500 hover:bg-rose-600 text-white rounded-xl px-6 shrink-0">
            Search
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 flex flex-wrap justify-center gap-2 text-xs text-zinc-400"
        >
          {["Haircut", "Facial", "Massage", "Bridal", "Nail Art"].map((tag) => (
            <span
              key={tag}
              className="bg-white border border-zinc-200 rounded-full px-3 py-1 cursor-pointer hover:border-rose-300 hover:text-rose-500 transition-colors"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}