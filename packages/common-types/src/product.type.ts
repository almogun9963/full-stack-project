import { Tag } from "./tag.type.js";

export interface ProductType {
  id?: string;

  name?: string;

  price?: number;

  company?: string;

  productType?: string;

  ratings?: number[];

  description?: string;

  size?: string;

  tags?: Tag[];

  imageUrl?: string;

  isAvailable?: boolean;

  category?: string;
}
