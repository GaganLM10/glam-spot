"use client";

import { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  MapPin,
  Star,
  Clock,
  Phone,
  Mail,
  ArrowLeft,
  CheckCircle,
  Loader2,
  Calendar,
  X,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/auth-store";
import { salonsApi, bookingsApi } from "@/lib/api";

export default function SalonDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  // Booking Modal States
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedStaff, setSelectedStaff] = useState<string>("");
  const [bookingDate, setBookingDate] = useState<string>("");
  const [bookingTime, setBookingTime] = useState<string>("09:00");
  const [bookingNotes, setBookingNotes] = useState<string>("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState("");

  // Fetch Salon Data from Backend
  const { data: salon, isLoading, isError } = useQuery({
    queryKey: ["salon", slug],
    queryFn: () => salonsApi.getBySlug(slug),
  });

  // Booking Mutation
  const createBookingMutation = useMutation({
    mutationFn: bookingsApi.create,
    onSuccess: () => {
      setBookingSuccess(true);
      setSelectedServices([]);
      setSelectedStaff("");
      setBookingDate("");
      setBookingNotes("");
    },
    onError: (err: any) => {
      setBookingError(
        err.response?.data?.message || "Failed to confirm booking. The slot might be full."
      );
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50">
        <Loader2 className="animate-spin text-rose-500 mb-4" size={40} />
        <p className="text-zinc-500 text-sm font-medium">Loading salon profile...</p>
      </div>
    );
  }

  if (isError || !salon) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50">
        <p className="text-5xl mb-4">😕</p>
        <h2 className="text-xl font-semibold text-zinc-800 mb-2">
          Salon not found
        </h2>
        <p className="text-zinc-400 text-sm mb-6">
          The salon you're looking for doesn't exist or is currently offline.
        </p>
        <Button asChild className="bg-rose-500 hover:bg-rose-600 text-white">
          <Link href="/salons">Back to Salons</Link>
        </Button>
      </div>
    );
  }

  // Live calculation of booking details
  const chosenServicesObjects = salon.services.filter((s) =>
    selectedServices.includes(s.id)
  );
  const totalDuration = chosenServicesObjects.reduce(
    (acc, s) => acc + s.durationMins,
    0
  );
  const totalAmount = chosenServicesObjects.reduce((acc, s) => acc + Number(s.price), 0);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError("");

    if (!user) {
      router.push("/auth");
      return;
    }

    if (selectedServices.length === 0) {
      setBookingError("Please select at least one service.");
      return;
    }

    if (!selectedStaff) {
      setBookingError("Please choose a staff member.");
      return;
    }

    if (!bookingDate) {
      setBookingError("Please pick a booking date.");
      return;
    }

    const scheduledAt = new Date(`${bookingDate}T${bookingTime}:00`).toISOString();

    createBookingMutation.mutate({
      salonId: salon.id,
      staffId: selectedStaff,
      serviceIds: selectedServices,
      scheduledAt,
      notes: bookingNotes || undefined,
    });
  };

  const handleBookNowBtn = () => {
    if (!user) {
      router.push("/auth");
    } else {
      setBookingModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 relative">
      {/* Hero Cover */}
      <div className="bg-linear-to-br from-zinc-100 to-zinc-200 h-64 relative overflow-hidden">
        {salon.coverImageUrl ? (
          <img
            src={salon.coverImageUrl}
            alt={salon.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-r from-rose-400 to-orange-400 opacity-20" />
        )}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 max-w-7xl mx-auto">
          <Link
            href="/salons"
            className="inline-flex items-center gap-1 text-white/80 hover:text-white text-sm mb-4 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Salons
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left — Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Name Card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm"
            >
              <div className="flex items-start justify-between flex-wrap gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs bg-rose-100 text-rose-500 font-medium px-2 py-0.5 rounded-full">
                      {salon.category || "Salon & Spa"}
                    </span>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700`}
                    >
                      Open
                    </span>
                  </div>
                  <h1 className="text-2xl font-bold text-zinc-900 mb-1">
                    {salon.name}
                  </h1>
                  <div className="flex items-center gap-1 text-zinc-400 text-sm">
                    <MapPin size={13} />
                    {salon.address}, {salon.city}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-amber-500 font-bold text-xl justify-end">
                    <Star size={18} fill="currentColor" />
                    {salon.avgRating}
                  </div>
                  <p className="text-zinc-400 text-xs">
                    {salon.reviewsCount || salon.reviews?.length || 0} reviews
                  </p>
                </div>
              </div>

              {salon.description && (
                <p className="text-zinc-500 text-sm leading-relaxed mt-4">
                  {salon.description}
                </p>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {(salon.tags || ["Haircut", "Facial"]).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-zinc-100 text-zinc-500 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-zinc-900 mb-4">
                Services Menu
              </h2>
              <div className="space-y-3">
                {salon.services.length === 0 ? (
                  <p className="text-zinc-400 text-sm">No services listed yet.</p>
                ) : (
                  salon.services.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between p-3 rounded-xl border border-zinc-100 hover:border-rose-200 hover:bg-rose-50/30 transition-all group"
                    >
                      <div>
                        <p className="text-sm font-medium text-zinc-800 group-hover:text-rose-600 transition-colors">
                          {service.name}
                        </p>
                        <div className="flex items-center gap-1 text-zinc-400 text-xs mt-0.5">
                          <Clock size={11} />
                          {service.durationMins} mins · {service.category}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-zinc-900">
                          ₹{service.price}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>

            {/* Staff */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-zinc-900 mb-4">
                Specialist Stylists
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {salon.staff.length === 0 ? (
                  <p className="text-zinc-400 text-sm">No specialists assigned.</p>
                ) : (
                  salon.staff.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-3 p-3 rounded-xl border border-zinc-100"
                    >
                      <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 font-bold text-sm shrink-0">
                        {member.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-800">
                          {member.name}
                        </p>
                        <p className="text-xs text-zinc-400">{member.role}</p>
                      </div>
                      <div className="ml-auto flex items-center gap-1 text-amber-500 text-xs font-semibold">
                        <Star size={11} fill="currentColor" />
                        {member.rating || 5.0}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-zinc-900 mb-4">
                Customer Reviews
              </h2>
              <div className="space-y-4">
                {salon.reviews.length === 0 ? (
                  <p className="text-zinc-400 text-sm">No reviews yet. Be the first!</p>
                ) : (
                  salon.reviews.map((t) => (
                    <div
                      key={t.id}
                      className="border-b border-zinc-100 last:border-0 pb-4 last:pb-0"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 font-bold text-xs">
                          {t.user?.firstName?.[0] || "U"}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-zinc-800">
                            {t.user?.firstName} {t.user?.lastName}
                          </p>
                          <div className="flex gap-0.5">
                            {Array.from({ length: Math.round(t.rating) }).map((_, j) => (
                              <Star
                                key={j}
                                size={11}
                                className="text-amber-400 fill-amber-400"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      {t.comment && (
                        <p className="text-sm text-zinc-500 leading-relaxed">
                          "{t.comment}"
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>

          {/* Right — Sidebar Details */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm sticky top-24"
            >
              <p className="text-sm text-zinc-500 mb-1">Starting from</p>
              <p className="text-3xl font-bold text-zinc-900 mb-4">
                ₹{salon.price || 400}
                <span className="text-base font-normal text-zinc-400">
                  {" "}
                  /service
                </span>
              </p>

              <Button
                onClick={handleBookNowBtn}
                className="w-full bg-rose-500 hover:bg-rose-600 text-white mb-3 py-5"
              >
                Book Appointment
              </Button>

              <div className="mt-5 space-y-3 border-t border-zinc-100 pt-5">
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <Clock size={14} className="text-zinc-400 shrink-0" />
                  {salon.openTime || "09:00"} – {salon.closeTime || "21:00"}
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <Phone size={14} className="text-zinc-400 shrink-0" />
                  {salon.phone}
                </div>
                {salon.email && (
                  <div className="flex items-center gap-2 text-sm text-zinc-500">
                    <Mail size={14} className="text-zinc-400 shrink-0" />
                    {salon.email}
                  </div>
                )}
              </div>

              <div className="mt-5 border-t border-zinc-100 pt-5 space-y-2">
                {[
                  "Instant Confirmation",
                  "Free Cancellation",
                  "Verified Salon",
                ].map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 text-xs text-zinc-500"
                  >
                    <CheckCircle
                      size={13}
                      className="text-green-500 shrink-0"
                    />
                    {feature}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Booking Interactive Modal */}
      <AnimatePresence>
        {bookingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBookingModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative z-10 flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between shrink-0">
                <h3 className="font-bold text-lg text-zinc-900">Book Appointment</h3>
                <button
                  onClick={() => setBookingModalOpen(false)}
                  className="text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Success View */}
              {bookingSuccess ? (
                <div className="p-8 text-center flex-1 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-green-50 text-green-500 flex items-center justify-center mb-4 animate-bounce">
                    <CheckCircle size={36} />
                  </div>
                  <h4 className="font-bold text-xl text-zinc-900 mb-1">
                    Booking Confirmed!
                  </h4>
                  <p className="text-zinc-500 text-sm mb-6 max-w-sm">
                    Your appointment has been booked. You will receive notifications about updates.
                  </p>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setBookingSuccess(false);
                        setBookingModalOpen(false);
                      }}
                    >
                      Close Window
                    </Button>
                    <Button
                      className="bg-rose-500 hover:bg-rose-600 text-white"
                      onClick={() => {
                        setBookingSuccess(false);
                        setBookingModalOpen(false);
                        router.push("/bookings");
                      }}
                    >
                      View Bookings
                    </Button>
                  </div>
                </div>
              ) : (
                /* Form View */
                <form
                  onSubmit={handleBookingSubmit}
                  className="overflow-y-auto flex-1 p-6 space-y-5"
                >
                  {bookingError && (
                    <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs flex items-start gap-2">
                      <AlertCircle size={15} className="shrink-0 mt-0.5" />
                      <span>{bookingError}</span>
                    </div>
                  )}

                  {/* Step 1: Select Services */}
                  <div>
                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wide block mb-2">
                      1. Select Services (Select Multiple)
                    </label>
                    <div className="space-y-2 max-h-36 overflow-y-auto border border-zinc-100 rounded-xl p-2 bg-zinc-50">
                      {salon.services.map((s) => {
                        const checked = selectedServices.includes(s.id);
                        return (
                          <label
                            key={s.id}
                            className={`flex items-center justify-between p-2 rounded-lg cursor-pointer border transition-all ${
                              checked
                                ? "bg-rose-50/50 border-rose-200"
                                : "bg-white border-zinc-200/60"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedServices([...selectedServices, s.id]);
                                  } else {
                                    setSelectedServices(
                                      selectedServices.filter((id) => id !== s.id)
                                    );
                                  }
                                }}
                                className="accent-rose-500"
                              />
                              <span className="text-sm font-medium text-zinc-800">
                                {s.name}
                              </span>
                            </div>
                            <span className="text-sm text-zinc-950 font-bold">
                              ₹{s.price}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Select Staff */}
                  <div>
                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wide block mb-2">
                      2. Choose a Stylist
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {salon.staff.map((m) => {
                        const active = selectedStaff === m.id;
                        return (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => setSelectedStaff(m.id)}
                            className={`p-3 rounded-xl border text-left transition-all ${
                              active
                                ? "bg-rose-500 text-white border-rose-500"
                                : "bg-zinc-50 text-zinc-700 border-zinc-200 hover:border-rose-300"
                            }`}
                          >
                            <p className="text-xs font-bold">{m.name}</p>
                            <p className={`text-[10px] ${active ? "text-white/80" : "text-zinc-400"}`}>
                              {m.role}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 3: Date and Time */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wide block mb-2">
                        3. Choose Date
                      </label>
                      <input
                        type="date"
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm text-zinc-800 outline-none focus:border-rose-300"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wide block mb-2">
                        4. Choose Time
                      </label>
                      <input
                        type="time"
                        required
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm text-zinc-800 outline-none focus:border-rose-300"
                      />
                    </div>
                  </div>

                  {/* Step 4: Notes */}
                  <div>
                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wide block mb-2">
                      Special Notes (Optional)
                    </label>
                    <textarea
                      placeholder="Any specific requests or requirements..."
                      value={bookingNotes}
                      onChange={(e) => setBookingNotes(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2.5 text-sm text-zinc-800 outline-none focus:border-rose-300 h-16 resize-none"
                    />
                  </div>

                  {/* Summary Bar */}
                  {selectedServices.length > 0 && (
                    <div className="p-3 bg-zinc-50 border border-zinc-100 rounded-xl flex justify-between items-center text-xs">
                      <div>
                        <p className="text-zinc-500">
                          {selectedServices.length} service(s) selected
                        </p>
                        <p className="font-semibold text-zinc-800">
                          Duration: {totalDuration} mins
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-zinc-400">Total Price</p>
                        <p className="font-bold text-rose-500 text-base">
                          ₹{totalAmount}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Footer Actions */}
                  <div className="pt-4 border-t border-zinc-100 flex gap-3 shrink-0">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 py-4"
                      onClick={() => setBookingModalOpen(false)}
                      disabled={createBookingMutation.isPending}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={createBookingMutation.isPending}
                      className="flex-1 bg-rose-500 hover:bg-rose-600 text-white py-4 flex items-center justify-center gap-2"
                    >
                      {createBookingMutation.isPending ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <>
                          Confirm Booking <Calendar size={14} />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
