"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  { id: 1, name: "Priya Sharma", city: "Delhi", rating: 5, text: "Booked a facial at Glam Studio through GlamSpot. Super easy process and the salon was amazing. Will definitely use again!" },
  { id: 2, name: "Ananya Mehta", city: "Mumbai", rating: 5, text: "Love how I can see ratings and reviews before booking. Found my go-to nail studio through this app. Highly recommend!" },
  { id: 3, name: "Riya Kapoor", city: "Bangalore", rating: 4, text: "The booking experience is so smooth. Got a reminder before my appointment too. Great service overall." },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-4 bg-zinc-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-zinc-900 mb-2">What Customers Say</h2>
          <p className="text-zinc-500">Real reviews from real people</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-zinc-100 hover:shadow-md transition-shadow"
            >
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-zinc-600 text-sm leading-relaxed mb-4">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 font-bold text-sm">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-900">{t.name}</p>
                  <p className="text-xs text-zinc-400">{t.city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}