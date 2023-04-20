import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks/redux';
import { useTelegram } from '../../helpers/hooks/useTelegram';
import { getTotalPrice } from '../../helpers/utils/getTotalPrice';
import { splitNum } from '../../helpers/utils/splitNum';
import { useGetFoodsByCategoryIdQuery } from '../../store/services/apiService';
import { setFoods } from '../../store/slices/foodSlice';
import { Food } from '../../types/Food';
import FoodsItem from '../FoodsItem/FoodsItem';
import './Foods.css';
import FoodsSkeleton from './FoodsSkeleton';

function Foods() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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

  const navigateToFormPage = () => {
    navigate('/form');
  };

  useEffect(() => {
    tg.onEvent('mainButtonClicked', navigateToFormPage);
    return () => {
      tg.offEvent('mainButtonClicked', navigateToFormPage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tg]);

  useEffect(() => {
    if (order.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Заказать (Общий: ${splitNum(getTotalPrice(order))} сум)`,
      });
    }
  }, [order, tg.MainButton]);

  if (isLoading) {
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
        {/* <button onClick={navigateToFormPage} type="button">
          Click
        </button> */}
      </div>
    </div>
  );
}

export default Foods;
