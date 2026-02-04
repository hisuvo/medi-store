export interface Medicine {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  quantity: number;
  image?: string | null;
  stock?: number | null;
  manufacturer?: string | null;
  isActive?: boolean | null;
  categoryId: string;
  sellerId: string;
  createdAt: string;
  updatedAt: string;
}
