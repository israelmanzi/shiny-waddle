import { Schema, model, Document } from 'mongoose';
import { MenuItemSchema, IMenuItem } from './Menu';

interface IRestaurant extends Document {
  name: string;
  location: string;
  menu: IMenuItem[];
}

const RestaurantSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    menu: { type: [MenuItemSchema], required: true },
  },
  { timestamps: true }
);

export default model<IRestaurant>('Restaurant', RestaurantSchema);
