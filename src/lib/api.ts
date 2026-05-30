import { apiClient } from "./api-client";
import { User } from "./auth-store";

// Types
export interface Salon {
  id: string;
  slug: string;
  name: string;
  description?: string;
  phone: string;
  email?: string;
  city: string;
  address: string;
  avgRating: number;
  reviewsCount: number;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  category: string;
  tags: string[];
  price?: number;
  priceLabel?: string;
  coverImageUrl?: string;
  images: any[];
  services: Service[];
  staff: Staff[];
  reviews: Review[];
}

export interface Service {
  id: string;
  name: string;
  description?: string;
  durationMins: number;
  price: number;
  category: string;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  rating: number;
}

export interface Review {
  id: string;
  rating: number;
  comment?: string;
  user: {
    firstName: string;
    lastName: string;
  };
  createdAt: string;
}

export interface Booking {
  id: string;
  salonId: string;
  scheduledAt: string;
  endsAt: string;
  totalAmount: number;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  notes?: string;
  salon: {
    name: string;
    city: string;
  };
  items: Array<{
    id: string;
    service: {
      name: string;
    };
    staff: {
      name: string;
    };
    price: number;
  }>;
}

// 1. Auth Services
export const authApi = {
  login: async (dto: any) => {
    const { data } = await apiClient.post<{ accessToken: string; user: User }>(
      "/auth/login",
      dto
    );
    return data;
  },

  register: async (dto: any) => {
    const { data } = await apiClient.post<{ accessToken: string }>("/auth/register", dto);
    return data;
  },

  logout: async () => {
    const { data } = await apiClient.post("/auth/logout");
    return data;
  },

  getMe: async () => {
    const { data } = await apiClient.get<User>("/users/me");
    return data;
  },
};

// 2. Salons Services
export const salonsApi = {
  search: async (params?: {
    city?: string;
    category?: string;
    search?: string;
    minRating?: number;
    page?: number;
    limit?: number;
  }) => {
    const { data } = await apiClient.get<{
      salons: Salon[];
      total: number;
      page: number;
      limit: number;
    }>("/salons", { params });
    return data;
  },

  getBySlug: async (slug: string) => {
    const { data } = await apiClient.get<Salon>(`/salons/${slug}`);
    return data;
  },
};

// 3. Bookings Services
export const bookingsApi = {
  create: async (dto: {
    salonId: string;
    staffId: string;
    serviceIds: string[];
    scheduledAt: string;
    notes?: string;
  }) => {
    const { data } = await apiClient.post<Booking>("/bookings", dto);
    return data;
  },

  getMyBookings: async () => {
    const { data } = await apiClient.get<Booking[]>("/bookings");
    return data;
  },

  getById: async (id: string) => {
    const { data } = await apiClient.get<Booking>(`/bookings/id/${id}`);
    return data;
  },

  cancel: async (id: string) => {
    const { data } = await apiClient.patch<Booking>(`/bookings/${id}/cancel`);
    return data;
  },

  getAvailableSlots: async (params: { staffId: string; date: string }) => {
    const { data } = await apiClient.get<string[]>("/bookings/available-slots", {
      params,
    });
    return data;
  },
};
