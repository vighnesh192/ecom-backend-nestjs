import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from './schemas/category.schema';
import { CreateCategoryDto } from './dtos/createCategoryDto';

@Controller('categories')
export class CategoriesController {
    constructor(
        private CategoriesService: CategoriesService
    ) { }

    @Get()
    async getAllCategories(): Promise<Category[]> {
        return this.CategoriesService.find({});
    }

    @Post()
    async postCategory(
        @Body() category: CreateCategoryDto,
    ): Promise<Category> {
        return this.CategoriesService.createCategory(category);
    }
}
