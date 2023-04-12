import React, { useCallback, useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useAppSelector } from '../../helpers/hooks/redux';
import { useTelegram } from '../../helpers/hooks/useTelegram';
import { getTotalPrice } from '../../helpers/utils/getTotalPrice';
import { splitNum } from '../../helpers/utils/splitNum';
import './Form.css';

function Form() {
  const { order } = useAppSelector((state) => state.order);
  const [comment, setComment] = useState('');
  const { tg } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      comment,
    };
    tg.sendData(JSON.stringify(data));
  }, [comment, tg]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData);
    return () => {
      tg.offEvent('mainButtonClicked', onSendData);
    };
  }, [onSendData, tg]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: 'Отправить данные',
    });
  }, [tg.MainButton]);

  useEffect(() => {
    if (!comment) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [comment, tg.MainButton]);

  const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  return (
    <div className="form">
      <div className="form-body">
        <div className="form-title">
          <h3>ВАШ ЗАКАЗ</h3>
          <p>Изменить</p>
        </div>
        {order.map((item) => (
          <div key={item.food.id} className="form-orders">
            <div className="form-orders-main">
              <LazyLoadImage
                alt={item.food.name}
                src={item.food.avatar}
                effect="blur"
                width="100%"
                height={50}
              />
              <div className="form-order-name">
                <p>{item.food.name}</p>
                <p>{item.count}x</p>
              </div>
            </div>
            <div>{splitNum(+item.food.price)} сум</div>
          </div>
        ))}
        <div className="form-orders">
          <div className="form-orders-main">
            <div className="form-order-name">
              <p>Доставка</p>
            </div>
          </div>
          <div>{splitNum(5000)} сум</div>
        </div>
        <div className="form-orders">
          <div className="form-orders-main">
            <div className="form-order-name">
              <p>Общий:</p>
            </div>
          </div>
          <div>{splitNum(getTotalPrice(order) + 5000)} сум</div>
        </div>
      </div>
      <input
        className="form-input"
        type="text"
        placeholder="Оставьте комментарии"
        value={comment}
        onChange={onChangeComment}
      />
    </div>
  );
}

export default Form;
