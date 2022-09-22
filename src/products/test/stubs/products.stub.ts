import mongoose from "mongoose"
import { Product } from "../../schemas/product.schema"

export const ProductStub = (): Product => {
    return {
        name: 'Chair',
        description: 'Plastic Chair',
        price: 500,
        sellerId: new mongoose.Types.ObjectId(),
        category: 'Furniture',
        stock: 5,
        images: [new mongoose.Types.ObjectId()]
    }
}