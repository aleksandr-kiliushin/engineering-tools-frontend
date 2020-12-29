import React from 'react';
import s from './SupInput.module.css';
import Partner from './Partner/Partner';
import SupInputFilter from './SupInputFilter/SupInputFilter';
import SupInputUnionNutValve from './SupInputUnionNutValve/SupInputUnionNutValve';

const SupInput = (props) => {
  return(
    <div className={s.supInput}>
      <SupInputUnionNutValve bvAndFilterDn={props.bvAndFilterDn} switchBvAndFilterDn={props.switchBvAndFilterDn} />
      <SupInputFilter bvAndFilterDn={props.bvAndFilterDn} switchBvAndFilterDn={props.switchBvAndFilterDn} />    
      <Partner partnerTypeDn={props.partnerTypeDn} isPartner={props.isPartner} switchPartnerTypeDn={props.switchPartnerTypeDn} />
    </div>
  );
}

export default SupInput;