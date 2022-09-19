import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    @Prop()
    name: string;

    @Prop({
        type: Object
    })
    description: string;

    @Prop()
    price: number;

    @Prop()
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

    @Prop()
    images: [String];

    @Prop()
    category: String;

    @Prop()
    stock: Number;
}

export const ProductSchema = SchemaFactory.createForClass(Product)