"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-linear-to-br from-rose-500 to-rose-600 rounded-3xl px-8 py-16 text-center text-white relative overflow-hidden"
        >
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <h2 className="text-3xl md:text-4xl font-bold mb-3 relative z-10">
            Ready to Glow Up?
          </h2>
          <p className="text-rose-100 mb-8 text-lg relative z-10">
            Join 50,000+ customers who book with GlamSpot every month.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
            <Button className="bg-white text-rose-500 hover:bg-rose-50 cursor-pointer font-semibold px-8">
              Book Now <ArrowRight size={16} className="ml-1" />
            </Button>
            <Button
              variant="outline"
              className="text-black cursor-pointer px-8"
            >
              List Your Salon
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
