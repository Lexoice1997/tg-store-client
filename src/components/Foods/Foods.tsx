import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks/redux';
import { useTelegram } from '../../helpers/hooks/useTelegram';
import { getTotalPrice } from '../../helpers/utils/getTotalPrice';
import { useGetFoodsByCategoryIdQuery } from '../../store/services/apiService';
import { setFoods } from '../../store/slices/foodSlice';
import { Food } from '../../types/Food';
import FoodsItem from '../FoodsItem/FoodsItem';
import './Foods.css';
import FoodsSkeleton from './FoodsSkeleton';
import { splitNum } from '../../helpers/utils/splitNum';

function Foods() {
  const dispatch = useAppDispatch();
  const { tg } = useTelegram();
  const { categoryId, categoryName } = useAppSelector((state) => state.category);
  const { foods } = useAppSelector((state) => state.food);
  const { order } = useAppSelector((state) => state.order);
  const { data, isLoading } = useGetFoodsByCategoryIdQuery(categoryId);

  useEffect(() => {
    if (data) {
      dispatch(setFoods(data));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (order.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Заказать ${splitNum(getTotalPrice(order))}`,
      });
    }
  }, [order, tg.MainButton]);

  if (!isLoading) {
    return <FoodsSkeleton />;
  }

  return (
    <div className="foods">
      <h1>{categoryName}</h1>
      <div className="foods-container">
        {foods?.map((item: Food) => (
          <FoodsItem
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            categoryId={categoryId}
            price={item.price}
            avatar={item.avatar}
          />
        ))}
      </div>
    </div>
  );
}

export default Foods;
