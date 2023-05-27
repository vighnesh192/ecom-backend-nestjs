import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { FilterQuery } from 'mongoose';
import { Category } from './schemas/category.schema';
import { CreateCategoryDto } from './dtos/createCategoryDto';

@Injectable()
export class CategoriesService {
    constructor(
        private readonly CategoriesRepository: CategoriesRepository
    ) { }

    async find(categoryFilterQuery: FilterQuery<Category>): Promise<Category[]> {
        return this.CategoriesRepository.find(categoryFilterQuery);
    }

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        return this.CategoriesRepository.create(createCategoryDto);
    }
}
