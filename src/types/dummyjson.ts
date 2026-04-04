export type DummyJsonProduct = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  stock: number;
  brand?: string;
  thumbnail?: string;
  images?: string[];
  shippingInformation?: string;
  warrantyInformation?: string;
  availabilityStatus?: string;
  returnPolicy?: string;
};

export type DummyJsonProductsResponse = {
  products: DummyJsonProduct[];
  total: number;
  skip: number;
  limit: number;
};

export type DummyJsonCategory = {
  slug: string;
  name: string;
  url: string;
};
