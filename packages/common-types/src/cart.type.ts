import { ProductType } from "product.type";

export interface CartType {
  id: string;

  userId: string;

  productsIds: string[];

  products: ProductType[];

  deletedAt: Date;

  createdAt: Date;

  updatedAt: Date;
}
