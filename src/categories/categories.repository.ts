import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EntityRepository } from "../database/entity.repository";
import { Category, CategoryDocument } from "./schemas/category.schema";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CategoriesRepository extends EntityRepository<CategoryDocument> {
    constructor(@InjectModel(Category.name) categoryModel: Model<CategoryDocument>) {
        super(categoryModel)
    }
}