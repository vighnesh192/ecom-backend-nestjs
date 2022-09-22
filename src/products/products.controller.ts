import { Controller, Get, Post, Body, Param, UseInterceptors, UploadedFiles, Request, UseGuards } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dtos/createProductDto.dto';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';
import * as path from 'path';
import { JwtGuard } from '../auth/guards/jwt.guard';

const fileFilter = (req, file, callback) => {
    let ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpeg' && ext !== 'jpg') {
        req.fileValidationError = 'Invalid file type';
        return callback(new Error('Invalid file type'), false);
    }
    return callback(null, true);
};

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
    @UseGuards(JwtGuard)
    @UseInterceptors(
        FilesInterceptor('files[]', 20, {
            fileFilter: fileFilter,
        })
    )
    async postProduct(
        @UploadedFiles() images: [Express.Multer.File],
        @Body() product: CreateProductDto,
        @Request() req,
    ): Promise<Product> {
        return this.ProductsService.createProduct(images, product, req.user.id);
    }
}
