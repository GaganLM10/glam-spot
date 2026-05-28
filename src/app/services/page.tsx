"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { SERVICES_DATA } from "@/lib/data";
import { SALONS_DATA } from "@/lib/data";

export default function ServicesPage() {
  const [search, setSearch] = useState("");

  const filtered = SERVICES_DATA.filter((s) =>
    s.label.toLowerCase().includes(search.toLowerCase()),
  );

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
            Browse Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-zinc-500 mb-6"
          >
            {SERVICES_DATA.length} services available across all salons
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-2 bg-zinc-100 rounded-xl px-4 py-3 max-w-md"
          >
            <Search size={16} className="text-zinc-400 shrink-0" />
            <input
              type="text"
              placeholder="Search a service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent w-full outline-none text-sm text-zinc-700 placeholder:text-zinc-400"
            />
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-14">
        {/* Services Grid */}
        <section>
          <h2 className="text-xl font-semibold text-zinc-900 mb-6">
            All Services
          </h2>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-zinc-500">No services found for "{search}"</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filtered.map((service, i) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                >
                  <Link
                    href={`/salons?search=${service.label}`}
                    className="flex flex-col items-center gap-3 p-5 bg-white rounded-2xl border border-zinc-100 hover:border-rose-200 hover:shadow-md transition-all group cursor-pointer"
                  >
                    <span className="text-4xl">{service.icon}</span>
                    <span className="text-sm font-medium text-zinc-700 group-hover:text-rose-500 transition-colors text-center">
                      {service.label}
                    </span>
                    <span className="text-xs text-zinc-400">
                      {service.count}+ salons
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Service Detail Cards */}
        {!search && (
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-6">
              Popular Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {SERVICES_DATA.slice(0, 6).map((service, i) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white rounded-2xl border border-zinc-100 hover:shadow-md transition-all p-5 flex gap-4"
                >
                  <div className="w-14 h-14 rounded-xl bg-rose-50 flex items-center justify-center text-3xl shrink-0">
                    {service.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-zinc-900 mb-1">
                      {service.label}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                      {service.description}
                    </p>
                    <Link
                      href={`/salons?search=${service.label}`}
                      className="inline-flex items-center gap-1 text-xs text-rose-500 hover:text-rose-600 font-medium transition-colors"
                    >
                      View salons <ArrowRight size={12} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Salons CTA */}
        {!search && (
          <section>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-linear-to-br from-rose-500 to-rose-600 rounded-3xl p-10 text-center text-white relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
              <h2 className="text-2xl font-bold mb-2 relative z-10">
                Can't find what you're looking for?
              </h2>
              <p className="text-rose-100 mb-6 relative z-10">
                Browse all {SALONS_DATA.length} salons and filter by your
                preferred service.
              </p>
              <Link
                href="/salons"
                className="inline-flex items-center gap-2 bg-white text-rose-500 font-semibold px-6 py-3 rounded-xl hover:bg-rose-50 transition-colors relative z-10"
              >
                Explore All Salons <ArrowRight size={16} />
              </Link>
            </motion.div>
          </section>
        )}
      </div>
    </div>
  );
}
