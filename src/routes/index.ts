import { Router } from 'express';
import { verify } from '../middleware/verify-token';
import {
  createRestaurant,
  getAllRestaurants,
  getRestaurant,
  getRestaurantMenu,
  getRestaurantMenuByMenuId,
} from '../controllers/restaurant';
import { restaurantValidation } from '../middleware/restaurant-validation';

const router = Router();

router
  .get('/restaurants', verify, getAllRestaurants)
  .post('/restaurants', [verify, restaurantValidation], createRestaurant)
  .get('/restaurants/:id', verify, getRestaurant)
  .get('/restaurants/:id/menu', verify, getRestaurantMenu)
  .get('/restaurants/menu/:menuId', verify, getRestaurantMenuByMenuId);

export default router;
