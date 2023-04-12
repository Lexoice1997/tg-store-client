import React, { useCallback, useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useAppSelector } from '../../helpers/hooks/redux';
import { useTelegram } from '../../helpers/hooks/useTelegram';
import { splitNum } from '../../helpers/utils/splitNum';
import './Form.css';

function Form() {
  const { order } = useAppSelector((state) => state.order);
  const [country, setCountry] = useState('');
  const [street, setStreet] = useState('');
  const [subject] = useState('physical');
  const { tg } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      country,
      street,
      subject,
    };
    tg.sendData(JSON.stringify(data));
  }, [country, street, subject, tg]);

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
    if (!street || !country) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [country, street, tg.MainButton]);

  const onChangeCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };

  const onChangeStreet = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStreet(e.target.value);
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
                className="food-img"
                width="100%"
                height={50}
              />
              <p>
                {item.food.name} <span>{item.count}x</span>
              </p>
            </div>
            <div>{splitNum(+item.food.price)} сум</div>
          </div>
        ))}
      </div>
      <input
        className="input"
        type="text"
        placeholder="Имя"
        value={country}
        onChange={onChangeCountry}
      />
    </div>
  );
}

export default Form;
