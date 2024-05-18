import { Request, Response } from 'express';
import Restaurant from '../models/Restaurant';

export const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.find({}).populate({ path: 'menu' });
    res.send({ restaurants });
  } catch (err) {
    res.status(400).send;
  }
};

export const createRestaurant = async (req: Request, res: Response) => {
  const { name, location, menu } = req.body;
  const restaurant = new Restaurant({ name, location, menu });
  try {
    await restaurant.save();
    res.send({ restaurant });
  } catch (err) {
    res.status(400).send(err);
  }
};

export const getRestaurant = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const restaurant = await Restaurant.findById(id).populate({ path: 'menu' });
    res.send({ restaurant });
  } catch (err) {
    res.status(400).send(err);
  }
};

export const getRestaurantMenu = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const restaurant = await Restaurant.findById(id).populate({ path: 'menu' });
    res.send({ menu: restaurant?.menu! });
  } catch (err) {
    res.status(400).send(err);
  }
};

export const getRestaurantMenuByMenuId = async (
  req: Request,
  res: Response
) => {
  const { menuId } = req.params;
  try {
    const restaurant = await Restaurant.findOne({
      'menu._id': menuId,
    }).populate({ path: 'menu' });
    res.send({ menu: restaurant?.menu! });
  } catch (err) {
    res.status;
  }
};
