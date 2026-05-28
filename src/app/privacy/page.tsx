"use client";

import { motion } from "framer-motion";
import { SITE_NAME } from "@/lib/constants";

const SECTIONS = [
  {
    title: "Information We Collect",
    content:
      "We collect information you provide directly, such as your name, email address, phone number, and booking details. We also collect usage data to improve our platform.",
  },
  {
    title: "How We Use Your Information",
    content:
      "Your information is used to process bookings, send confirmations and reminders, improve our services, and communicate relevant offers. We do not sell your personal data to third parties.",
  },
  {
    title: "Data Sharing",
    content:
      "We share necessary booking information with salons you book with. We may share data with trusted service providers who assist in operating our platform under strict confidentiality agreements.",
  },
  {
    title: "Cookies",
    content:
      "We use cookies to remember your preferences and improve your experience. You can disable cookies in your browser settings, though some features may not function properly.",
  },
  {
    title: "Data Security",
    content:
      "We use industry-standard encryption and security practices to protect your data. However, no method of transmission over the internet is 100% secure.",
  },
  {
    title: "Your Rights",
    content:
      "You have the right to access, update, or delete your personal information at any time. Contact us at privacy@glamspot.in to exercise your rights.",
  },
  {
    title: "Contact",
    content:
      "For any privacy-related questions, reach out to us at privacy@glamspot.in. We will respond within 7 business days.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="bg-white border-b border-zinc-100 px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-zinc-900 mb-1"
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-zinc-400 text-sm"
          >
            Last updated: January 2025 · {SITE_NAME}
          </motion.p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        {SECTIONS.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl border border-zinc-100 p-6"
          >
            <h2 className="text-base font-semibold text-zinc-900 mb-2">
              {section.title}
            </h2>
            <p className="text-sm text-zinc-500 leading-relaxed">
              {section.content}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
