import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { addressType } from '../types/address.type';

// UserDocument would consist of properties of both User Schema and Document object
export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    profilePic: string;

    @Prop()
    address: addressType;

    @Prop()
    phoneNo: number;
}

export const UserSchema = SchemaFactory.createForClass(User)