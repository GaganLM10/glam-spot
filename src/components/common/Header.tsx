"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Scissors, User as UserIcon, LogOut, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_NAME } from "@/lib/constants";
import { useAuthStore } from "@/lib/auth-store";
import { authApi } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Salons", href: "/salons" },
  { label: "Services", href: "/services" },
  { label: "Cities", href: "/cities" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth);


  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      clearAuth();
      setDropdownOpen(false);
    },
    onError: () => {
      // Clear local auth anyway if token has expired
      clearAuth();
      setDropdownOpen(false);
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-zinc-900"
        >
          <Scissors className="text-rose-500" size={22} />
          {SITE_NAME}
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-600">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-zinc-900 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {user && (
            <Link
              href="/bookings"
              className="hover:text-zinc-900 transition-colors"
            >
              My Bookings
            </Link>
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3 relative">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 text-sm font-medium text-zinc-700 hover:text-zinc-900 focus:outline-none bg-zinc-50 border border-zinc-200 rounded-full px-3 py-1.5"
              >
                <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center font-bold text-xs">
                  {user.firstName[0]}
                </div>
                <span>{user.firstName}</span>
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-white border border-zinc-100 rounded-xl shadow-lg py-1 z-50 text-sm text-zinc-700"
                  >
                    <div className="px-4 py-2 border-b border-zinc-50 text-xs text-zinc-400">
                      Signed in as <span className="font-semibold text-zinc-700">{user.email}</span>
                    </div>
                    <Link
                      href="/bookings"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-50 transition-colors text-zinc-600"
                    >
                      <Calendar size={15} />
                      My Bookings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-4 py-2 hover:bg-zinc-50 transition-colors text-red-500 text-left"
                    >
                      <LogOut size={15} />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Button
              size="sm"
              className="bg-rose-500 hover:bg-rose-600 text-white"
              asChild
            >
              <Link href="/auth">Login / Sign Up</Link>
            </Button>
          )}
        </div>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-t border-zinc-100 px-4 py-4 flex flex-col gap-4 text-sm text-zinc-700"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link href="/bookings" onClick={() => setMenuOpen(false)}>
                My Bookings
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="text-red-500 text-left font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/auth" onClick={() => setMenuOpen(false)}>
              Login / Sign Up
            </Link>
          )}
        </motion.div>
      )}
    </header>
  );
}
