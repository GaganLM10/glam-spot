"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Search, MapPin, Star, SlidersHorizontal, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CITIES_DATA } from "@/lib/data";
import { salonsApi } from "@/lib/api";

const CATEGORIES = [
  "All",
  "Salon & Spa",
  "Makeup & Hair",
  "Spa & Massage",
  "Nail Studio",
  "Bridal & Makeup",
  "Haircut & Color",
];
const RATINGS = ["All", "4.9+", "4.7+", "4.5+"];
const SORT_OPTIONS = [
  "Relevance",
  "Rating",
];

export default function SalonsPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRating, setSelectedRating] = useState("All");
  const [sortBy, setSortBy] = useState("Relevance");
  const [showFilters, setShowFilters] = useState(false);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const cities = ["All", ...CITIES_DATA.map((c) => c.name)];

  // Parse rating filter
  const minRating = selectedRating !== "All" 
    ? parseFloat(selectedRating.replace("+", "")) 
    : undefined;

  // React Query fetch
  const { data, isLoading, isError } = useQuery({
    queryKey: [
      "salons", 
      debouncedSearch, 
      selectedCity, 
      selectedCategory, 
      minRating
    ],
    queryFn: () => salonsApi.search({
      search: debouncedSearch || undefined,
      city: selectedCity !== "All" ? selectedCity : undefined,
      category: selectedCategory !== "All" ? selectedCategory : undefined,
      minRating,
    }),
  });

  const salons = data?.salons || [];

  // Client side sorting if requested
  const sortedSalons = [...salons];
  if (sortBy === "Rating") {
    sortedSalons.sort((a, b) => b.avgRating - a.avgRating);
  }

  const clearFilters = () => {
    setSearch("");
    setDebouncedSearch("");
    setSelectedCity("All");
    setSelectedCategory("All");
    setSelectedRating("All");
    setSortBy("Relevance");
  };

  const hasActiveFilters =
    search ||
    selectedCity !== "All" ||
    selectedCategory !== "All" ||
    selectedRating !== "All";

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Page Header */}
      <div className="bg-white border-b border-zinc-100 px-4 py-10">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-zinc-900 mb-1"
          >
            Find Salons Near You
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-zinc-500 mb-6"
          >
            {salons.length} salons found dynamically
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-2 max-w-2xl"
          >
            <div className="flex items-center gap-2 flex-1 bg-zinc-100 rounded-xl px-4 py-3">
              <Search size={16} className="text-zinc-400 shrink-0" />
              <input
                type="text"
                placeholder="Search by salon, service, or city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent w-full outline-none text-sm text-zinc-700 placeholder:text-zinc-400"
              />
              {search && (
                <button onClick={() => setSearch("")}>
                  <X size={14} className="text-zinc-400 hover:text-zinc-600" />
                </button>
              )}
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 border-zinc-200 text-zinc-600"
            >
              <SlidersHorizontal size={15} />
              Filters
              {hasActiveFilters && (
                <span className="bg-rose-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  !
                </span>
              )}
            </Button>
          </motion.div>

          {/* Filter Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-zinc-50 rounded-2xl border border-zinc-200 flex flex-wrap gap-6"
            >
              {/* City */}
              <div>
                <p className="text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wide">
                  City
                </p>
                <div className="flex flex-wrap gap-2">
                  {cities.map((city) => (
                    <button
                      key={city}
                      onClick={() => setSelectedCity(city)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                        selectedCity === city
                          ? "bg-rose-500 text-white border-rose-500"
                          : "bg-white border-zinc-200 text-zinc-600 hover:border-rose-300"
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div>
                <p className="text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wide">
                  Category
                </p>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                        selectedCategory === cat
                          ? "bg-rose-500 text-white border-rose-500"
                          : "bg-white border-zinc-200 text-zinc-600 hover:border-rose-300"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <p className="text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wide">
                  Min Rating
                </p>
                <div className="flex flex-wrap gap-2">
                  {RATINGS.map((r) => (
                    <button
                      key={r}
                      onClick={() => setSelectedRating(r)}
                      className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                        selectedRating === r
                          ? "bg-rose-500 text-white border-rose-500"
                          : "bg-white border-zinc-200 text-zinc-600 hover:border-rose-300"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {hasActiveFilters && (
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="text-xs text-rose-500 hover:text-rose-600 underline underline-offset-2"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Sort + Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-zinc-500">
            <span className="font-semibold text-zinc-900">
              {sortedSalons.length}
            </span>{" "}
            salons found
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm text-zinc-700 bg-white border border-zinc-200 rounded-lg px-3 py-1.5 outline-none cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading / Error States */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 text-zinc-400">
            <Loader2 className="animate-spin text-rose-500 mb-4" size={36} />
            <p className="text-sm font-medium">Fetching best salons...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-24">
            <p className="text-4xl mb-4">⚠️</p>
            <p className="text-zinc-600 font-medium mb-1">Failed to fetch salons</p>
            <p className="text-zinc-400 text-sm mb-4">Please check if the backend service is running.</p>
            <Button variant="outline" onClick={clearFilters}>
              Retry
            </Button>
          </div>
        ) : sortedSalons.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-zinc-600 font-medium mb-1">No salons found</p>
            <p className="text-zinc-400 text-sm mb-4">
              Try adjusting your search or filters
            </p>
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedSalons.map((salon, i) => (
              <motion.div
                key={salon.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Link href={`/salons/${salon.slug}`} className="block group">
                  <div className="bg-white rounded-2xl border border-zinc-100 hover:shadow-lg transition-all duration-300 overflow-hidden">
                    {/* Image placeholder */}
                    <div className="h-44 bg-linear-to-br from-zinc-100 to-zinc-200 relative">
                      {salon.coverImageUrl && (
                        <img
                          src={salon.coverImageUrl}
                          alt={salon.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                      <div className="absolute top-3 left-3 bg-white text-xs font-medium text-zinc-600 px-2 py-1 rounded-full shadow-sm">
                        {salon.category || "Salon & Spa"}
                      </div>
                      <div
                        className={`absolute top-3 right-3 text-xs font-medium px-2 py-1 rounded-full ${
                          salon.isOpen ? "bg-green-100 text-green-700" : "bg-zinc-100 text-zinc-500"
                        }`}
                      >
                        {salon.isOpen ? "Open" : "Closed"}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-semibold text-zinc-900 group-hover:text-rose-500 transition-colors">
                          {salon.name}
                        </h3>
                        <div className="flex items-center gap-1 text-amber-500 text-sm font-semibold shrink-0 ml-2">
                          <Star size={13} fill="currentColor" />
                          {salon.avgRating}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-zinc-400 text-xs mb-3">
                        <MapPin size={11} />
                        {salon.city} · {salon.reviewsCount || 0} reviews
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {(salon.tags || ["Haircut", "Grooming"]).slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-zinc-700">
                          {salon.priceLabel || `₹${salon.price || 500} onwards`}
                        </span>
                        <Button
                          size="sm"
                          className="bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-xs"
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
