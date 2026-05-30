"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  XCircle,
  ArrowLeft,
  Loader2,
  Scissors,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/auth-store";
import { bookingsApi } from "@/lib/api";

export default function BookingsPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const initialized = useAuthStore((state) => state.initialized);

  // Route to auth if not logged in
  useEffect(() => {
    if (initialized && !user) {
      router.push("/auth");
    }
  }, [user, initialized]); // eslint-disable-line react-hooks/exhaustive-deps

  // Query User Bookings
  const {
    data: bookings = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["my-bookings"],
    queryFn: bookingsApi.getMyBookings,
    enabled: !!user,
  });

  // Cancel Booking Mutation
  const cancelMutation = useMutation({
    mutationFn: bookingsApi.cancel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-bookings"] });
    },
  });

  if (!initialized || (initialized && !user)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50">
        <Loader2 className="animate-spin text-rose-500 mb-4" size={40} />
        <p className="text-zinc-500 text-sm font-medium">
          Redirecting you to login...
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50">
        <Loader2 className="animate-spin text-rose-500 mb-4" size={40} />
        <p className="text-zinc-500 text-sm font-medium">
          Fetching your appointments...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50">
        <p className="text-4xl mb-4">⚠️</p>
        <h2 className="text-lg font-semibold text-zinc-800 mb-1">
          Failed to load bookings
        </h2>
        <p className="text-zinc-400 text-sm mb-6">
          Could not fetch appointments from backend.
        </p>
        <Button
          onClick={() => refetch()}
          className="bg-rose-500 hover:bg-rose-600 text-white"
        >
          Retry
        </Button>
      </div>
    );
  }

  // Split bookings into Upcoming vs Past/Cancelled
  const now = new Date();
  const upcomingBookings = bookings.filter(
    (b) => new Date(b.scheduledAt) >= now && b.status !== "CANCELLED",
  );
  const pastBookings = bookings.filter(
    (b) => new Date(b.scheduledAt) < now || b.status === "CANCELLED",
  );

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-700 border-green-200";
      case "PENDING":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "CANCELLED":
        return "bg-red-100 text-red-700 border-red-200";
      case "COMPLETED":
        return "bg-zinc-100 text-zinc-600 border-zinc-200";
      default:
        return "bg-zinc-100 text-zinc-600 border-zinc-200";
    }
  };

  const handleCancelBooking = (bookingId: string) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      cancelMutation.mutate(bookingId);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href="/salons"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-900 transition-colors mb-2"
            >
              <ArrowLeft size={13} /> Back to Salons
            </Link>
            <h1 className="text-2xl font-bold text-zinc-950 flex items-center gap-2">
              <Calendar className="text-rose-500" size={24} />
              My Appointments
            </h1>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-zinc-200 text-zinc-600"
          >
            <Link href="/salons">Book Another</Link>
          </Button>
        </div>

        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-16 text-center">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
              <Scissors size={28} />
            </div>
            <h2 className="text-lg font-bold text-zinc-900 mb-1">
              No appointments yet
            </h2>
            <p className="text-zinc-500 text-sm mb-6 max-w-sm mx-auto">
              You haven't scheduled any services. Discover top-rated salons and
              book your slot now!
            </p>
            <Button
              asChild
              className="bg-rose-500 hover:bg-rose-600 text-white"
            >
              <Link href="/salons">Explore Salons</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Upcoming Bookings */}
            <div>
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">
                Upcoming Appointments ({upcomingBookings.length})
              </h3>
              {upcomingBookings.length === 0 ? (
                <div className="bg-zinc-50 border border-dashed border-zinc-200 rounded-xl p-8 text-center text-sm text-zinc-400">
                  No upcoming appointments scheduled.
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingBookings.map((b) => (
                    <motion.div
                      key={b.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-rose-100 transition-colors"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-zinc-900">
                            {b.salon?.name || "Salon"}
                          </h4>
                          <span
                            className={`text-[10px] font-semibold border px-2 py-0.5 rounded-full ${getStatusBadgeClass(
                              b.status,
                            )}`}
                          >
                            {b.status}
                          </span>
                        </div>

                        <div className="flex flex-col gap-1 text-xs text-zinc-500">
                          <span className="flex items-center gap-1.5">
                            <Calendar size={13} className="shrink-0" />
                            {new Date(b.scheduledAt).toLocaleDateString(
                              "en-US",
                              {
                                weekday: "short",
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock size={13} className="shrink-0" />
                            {new Date(b.scheduledAt).toLocaleTimeString(
                              "en-US",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin size={13} className="shrink-0" />
                            {b.salon?.city || "Local Area"}
                          </span>
                        </div>

                        {/* Services ordered details */}
                        <div className="pt-2 border-t border-zinc-50">
                          <p className="text-[10px] font-semibold text-zinc-400 mb-1">
                            SERVICES
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {(b.items || []).map((item) => (
                              <span
                                key={item.id}
                                className="text-[11px] bg-zinc-50 border border-zinc-150 text-zinc-700 px-2 py-0.5 rounded-md"
                              >
                                {item.service?.name} · with {item.staff?.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-row md:flex-col items-start md:items-end justify-between w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-zinc-50">
                        <div className="mb-2 md:text-right">
                          <p className="text-[10px] text-zinc-400 uppercase">
                            Amount Due
                          </p>
                          <p className="font-bold text-zinc-950 text-lg">
                            ₹{b.totalAmount}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          onClick={() => handleCancelBooking(b.id)}
                          disabled={cancelMutation.isPending}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50/50 text-xs px-3 py-1 flex items-center gap-1"
                        >
                          <XCircle size={14} />
                          Cancel
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Past Bookings */}
            <div>
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">
                Past & Cancelled Appointments ({pastBookings.length})
              </h3>
              {pastBookings.length === 0 ? (
                <div className="bg-zinc-50 border border-dashed border-zinc-200 rounded-xl p-8 text-center text-sm text-zinc-400">
                  No past appointments records.
                </div>
              ) : (
                <div className="space-y-3 opacity-80">
                  {pastBookings.map((b) => (
                    <div
                      key={b.id}
                      className="bg-white rounded-xl border border-zinc-100 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h4 className="font-semibold text-sm text-zinc-800">
                            {b.salon?.name || "Salon"}
                          </h4>
                          <span
                            className={`text-[9px] font-semibold border px-2 py-0.5 rounded-full ${getStatusBadgeClass(
                              b.status,
                            )}`}
                          >
                            {b.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-400">
                          <span className="flex items-center gap-1">
                            <Calendar size={11} />
                            {new Date(b.scheduledAt).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={11} />
                            {new Date(b.scheduledAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-bold text-zinc-600">
                          ₹{b.totalAmount}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
