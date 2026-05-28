"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Eye, EyeOff, Scissors, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_NAME } from "@/lib/constants";

type Tab = "login" | "register";

export default function AuthPage() {
  const [tab, setTab] = useState<Tab>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Login form state
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  // Register form state
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "CUSTOMER",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // will wire to API later
    console.log("Login:", loginForm);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // will wire to API later
    console.log("Register:", registerForm);
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-bold text-xl text-zinc-900"
          >
            <Scissors className="text-rose-500" size={22} />
            {SITE_NAME}
          </Link>
          <p className="text-zinc-400 text-sm mt-2">
            {tab === "login"
              ? "Welcome back! Sign in to continue."
              : "Create your account to get started."}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-zinc-100">
            {(["login", "register"] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-4 text-sm font-medium transition-colors relative ${
                  tab === t
                    ? "text-rose-500"
                    : "text-zinc-400 hover:text-zinc-600"
                }`}
              >
                {t === "login" ? "Login" : "Sign Up"}
                {tab === t && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-rose-500"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Forms */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              {tab === "login" ? (
                <motion.form
                  key="login"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleLogin}
                  className="space-y-4"
                >
                  {/* Email */}
                  <div>
                    <label className="text-xs font-medium text-zinc-500 block mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={loginForm.email}
                      onChange={(e) =>
                        setLoginForm({ ...loginForm, email: e.target.value })
                      }
                      placeholder="priya@example.com"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all"
                    />
                  </div>

                  {/* Password */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-medium text-zinc-500">
                        Password
                      </label>
                      <button
                        type="button"
                        className="text-xs text-rose-500 hover:text-rose-600"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={loginForm.password}
                        onChange={(e) =>
                          setLoginForm({
                            ...loginForm,
                            password: e.target.value,
                          })
                        }
                        placeholder="Enter your password"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 pr-10 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                      >
                        {showPassword ? (
                          <EyeOff size={15} />
                        ) : (
                          <Eye size={15} />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center gap-2 py-5"
                  >
                    Login <ArrowRight size={15} />
                  </Button>

                  <p className="text-center text-xs text-zinc-400">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setTab("register")}
                      className="text-rose-500 hover:text-rose-600 font-medium"
                    >
                      Sign up
                    </button>
                  </p>
                </motion.form>
              ) : (
                <motion.form
                  key="register"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleRegister}
                  className="space-y-4"
                >
                  {/* Name Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-zinc-500 block mb-1.5">
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        value={registerForm.firstName}
                        onChange={(e) =>
                          setRegisterForm({
                            ...registerForm,
                            firstName: e.target.value,
                          })
                        }
                        placeholder="Priya"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-zinc-500 block mb-1.5">
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        value={registerForm.lastName}
                        onChange={(e) =>
                          setRegisterForm({
                            ...registerForm,
                            lastName: e.target.value,
                          })
                        }
                        placeholder="Sharma"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="text-xs font-medium text-zinc-500 block mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={registerForm.email}
                      onChange={(e) =>
                        setRegisterForm({
                          ...registerForm,
                          email: e.target.value,
                        })
                      }
                      placeholder="priya@example.com"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="text-xs font-medium text-zinc-500 block mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={registerForm.phone}
                      onChange={(e) =>
                        setRegisterForm({
                          ...registerForm,
                          phone: e.target.value,
                        })
                      }
                      placeholder="+91 98000 00000"
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all"
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <label className="text-xs font-medium text-zinc-500 block mb-1.5">
                      I am a
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { value: "CUSTOMER", label: "👤 Customer" },
                        { value: "SALON_OWNER", label: "✂️ Salon Owner" },
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() =>
                            setRegisterForm({
                              ...registerForm,
                              role: option.value,
                            })
                          }
                          className={`py-2.5 rounded-xl border text-sm font-medium transition-all ${
                            registerForm.role === option.value
                              ? "bg-rose-500 text-white border-rose-500"
                              : "bg-zinc-50 text-zinc-600 border-zinc-200 hover:border-rose-300"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="text-xs font-medium text-zinc-500 block mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={registerForm.password}
                        onChange={(e) =>
                          setRegisterForm({
                            ...registerForm,
                            password: e.target.value,
                          })
                        }
                        placeholder="Min. 8 characters"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 pr-10 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                      >
                        {showPassword ? (
                          <EyeOff size={15} />
                        ) : (
                          <Eye size={15} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="text-xs font-medium text-zinc-500 block mb-1.5">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirm ? "text" : "password"}
                        required
                        value={registerForm.confirmPassword}
                        onChange={(e) =>
                          setRegisterForm({
                            ...registerForm,
                            confirmPassword: e.target.value,
                          })
                        }
                        placeholder="Re-enter your password"
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 pr-10 text-sm text-zinc-800 placeholder:text-zinc-400 outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                      >
                        {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                    {registerForm.confirmPassword &&
                      registerForm.password !==
                        registerForm.confirmPassword && (
                        <p className="text-xs text-red-500 mt-1">
                          Passwords do not match
                        </p>
                      )}
                  </div>

                  <Button
                    type="submit"
                    disabled={
                      registerForm.password !== registerForm.confirmPassword &&
                      registerForm.confirmPassword.length > 0
                    }
                    className="w-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center gap-2 py-5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Create Account <ArrowRight size={15} />
                  </Button>

                  <p className="text-center text-xs text-zinc-400">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setTab("login")}
                      className="text-rose-500 hover:text-rose-600 font-medium"
                    >
                      Login
                    </button>
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        <p className="text-center text-xs text-zinc-400 mt-6">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="text-rose-500 hover:underline">
            Terms of Use
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-rose-500 hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
