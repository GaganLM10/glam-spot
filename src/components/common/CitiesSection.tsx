"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { CITIES } from "@/lib/constants";

export default function CitiesSection() {
  return (
    <section className="py-20 px-4 bg-zinc-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-zinc-900 mb-2">Popular Cities</h2>
          <p className="text-zinc-500">Find the best salons in your city</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CITIES.map((city, i) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="relative rounded-2xl overflow-hidden cursor-pointer group h-36 bg-zinc-200"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 z-10" />
              <div className="absolute bottom-0 left-0 right-0 z-20 p-3">
                <div className="flex items-center gap-1 text-white font-semibold text-sm">
                  <MapPin size={13} />
                  {city.name}
                </div>
                <p className="text-white/70 text-xs">{city.salons}+ salons</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}