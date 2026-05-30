"use client";

import { motion } from "framer-motion";
import { MapPin, Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { salonsApi } from "@/lib/api";
import Link from "next/link";

export default function TopSalonsSection() {
  const { data, isLoading } = useQuery({
    queryKey: ["top-salons"],
    queryFn: () => salonsApi.search({ limit: 6 }),
  });

  const salons = data?.salons || [];

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

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16 text-zinc-400">
            <Loader2 className="animate-spin text-rose-500 mb-3" size={28} />
            <p className="text-xs">Finding top rated salons...</p>
          </div>
        ) : salons.length === 0 ? (
          <div className="text-center py-12 text-zinc-400 text-sm">
            No salons online right now. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {salons.map((salon, i) => (
              <motion.div
                key={salon.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-zinc-100 hover:shadow-md transition-shadow overflow-hidden group"
              >
                <Link href={`/salons/${salon.slug}`} className="block">
                  <div className="h-40 bg-zinc-100 relative">
                    {salon.coverImageUrl ? (
                      <img
                        src={salon.coverImageUrl}
                        alt={salon.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-linear-to-r from-rose-100 to-amber-100 opacity-60" />
                    )}
                    <div className="absolute top-3 left-3 bg-white text-xs font-medium text-zinc-600 px-2 py-1 rounded-full">
                      {salon.category || "Salon & Spa"}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold text-zinc-900 group-hover:text-rose-500 transition-colors">
                        {salon.name}
                      </h3>
                      <div className="flex items-center gap-1 text-amber-500 text-sm font-medium">
                        <Star size={13} fill="currentColor" />
                        {salon.avgRating}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-zinc-400 text-xs mb-3">
                      <MapPin size={12} />
                      {salon.city} · {salon.reviewsCount || 0} reviews
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-zinc-500">
                        {salon.priceLabel || `₹${salon.price || 400} onwards`}
                      </span>
                      <Button
                        size="sm"
                        className="bg-rose-500 hover:bg-rose-600 text-white cursor-pointer rounded-lg text-xs"
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}