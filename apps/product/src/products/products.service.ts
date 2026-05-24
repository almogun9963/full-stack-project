import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateProductInput } from './dto/create-product.input';
import { InjectModel } from '@nestjs/mongoose';
import { Product, productDocument } from './product.schema';
import { FiltersProductInput } from './dto/filters-product.input';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async addProduct(
    createProductInput: CreateProductInput,
  ): Promise<productDocument> {
    const createdProduct = new this.productModel(createProductInput);
    const savedProduct = await createdProduct.save();
    return savedProduct;
  }

  async findAllProducts(filters: FiltersProductInput): Promise<Product[]> {
    if (filters != null) {
      const filtersToMongo: any = {};
      if (filters.price != null) {
        filtersToMongo.price = {
          $gte: filters.price.from,
          $lte: filters.price.to,
        };
      }

      if (filters.company != null) {
        filtersToMongo.company = filters.company;
      }

      if (filters.tag != null) {
        filtersToMongo.tag = filters.tag;
      }
      return this.productModel.find(filtersToMongo).exec();
    }

    return this.productModel.find().exec();
  }

  async getProductById(productId: number): Promise<Product> {
    const product = await this.productModel.findOne({ productId }).exec();

    if (product == null) {
      throw new Error('Product with productId ' + productId + ' not found');
    }

    return product;
  }

  async removeProduct(productId: number): Promise<string> {
    await this.productModel.findOneAndDelete({ productId }).exec();
    return 'Successfully deleted product with productId: ' + productId;
  }
}
