import { Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
import { CreateProductDto } from './dtos/createProductDto.dto';
import { UpdateProductDto } from './dtos/updateProductDto.dto';
import { ProductsRepository } from './products.repository';
import { Product } from './schemas/product.schema';

@Injectable()
export class ProductsService {
    constructor(private readonly ProductsRepository: ProductsRepository) { }

    async findOne(productFilterQuery: FilterQuery<Product>): Promise<Product> {
        return this.ProductsRepository.findOne(productFilterQuery);
    }

    async find(productFilterQuery: FilterQuery<Product>): Promise<Product[]> {
        return this.ProductsRepository.find(productFilterQuery);
    }

    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        return this.ProductsRepository.create(createProductDto);
    }

    async updateProduct(productFilterQuery: FilterQuery<Product>, updateProductDto: UpdateProductDto): Promise<Product> {
        return this.ProductsRepository.findOneAndUpdate(productFilterQuery, updateProductDto);
    }
}
