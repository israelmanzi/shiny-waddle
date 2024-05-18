import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import User from '../models/User';

type RequestBody = {
  email: string;
  password: string;
};

const loginSchema = z
  .object({
    email: z.string().min(6).email(),
    password: z.string().min(6),
  })
  .strict();

export const loginValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) res.status(400).send(parsed.error);
  else {
    const { email: emailFromBody, password: passwordFromBody }: RequestBody =
      req.body;
    const user = await User.findOne({ email: emailFromBody });
    if (user) {
      const validPass = await bcrypt.compare(passwordFromBody, user.password);
      if (validPass) {
        req.userId = user._id;
        next();
      } else res.status(400).send({ message: 'Invalid Email or Password!!!' });
    } else res.status(400).send({ message: 'Invalid Email or Password!!!' });
  }
};
