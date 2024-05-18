import { Schema, Document } from 'mongoose';

export interface IMenuItem {
  name: string;
  price: number;
  description?: string;
}

export interface IMenu extends Document {
  items: IMenuItem[];
}

export const MenuItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
});
