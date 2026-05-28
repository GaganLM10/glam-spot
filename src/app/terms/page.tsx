"use client";

import { motion } from "framer-motion";
import { SITE_NAME } from "@/lib/constants";

const SECTIONS = [
  {
    title: "Acceptance of Terms",
    content:
      "By accessing or using GlamSpot, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our platform.",
  },
  {
    title: "Use of the Platform",
    content:
      "GlamSpot is a salon booking marketplace. You may use our platform to discover salons, book appointments, and leave reviews. You agree not to misuse the platform, submit false information, or engage in fraudulent bookings.",
  },
  {
    title: "Bookings & Cancellations",
    content:
      "Bookings made through GlamSpot are subject to the salon's availability and cancellation policy. GlamSpot acts as an intermediary and is not responsible for services rendered by individual salons.",
  },
  {
    title: "User Accounts",
    content:
      "You are responsible for maintaining the confidentiality of your account credentials. Any activity that occurs under your account is your responsibility. Notify us immediately of any unauthorized use.",
  },
  {
    title: "Payments",
    content:
      "Payments made through GlamSpot are processed securely. Pricing is set by individual salons. GlamSpot is not liable for pricing discrepancies between what is displayed and what is charged at the salon.",
  },
  {
    title: "Reviews & Content",
    content:
      "By submitting a review, you grant GlamSpot a non-exclusive license to display that content on our platform. Reviews must be honest and based on your actual experience. Fake or abusive reviews will be removed.",
  },
  {
    title: "Intellectual Property",
    content:
      "All content on GlamSpot including logos, designs, and text is the property of GlamSpot. You may not reproduce or distribute any content without prior written permission.",
  },
  {
    title: "Limitation of Liability",
    content:
      "GlamSpot is not liable for any direct, indirect, or consequential damages arising from your use of the platform or services booked through it. Use the platform at your own risk.",
  },
  {
    title: "Changes to Terms",
    content:
      "We reserve the right to update these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms. We will notify users of significant changes via email.",
  },
  {
    title: "Contact",
    content:
      "For any questions about these terms, contact us at legal@glamspot.in. We will respond within 7 business days.",
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="bg-white border-b border-zinc-100 px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-zinc-900 mb-1"
          >
            Terms of Use
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
            transition={{ delay: i * 0.04 }}
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
