import mongoose from "mongoose";

export class CreateProductDto {
    name: String;
    description: String;
    stock: Number;
    category: String;
    price: Number;
    images: mongoose.Types.ObjectId[];
    sellerId: mongoose.Types.ObjectId;
    _id?: mongoose.Types.ObjectId;
}