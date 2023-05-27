import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './schemas/category.schema';
import { CategoriesRepository } from './categories.repository';
import { CategoriesController } from './categories.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository]
})
export class CategoriesModule { }
