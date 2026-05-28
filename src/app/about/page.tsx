"use client";

import { motion } from "framer-motion";
import { Scissors, Users, Store, Star } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";

const STATS = [
  { icon: Store, label: "Salons Listed", value: "500+" },
  { icon: Users, label: "Happy Customers", value: "50K+" },
  { icon: Star, label: "Avg Rating", value: "4.8★" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="bg-white border-b border-zinc-100 px-4 py-14 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="flex justify-center mb-4">
            <div className="bg-rose-100 p-4 rounded-2xl">
              <Scissors className="text-rose-500" size={32} />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 mb-3">
            About {SITE_NAME}
          </h1>
          <p className="text-zinc-500 leading-relaxed">
            {SITE_NAME} is India's fastest-growing salon booking platform. We
            connect customers with the best salons, spas, and beauty studios
            across the country — making it effortless to look good and feel
            great.
          </p>
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-14 space-y-12">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-6"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-6 border border-zinc-100 text-center"
            >
              <stat.icon size={24} className="text-rose-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-zinc-900">{stat.value}</p>
              <p className="text-sm text-zinc-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 border border-zinc-100"
        >
          <h2 className="text-xl font-semibold text-zinc-900 mb-3">
            Our Mission
          </h2>
          <p className="text-zinc-500 leading-relaxed">
            We believe everyone deserves access to great beauty services without
            the hassle of calling ahead, waiting in queues, or wondering about
            pricing.
            {SITE_NAME} makes the entire experience — discovery, booking, and
            payment — seamless and transparent.
          </p>
        </motion.div>

        {/* For Salons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-rose-50 rounded-2xl p-8 border border-rose-100"
        >
          <h2 className="text-xl font-semibold text-zinc-900 mb-3">
            For Salon Owners
          </h2>
          <p className="text-zinc-500 leading-relaxed">
            Are you a salon owner? List your business on {SITE_NAME} and reach
            thousands of new customers in your city. Manage bookings, staff, and
            services all from one dashboard.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
