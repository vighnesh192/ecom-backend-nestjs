import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PublicFileDocument = PublicFile & Document;

@Schema()
export class PublicFile {
    @Prop({ required: true })
    url: String;

    @Prop({ required: true })
    key: String
}

export const PublicFileSchema = SchemaFactory.createForClass(PublicFile);