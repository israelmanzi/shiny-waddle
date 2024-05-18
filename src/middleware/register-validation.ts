import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import validator from 'validator';
import User from '../models/User';

const registerSchema = z
  .object({
    name: z.string().min(3),
    email: z.string().min(6).email(),
    phoneNumber: z
      .string()
      .refine(validator.isMobilePhone, { message: 'Invalid phone number' }),
    password: z.string().min(6),
  })
  .strict();

type RequestBody = {
  email: string;
};
export const registerValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) res.status(400).send(parsed.error);
  else {
    const { email: emailFromBody }: RequestBody = req.body;
    const emailExist = await User.findOne({ email: emailFromBody });
    if (emailExist) res.status(400).send({ message: 'Email already exists!' });
    else next();
  }
};
