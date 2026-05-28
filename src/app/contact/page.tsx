"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_NAME } from "@/lib/constants";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-zinc-500"
          >
            We'd love to hear from you. Reach out anytime.
          </motion.p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <div>
            <h2 className="text-xl font-semibold text-zinc-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Have a question, feedback, or want to list your salon on{" "}
              {SITE_NAME}? Fill out the form or reach us directly through the
              details below.
            </p>
          </div>

          <div className="space-y-4">
            {[
              { icon: Mail, label: "Email", value: "hello@glamspot.in" },
              { icon: Phone, label: "Phone", value: "+91 98000 00000" },
              { icon: MapPin, label: "Office", value: "New Delhi, India" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center shrink-0">
                  <item.icon size={16} className="text-rose-500" />
                </div>
                <div>
                  <p className="text-xs text-zinc-400">{item.label}</p>
                  <p className="text-sm font-medium text-zinc-800">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-rose-50 rounded-2xl p-5 border border-rose-100">
            <p className="text-sm font-medium text-zinc-800 mb-1">
              Want to list your salon?
            </p>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Reach thousands of customers in your city. Email us at{" "}
              <span className="text-rose-500 font-medium">
                partners@glamspot.in
              </span>{" "}
              to get started.
            </p>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl border border-zinc-100 p-6 shadow-sm"
        >
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-10">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">
                Message Sent!
              </h3>
              <p className="text-sm text-zinc-400">
                Thanks for reaching out. We'll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-zinc-500 block mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Priya Sharma"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-500 block mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="priya@example.com"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-500 block mb-1.5">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder="Tell us how we can help..."
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center gap-2"
              >
                <Send size={15} />
                Send Message
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
