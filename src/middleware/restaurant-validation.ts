import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

const menuItemSchema = z.object({
  name: z.string(),
  price: z.number(),
  description: z.string().optional(),
});

const restaurantSchema = z
  .object({
    name: z.string().min(3),
    location: z.string().min(3),
    menu: z.array(menuItemSchema),
  })
  .strict();

export const restaurantValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const parsed = restaurantSchema.safeParse(req.body);
  if (!parsed.success) res.status(400).send(parsed.error);
  else next();
};
