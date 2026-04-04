export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  categorySlug: string;
  brand: string;
  price: number;
  rating: number;
  stock: number;
  featured: boolean;
  imageUrl?: string;
  imageBackground: string;
  gallery: string[];
  shippingInformation?: string;
  warrantyInformation?: string;
  availabilityStatus?: string;
  returnPolicy?: string;
};

export type CategoryOption = {
  label: string;
  value: string;
};

export type ProductListing = {
  items: Product[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  categories: CategoryOption[];
  search: string;
  category: string;
};
