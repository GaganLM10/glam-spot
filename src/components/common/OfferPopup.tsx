"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OFFER } from "@/lib/constants";

export default function OfferPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center"
          >
            <button
              onClick={() => setVisible(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex justify-center mb-4">
              <div className="bg-rose-100 p-3 rounded-full">
                <Tag className="text-rose-500" size={28} />
              </div>
            </div>

            <h2 className="text-2xl font-bold text-zinc-900 mb-1">
              {OFFER.discount}
            </h2>
            <p className="text-zinc-500 mb-4">
              {OFFER.description}. Use code:
            </p>

            <div className="bg-zinc-100 rounded-lg px-6 py-3 inline-block mb-6">
              <span className="font-mono font-bold text-rose-500 text-lg tracking-widest">
                {OFFER.code}
              </span>
            </div>

            <p className="text-xs text-zinc-400 mb-6">Valid till {OFFER.expiry}</p>

            <Button
              className="w-full bg-rose-500 hover:bg-rose-600 text-white"
              onClick={() => setVisible(false)}
            >
              Claim Offer
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}