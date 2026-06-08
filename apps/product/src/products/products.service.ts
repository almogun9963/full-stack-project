import { Injectable, NotFoundException } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { CreateProductDto } from "./dto/create-product.input";
import { FiltersProductInput } from "./dto/filters-product.input";
import { Product } from "./entities/product.entity";

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}

  async addProduct(createProductInput: CreateProductDto): Promise<Product> {
    return this.productsRepository.create(createProductInput);
  }

  async findAllProducts(filters: FiltersProductInput): Promise<Product[]> {
    return this.productsRepository.findWithFilters(filters);
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    if (product == null) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  async removeProduct(id: string): Promise<string> {
    await this.productsRepository.deleteById(id);
    return "Successfully deleted product with id: " + id;
  }
}
