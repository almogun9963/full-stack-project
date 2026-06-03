import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.input';
import { FiltersProductInput } from './dto/filters-product.input';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(createProductInput: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductInput);
    return await createdProduct.save();
  }

  async findWithFilters(filters: FiltersProductInput): Promise<Product[]> {
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

    return this.productModel.find().exec();
  }

  async findById(id: string): Promise<Product | null> {
    return await this.productModel.findOne({ _id: id }).exec();
  }

  async deleteById(id: string): Promise<void> {
    await this.productModel.findOneAndDelete({ _id: id }).exec();
  }
}
