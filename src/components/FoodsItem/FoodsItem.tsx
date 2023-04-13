import React, { useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useAppDispatch, useAppSelector } from '../../helpers/hooks/redux';
import { splitNum } from '../../helpers/utils/splitNum';
import { decrementOrder, incrementOrder } from '../../store/slices/orderSlice';
import { Food } from '../../types/Food';
import './FoodsItem.css';

function FoodsItem({ id, name, price, avatar }: Food) {
  const { order } = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();
  const [count, setCount] = React.useState<number>();

  const increment = () => {
    dispatch(incrementOrder({ food: { id, name, price, avatar }, count: 1 }));
  };

  const decrement = () => {
    dispatch(decrementOrder({ food: { id, name, price, avatar }, count: 1 }));
  };

  useEffect(() => {
    const foodCount = order.filter((item) => item.food.id === id);
    setCount(foodCount.length ? foodCount[0]?.count : 0);
  }, [id, order]);

  return (
    <div className="food">
      <LazyLoadImage
        alt={name}
        src={avatar}
        effect="blur"
        className="food-img"
        width="100%"
        height={130}
      />
      <div className="food-inner">
        <div className="food-info">
          <div>
            <h2 className="food-name">{name}</h2>
          </div>
          <div>
            <p className="food-price">{splitNum(+price)} сум</p>
          </div>
        </div>
        <div className="food-btns">
          <button type="button" onClick={decrement} disabled={count === 0}>
            <svg
              width="25"
              height="25"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18.25 12.25H5.75" />
            </svg>
          </button>
          <p>{count}</p>
          <button type="button" onClick={increment}>
            <svg
              width="25"
              height="25"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 5.75v12.5" />
              <path d="M18.25 12H5.75" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodsItem;
