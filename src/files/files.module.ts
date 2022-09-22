import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from '../products/products.module';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { PublicFile, PublicFileSchema } from './schemas/publicFile.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: PublicFile.name, schema: PublicFileSchema }]),
    forwardRef(() => ProductsModule),
  ],
  controllers: [FilesController],
  providers: [FilesService]
})
export class FilesModule { }
