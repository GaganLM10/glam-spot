export interface Service {
  id: number;
  label: string;
  icon: string;
}

export interface City {
  id: number;
  name: string;
  image: string;
  salons: number;
}

export interface Offer {
  code: string;
  discount: string;
  description: string;
  expiry: string;
}