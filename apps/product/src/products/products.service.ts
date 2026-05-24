import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateProductInput } from './dto/create-product.input';
// import { UpdateProductInput } from './dto/update-product.input';
// import { SHARED_GREETING } from '@repo/shared';
import { InjectModel } from '@nestjs/mongoose';
import { Product, productDocument } from './product.schema';
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

  async findAllProducts(): Promise<productDocument[]> {
    return this.productModel.find().exec();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} product`;
  // }

  // update(id: number, updateProductInput: UpdateProductInput) {
  //   return `This action updates a #${id} product`;
  // }

  async removeProduct(productId: number): Promise<string> {
    await this.productModel.findOneAndDelete({ productId }).exec();
    return 'Successfully deleted product with productId: ' + productId;
  }
}
