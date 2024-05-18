import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  date: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: 3,
      max: 255,
    },
    email: {
      type: String,
      required: true,
      max: 255,
    },
    phoneNumber: {
      type: String,
      required: true,
      max: 255,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      min: 6,
    },
  },
  { timestamps: true }
);

export default model<IUser>('User', UserSchema);
