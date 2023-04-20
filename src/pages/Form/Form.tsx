/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/jsx-no-comment-textnodes */
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../helpers/hooks/redux';
import { useTelegram } from '../../helpers/hooks/useTelegram';
import { getTotalPrice } from '../../helpers/utils/getTotalPrice';
import { splitNum } from '../../helpers/utils/splitNum';
import './Form.css';

function Form() {
  const navigate = useNavigate();
  const { order } = useAppSelector((state) => state.order);
  const [comment, setComment] = useState('');
  const [address, setAddress] = useState('');
  const { tg, user, onClose } = useTelegram();

  const onSendData = useCallback(async () => {
    const result = order.map((item) => {
      return {
        product_id: item.food.id,
        product_name: item.food.name,
        count: item.count,
        price: item.food.price,
      };
    });
    const data = {
      comment,
      address,
      member: user.id,
      orders: result,
      total_price: getTotalPrice(order),
    };
    // tg.showAlert('Success');

    const sendData = axios.post('https://kvartirabar.uz/order', data).then((res) => onClose());
  }, [address, comment, onClose, order, tg, user.id]);

  const navigateToFoodsPage = () => {
    navigate('/');
  };

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
    if (!address) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [address, tg.MainButton]);

  const onChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  return (
    <div className="form">
      <div className="form-body">
        <div className="form-title">
          <h3>ВАШ ЗАКАЗ</h3>
          <p onClick={navigateToFoodsPage}>Изменить</p>
        </div>
        {order.map((item) => (
          <div key={item.food.id} className="form-orders">
            <div className="form-orders-main">
              <div className="form-orders-img">
                <LazyLoadImage
                  alt={item.food.name}
                  src={item.food.avatar}
                  effect="blur"
                  width={50}
                  height={50}
                  style={{ marginRight: '15px' }}
                />
              </div>

              <div className="form-order-name">
                <p>{item.food.name}</p>
                <p className="form-order-count">{item.count}x</p>
              </div>
            </div>
            <div>{splitNum(+item.food.price * item.count)} сум</div>
          </div>
        ))}
        <div className="form-orders">
          <div className="form-orders-main">
            <div className="form-order-name">
              <p>Доставка :</p>
            </div>
          </div>
          <div>{splitNum(5000)} сум</div>
        </div>
        <div className="form-orders">
          <div className="form-orders-main">
            <div className="form-order-name">
              <p>Общий :</p>
            </div>
          </div>
          <div className="form-order-total">{splitNum(getTotalPrice(order) + 5000)} сум</div>
        </div>
      </div>
      <div className="form-inputs">
        <input
          className="form-input"
          type="text"
          placeholder="Напишите свой адрес"
          value={address}
          onChange={onChangeAddress}
        />
        <input
          className="form-input"
          type="text"
          placeholder="Оставьте комментарии"
          value={comment}
          onChange={onChangeComment}
        />
        <button onClick={onSendData} type="button">
          Click
        </button>
      </div>
    </div>
  );
}

export default Form;
