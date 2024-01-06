import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'Customer', timestamps: true })
export class Customer extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  image: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: Date.now() })
  score: number;

  @Prop()
  desciption: string;

  @Prop()
  note: string;

  @Prop({ required: true })
  address: string;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
