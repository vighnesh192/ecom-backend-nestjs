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

    @Prop({
        type: Object
    })
    address: addressType;

    @Prop()
    phoneNo: number;

    @Prop({ default: 'Customer' })
    type: string;
}

export const UserSchema = SchemaFactory.createForClass(User)