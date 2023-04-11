import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useAppDispatch } from '../../helpers/hooks/redux';
import { splitNum } from '../../helpers/utils/splitNum';
import { decrementOrder, incrementOrder } from '../../store/slices/orderSlice';
import { Food } from '../../types/Food';
import './FoodsItem.css';

function FoodsItem({ id, name, description, price, avatar }: Food) {
  const dispatch = useAppDispatch();
  const [count, setCount] = React.useState(0);

  const increment = () => {
    setCount((prev) => prev + 1);
    dispatch(incrementOrder({ food: { id, name, price }, count: 1 }));
  };

  const decrement = () => {
    setCount((prev) => prev - 1);
    dispatch(decrementOrder({ food: { id, name, price }, count: 1 }));
  };

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
            {/* <p className="food-description">{description}</p> */}
          </div>
          <div>
            <p className="food-price">{splitNum(price)} сум</p>
          </div>
        </div>
        <div className="food-btns">
          <button type="button" onClick={decrement} disabled={count === 0}>
            -
          </button>
          <p>{count}</p>
          <button type="button" onClick={increment}>
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodsItem;
