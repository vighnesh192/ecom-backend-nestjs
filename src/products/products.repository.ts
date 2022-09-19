import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EntityRepository } from "../database/entity.repository";
import { Product, ProductDocument } from "./schemas/product.schema";

export class ProductsRepository extends EntityRepository<ProductDocument> {
    constructor(@InjectModel(Product.name) productModel: Model<ProductDocument>) {
        super(productModel)
    }
}