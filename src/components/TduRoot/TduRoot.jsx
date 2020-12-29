import React from 'react';
import TduInfoAndControlContainer from './TduInfoAndControl/TduInfoAndControlContainer';
import TduSchemeContainer from './TduScheme/TduSchemeContainer';
import s from './TduRoot.module.css';
import TduBasketContainer from './TduBasket/TduBasketContainer';

const TduRoot = (props) => {
  return(
    <div>
      <div className={s.tduInfoAndControlContainer}><TduInfoAndControlContainer /></div>
      <div className={s.tduSchemeContainer}><TduSchemeContainer /></div>
      <div className={s.tduBasketContainer}><TduBasketContainer /></div>
    </div>
  );
}

export default TduRoot;