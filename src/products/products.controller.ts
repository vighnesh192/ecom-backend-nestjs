import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateProductDto } from './dtos/createProductDto.dto';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';

@Controller('products')
export class ProductsController {
    constructor(private ProductsService: ProductsService) { }

    @Get()
    async getAllProducts(): Promise<Product[]> {
        return this.ProductsService.find({});
    }

    @Get(':id')
    async getProduct(@Param() params): Promise<Product> {
        return this.ProductsService.findOne({ _id: params.id })
    }

    @Post()
    async postProduct(@Body() product: CreateProductDto): Promise<Product> {
        return this.ProductsService.createProduct(product);
    }
}
