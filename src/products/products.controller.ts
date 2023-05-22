import { Controller, Get, Post, Body, Param, UseInterceptors, UploadedFiles, Request, UseGuards } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dtos/createProductDto.dto';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';
import * as path from 'path';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { FilesService } from '../files/files.service';
import { PublicFile } from '../files/schemas/publicFile.schema';

const fileFilter = (req, file, callback) => {
    let ext = path.extname(file.originalname);
    if (ext === '.png' || ext === '.jpeg' || ext === 'jpg') {
        return callback(null, true);
    }
    req.fileValidationError = 'Invalid file type';
    return callback(new Error('Invalid file type'), false);
};

@Controller('products')
export class ProductsController {
    constructor(private ProductsService: ProductsService,
        private FilesService: FilesService
    ) { }

    @Get()
    async getAllProducts(): Promise<Product[]> {
        return this.ProductsService.find({});
    }

    @Get(':id')
    async getProduct(@Param() params): Promise<Product> {
        return this.ProductsService.findOne({ _id: params.id })
    }

    @Get('seller/:sellerId')
    async getProductsBySeller(@Param() params): Promise<Product[]> {
        console.log("HERE")
        let products: Promise<Product[]> = this.ProductsService.find({ sellerId: params.sellerId });
        (await products).map(async prod => {
            let images: String[];
            images = prod.images.map(img => {
                let imgDoc: PublicFile;
                this.FilesService.findOne({ _id: img }).then(file => {
                    console.log("FILE", file)
                    imgDoc = file
                })
                console.log("IMGDOC", imgDoc)
                return imgDoc.url;
            })
            prod.images = images;
            console.log("IMAGES", prod.images)
        })
        console.log("PRODUCTS", products)
        return products;
    }

    @Post()
    @UseGuards(JwtGuard)
    @UseInterceptors(
        FilesInterceptor('files[]', 20, {
            fileFilter: fileFilter,
        })
    )
    async postProduct(
        @UploadedFiles() images: Express.Multer.File[],
        @Body() product: CreateProductDto,
        @Request() req,
    ): Promise<Product> {
        return this.ProductsService.createProduct(images, product, req.user.id);
    }
}
