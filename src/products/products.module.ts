import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesModule } from '../files/files.module';
import { FilesRepository } from '../files/files.repository';
import { FilesService } from '../files/files.service';
import { PublicFile, PublicFileSchema } from '../files/schemas/publicFile.schema';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';
import { Product, ProductSchema } from './schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: PublicFile.name, schema: PublicFileSchema }]),
    forwardRef(() => FilesModule),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository, FilesService, FilesRepository]
})
export class ProductsModule { }
