import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type PublicFileDocument = PublicFile & Document;

export class PublicFile {
    @Prop()
    url: String;

    @Prop()
    key: String
}

export const PublicFileSchema = SchemaFactory.createForClass(PublicFile);