import React from 'react';
import s from './TduInfo.module.css';

const TduInfo = (props) => {

  const onAddToBasket = () => {
    props.addTduToBasket({
      price: '999 €',
      code: props.code,
      designation: props.designation,
    });
  }

  return(
    <div className={s.tduInfo}>
      <div className={s.tduCode}>{props.code}</div>
      <div className={s.tduDesignation}>{props.designation}</div>
      <button onClick={onAddToBasket}>Add to basket</button>
    </div>
  );
}

export default TduInfo;