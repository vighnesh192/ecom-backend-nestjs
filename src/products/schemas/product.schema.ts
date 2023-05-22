import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, SchemaTypes, Types } from "mongoose";
import { PublicFile } from "../../files/schemas/publicFile.schema";
import { User } from "../../users/schemas/user.schema";

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    price: number;

    @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
    sellerId: Types.ObjectId

    @Prop({ type: [SchemaTypes.ObjectId], ref: PublicFile.name })
    images: String[];

    @Prop()
    category: String;

    @Prop()
    stock: Number;
}

export const ProductSchema = SchemaFactory.createForClass(Product)