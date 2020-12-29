import React from 'react';
import s from './Input.module.css';
import RetInput from './RetInput/RetInput';
import SupInput from './SupInput/SupInput';

const Input = (props) => {
  return(
    <div className={s.input}>
      <SupInput
        bvAndFilterDn={props.bvAndFilterDn}
        isPartner={props.isPartner}
        partnerTypeDn={props.partnerTypeDn}

        switchBvAndFilterDn={props.switchBvAndFilterDn}
        switchPartnerTypeDn={props.switchPartnerTypeDn}
      />
      <RetInput
        aptTypeDn={props.aptTypeDn}
        bvAndFilterDn={props.bvAndFilterDn}
        heatMetersLoc={props.heatMetersLoc}
        heatMetersType={props.heatMetersType}
        isAddInputFilter={props.isAddInputFilter}
        side={props.side}

        switchAptTypeDn={props.switchAptTypeDn}
        switchBvAndFilterDn={props.switchBvAndFilterDn}
        switchHeatMetersType={props.switchHeatMetersType}
      />
    </div>
  );
}

export default Input;