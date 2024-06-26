import { Response, Request } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

type RequestBody = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
};
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, phoneNumber, password }: RequestBody = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({
    name,
    email,
    phoneNumber,
    password: hashedPassword,
  });
  try {
    await user.save();
    res.send({ user });
  } catch (err) {
    res.status(400).send(err);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const token = jwt.sign({ id: req.userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  res.header('Authorization', `Bearer ${token}`).send({ token });
};
