"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  MapPin,
  Star,
  Clock,
  Phone,
  Mail,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SALONS_DATA } from "@/lib/data";

export default function SalonDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const salon = SALONS_DATA.find((s) => s.slug === slug);

  if (!salon) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50">
        <p className="text-5xl mb-4">😕</p>
        <h2 className="text-xl font-semibold text-zinc-800 mb-2">
          Salon not found
        </h2>
        <p className="text-zinc-400 text-sm mb-6">
          The salon you're looking for doesn't exist.
        </p>
        <Button asChild className="bg-rose-500 hover:bg-rose-600 text-white">
          <Link href="/salons">Back to Salons</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Hero */}
      <div className="bg-linear-to-br from-zinc-100 to-zinc-200 h-64 relative">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 max-w-7xl mx-auto">
          <Link
            href="/salons"
            className="inline-flex items-center gap-1 text-white/80 hover:text-white text-sm mb-4 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Salons
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left — Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Name Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm"
            >
              <div className="flex items-start justify-between flex-wrap gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs bg-rose-100 text-rose-500 font-medium px-2 py-0.5 rounded-full">
                      {salon.category}
                    </span>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${salon.isOpen ? "bg-green-100 text-green-700" : "bg-zinc-100 text-zinc-500"}`}
                    >
                      {salon.isOpen ? "Open Now" : "Closed"}
                    </span>
                  </div>
                  <h1 className="text-2xl font-bold text-zinc-900 mb-1">
                    {salon.name}
                  </h1>
                  <div className="flex items-center gap-1 text-zinc-400 text-sm">
                    <MapPin size={13} />
                    {salon.address}, {salon.city}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-amber-500 font-bold text-xl">
                    <Star size={18} fill="currentColor" />
                    {salon.rating}
                  </div>
                  <p className="text-zinc-400 text-xs">
                    {salon.reviews} reviews
                  </p>
                </div>
              </div>

              <p className="text-zinc-500 text-sm leading-relaxed mt-4">
                {salon.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {salon.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-zinc-100 text-zinc-500 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-zinc-900 mb-4">
                Services
              </h2>
              <div className="space-y-3">
                {salon.services.map((service) => (
                  <div
                    key={service.id}
                    className="flex items-center justify-between p-3 rounded-xl border border-zinc-100 hover:border-rose-200 hover:bg-rose-50/30 transition-all group"
                  >
                    <div>
                      <p className="text-sm font-medium text-zinc-800 group-hover:text-rose-600 transition-colors">
                        {service.name}
                      </p>
                      <div className="flex items-center gap-1 text-zinc-400 text-xs mt-0.5">
                        <Clock size={11} />
                        {service.duration} mins · {service.category}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-zinc-900">
                        ₹{service.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Staff */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-zinc-900 mb-4">
                Our Staff
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {salon.staff.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 p-3 rounded-xl border border-zinc-100"
                  >
                    <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 font-bold text-sm shrink-0">
                      {member.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-zinc-800">
                        {member.name}
                      </p>
                      <p className="text-xs text-zinc-400">{member.role}</p>
                    </div>
                    <div className="ml-auto flex items-center gap-1 text-amber-500 text-xs font-semibold">
                      <Star size={11} fill="currentColor" />
                      {member.rating}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-zinc-900 mb-4">
                Customer Reviews
              </h2>
              <div className="space-y-4">
                {salon.testimonials.map((t) => (
                  <div
                    key={t.id}
                    className="border-b border-zinc-100 last:border-0 pb-4 last:pb-0"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 font-bold text-xs">
                        {t.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-800">
                          {t.name}
                        </p>
                        <div className="flex gap-0.5">
                          {Array.from({ length: t.rating }).map((_, j) => (
                            <Star
                              key={j}
                              size={11}
                              className="text-amber-400 fill-amber-400"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed">
                      "{t.text}"
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Booking Card */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm sticky top-24"
            >
              <p className="text-sm text-zinc-500 mb-1">Starting from</p>
              <p className="text-3xl font-bold text-zinc-900 mb-4">
                ₹{salon.price}
                <span className="text-base font-normal text-zinc-400">
                  {" "}
                  /service
                </span>
              </p>

              <Button className="w-full bg-rose-500 hover:bg-rose-600 text-white mb-3 py-5">
                Book Appointment
              </Button>
              <Button
                variant="outline"
                className="w-full border-zinc-200 text-zinc-600 py-5"
              >
                View Availability
              </Button>

              <div className="mt-5 space-y-3 border-t border-zinc-100 pt-5">
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <Clock size={14} className="text-zinc-400 shrink-0" />
                  {salon.openTime} – {salon.closeTime}
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <Phone size={14} className="text-zinc-400 shrink-0" />
                  {salon.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <Mail size={14} className="text-zinc-400 shrink-0" />
                  {salon.email}
                </div>
              </div>

              <div className="mt-5 border-t border-zinc-100 pt-5 space-y-2">
                {[
                  "Instant Confirmation",
                  "Free Cancellation",
                  "Verified Salon",
                ].map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 text-xs text-zinc-500"
                  >
                    <CheckCircle
                      size={13}
                      className="text-green-500 shrink-0"
                    />
                    {feature}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
