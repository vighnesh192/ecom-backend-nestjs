import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EntityRepository } from "../database/entity.repository";
import { Product, ProductDocument } from "./schemas/product.schema";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductsRepository extends EntityRepository<ProductDocument> {
    constructor(@InjectModel(Product.name) productModel: Model<ProductDocument>) {
        super(productModel)
    }
}