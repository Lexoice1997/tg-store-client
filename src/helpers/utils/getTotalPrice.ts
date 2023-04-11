import { FoodOrder } from '../../store/slices/orderSlice';

export const getTotalPrice = (items: FoodOrder[]): number => {
  return items.reduce((acc: number, item: FoodOrder) => {
    // eslint-disable-next-line no-return-assign
    return (acc += +item.food.price * +item.count);
  }, 0);
};
