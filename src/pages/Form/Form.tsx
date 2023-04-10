import React, { useCallback, useEffect, useState } from 'react';
import { useTelegram } from '../../helpers/hooks/useTelegram';
import './Form.css';

function Form() {
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
      <h3>Введите ваши данные</h3>
      <input
        className="input"
        type="text"
        placeholder="Имя"
        value={country}
        onChange={onChangeCountry}
      />
      <input
        className="input"
        type="text"
        placeholder="Номер телефона"
        value={street}
        onChange={onChangeStreet}
      />
    </div>
  );
}

export default Form;
