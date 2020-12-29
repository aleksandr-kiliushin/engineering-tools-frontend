import React from 'react';
import s from './RetInput.module.css';
import RetInputFilter from './RetInputFilter/RetInputFilter';
import RetInputHeatMeter from './RetInputHeatMeter/RetInputHeatMeter';
import RetApt from './RetApt/RetApt';
import RetInputUnionNutValve from './RetInputUnionNutValve/RetInputUnionNutValve';

const RetInput = (props) => {
  return(
    <div className={s.retInput}>
      <RetInputUnionNutValve bvAndFilterDn={props.bvAndFilterDn} switchBvAndFilterDn={props.switchBvAndFilterDn}/>
      <RetInputHeatMeter
        heatMetersType={props.heatMetersType}
        switchHeatMetersType={props.switchHeatMetersType}
        side={props.side}
        heatMetersLoc={props.heatMetersLoc}
      />
      <RetApt switchAptTypeDn={props.switchAptTypeDn} aptTypeDn={props.aptTypeDn}/>
      <RetInputFilter
        isAddInputFilter={props.isAddInputFilter}
        bvAndFilterDn={props.bvAndFilterDn}

        switchBvAndFilterDn={props.switchBvAndFilterDn}
      />
    </div>
  );
}

export default RetInput;