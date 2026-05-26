import { Injectable } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.input';
import { InjectModel } from '@nestjs/mongoose';

import { FiltersProductInput } from './dto/filters-product.input';
import { Product } from './entities/product.entity';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async addProduct(createProductInput: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductInput);
    const savedProduct = await createdProduct.save();
    return savedProduct;
  }

  async findAllProducts(filters: FiltersProductInput): Promise<Product[]> {
    if (filters != null) {
      const filtersToMongo: FilterQuery<Product> = {};
      if (filters.price != null) {
        filtersToMongo.price = {
          $gte: filters.price.from,
          $lte: filters.price.to,
        };
      }

      if (filters.company != null) {
        filtersToMongo.company = filters.company;
      }

      if (filters.tags != null) {
        filtersToMongo.tags = { $in: filters.tags };
      }

      return this.productModel.find(filtersToMongo).exec();
    }
    const aaa = await this.productModel.find().exec();
    console.log(aaa);
    return this.productModel.find().exec();
  }

  async getProductById(id: string): Promise<Product> {
    const product = await this.productModel.findOne({ _id: id }).exec();

    if (product == null) {
      throw new Error('Product with id ' + id + ' not found');
    }

    return product;
  }

  async removeProduct(id: string): Promise<string> {
    await this.productModel.findOneAndDelete({ _id: id }).exec();
    return 'Successfully deleted product with id: ' + id;
  }
}
