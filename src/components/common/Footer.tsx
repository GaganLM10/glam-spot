import Link from "next/link";
import { Scissors } from "lucide-react";
import { SITE_NAME } from "@/lib/constants";

const FOOTER_LINKS = {
  Explore: [
    { label: "Salons", href: "/salons" },
    { label: "Services", href: "/services" },
    { label: "Cities", href: "/cities" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
            <Scissors className="text-rose-500" size={20} />
            {SITE_NAME}
          </div>
          <p className="text-zinc-500 text-xs leading-relaxed">
            Discover and book top salons & spas near you. Beauty at your
            fingertips.
          </p>
        </div>

        {Object.entries(FOOTER_LINKS).map(([section, links]) => (
          <div key={section}>
            <h4 className="text-white font-medium mb-3">{section}</h4>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-zinc-800 text-center py-4 text-xs text-zinc-600">
        © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
      </div>
    </footer>
  );
}
