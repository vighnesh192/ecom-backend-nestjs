import { Injectable } from '@nestjs/common';
import mongoose, { FilterQuery } from 'mongoose';
import { FilesService } from '../files/files.service';
import { CreateProductDto } from './dtos/createProductDto.dto';
import { UpdateProductDto } from './dtos/updateProductDto.dto';
import { ProductsRepository } from './products.repository';
import { Product } from './schemas/product.schema';
const ObjectID = require("mongodb").ObjectId;
type ObjectID = typeof import("mongodb").ObjectId;

@Injectable()
export class ProductsService {
    constructor(
        private readonly ProductsRepository: ProductsRepository,
        private readonly FilesService: FilesService
    ) { }

    async findOne(productFilterQuery: FilterQuery<Product>): Promise<Product> {
        return this.ProductsRepository.findOne(productFilterQuery);
    }

    async find(productFilterQuery: FilterQuery<Product>): Promise<Product[]> {
        return this.ProductsRepository.find(productFilterQuery);
    }

    async createProduct(images: Express.Multer.File[], createProductDto: CreateProductDto, sellerId: string): Promise<Product> {
        let uploadedImages = await this.FilesService.uploadPublicFile(images);
        createProductDto.sellerId = sellerId;
        createProductDto.images = uploadedImages.map(image => image._id.toHexString());
        return this.ProductsRepository.create(createProductDto);
    }

    async updateProduct(productFilterQuery: FilterQuery<Product>, updateProductDto: UpdateProductDto): Promise<Product> {
        return this.ProductsRepository.findOneAndUpdate(productFilterQuery, updateProductDto);
    }
}
