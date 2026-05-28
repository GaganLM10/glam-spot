"use client";

import { motion } from "framer-motion";
import { MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const SALONS = [
  { id: 1, name: "Glam Studio", city: "Delhi", rating: 4.9, reviews: 320, category: "Salon & Spa", price: "₹500 onwards" },
  { id: 2, name: "The Beauty Lounge", city: "Mumbai", rating: 4.8, reviews: 210, category: "Makeup & Hair", price: "₹800 onwards" },
  { id: 3, name: "Serenity Spa", city: "Bangalore", rating: 4.7, reviews: 180, category: "Spa & Massage", price: "₹1200 onwards" },
  { id: 4, name: "Nail Republic", city: "Pune", rating: 4.8, reviews: 150, category: "Nail Studio", price: "₹400 onwards" },
  { id: 5, name: "Blush & Bloom", city: "Hyderabad", rating: 4.6, reviews: 130, category: "Bridal & Makeup", price: "₹2000 onwards" },
  { id: 6, name: "Urban Cuts", city: "Chennai", rating: 4.7, reviews: 190, category: "Haircut & Color", price: "₹600 onwards" },
];

export default function TopSalonsSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-zinc-900 mb-2">Top Rated Salons</h2>
          <p className="text-zinc-500">Handpicked by our customers</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SALONS.map((salon, i) => (
            <motion.div
              key={salon.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-zinc-100 hover:shadow-md transition-shadow overflow-hidden group"
            >
              <div className="h-40 bg-zinc-100 relative">
                <div className="absolute top-3 left-3 bg-white text-xs font-medium text-zinc-600 px-2 py-1 rounded-full">
                  {salon.category}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold text-zinc-900">{salon.name}</h3>
                  <div className="flex items-center gap-1 text-amber-500 text-sm font-medium">
                    <Star size={13} fill="currentColor" />
                    {salon.rating}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-zinc-400 text-xs mb-3">
                  <MapPin size={12} />
                  {salon.city} · {salon.reviews} reviews
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-500">{salon.price}</span>
                  <Button size="sm" className="bg-rose-500 hover:bg-rose-600 text-white cursor-pointer rounded-lg text-xs">
                    Book Now
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}