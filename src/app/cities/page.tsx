"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { CITIES_DATA, SALONS_DATA } from "@/lib/data";

export default function CitiesPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <div className="bg-white border-b border-zinc-100 px-4 py-10">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-zinc-900 mb-1"
          >
            Explore by City
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-zinc-500"
          >
            Find the best salons in your city
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
        {/* Cities Grid */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CITIES_DATA.map((city, i) => (
              <motion.div
                key={city.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4 }}
              >
                <Link
                  href={`/salons?city=${city.name}`}
                  className="block group"
                >
                  <div
                    className={`rounded-2xl bg-linear-to-br ${city.color} p-6 text-white relative overflow-hidden min-h-36 flex flex-col justify-between`}
                  >
                    <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
                    <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/10 rounded-full" />

                    <div className="flex items-center gap-1 text-white/80 text-sm relative z-10">
                      <MapPin size={13} />
                      {city.salons}+ salons
                    </div>

                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold mb-1">{city.name}</h3>
                      <div className="flex items-center gap-1 text-white/80 text-sm group-hover:text-white transition-colors">
                        Explore salons <ArrowRight size={13} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Salons by City */}
        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mb-6">
            Top Salons by City
          </h2>
          <div className="space-y-8">
            {CITIES_DATA.slice(0, 4).map((city, ci) => {
              const citySalons = SALONS_DATA.filter(
                (s) => s.city === city.name,
              );
              if (citySalons.length === 0) return null;

              return (
                <motion.div
                  key={city.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: ci * 0.08 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-zinc-800 flex items-center gap-1">
                      <MapPin size={14} className="text-rose-500" />
                      {city.name}
                    </h3>
                    <Link
                      href={`/salons?city=${city.name}`}
                      className="text-xs text-rose-500 hover:text-rose-600 flex items-center gap-1"
                    >
                      View all <ArrowRight size={12} />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {citySalons.map((salon) => (
                      <Link
                        key={salon.id}
                        href={`/salons/${salon.slug}`}
                        className="bg-white rounded-xl border border-zinc-100 hover:shadow-md hover:border-rose-200 transition-all p-4 flex gap-3 group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-zinc-100 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-zinc-800 group-hover:text-rose-500 transition-colors truncate">
                            {salon.name}
                          </p>
                          <p className="text-xs text-zinc-400 mb-1">
                            {salon.category}
                          </p>
                          <div className="flex items-center gap-1 text-amber-500 text-xs font-semibold">
                            ★ {salon.rating}
                            <span className="text-zinc-300 font-normal">
                              · {salon.reviews} reviews
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
