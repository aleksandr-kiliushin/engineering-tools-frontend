import {aptTypeDnArr, branchBalansTypeDnArr, bvAndFilterDnArr, designationToCodeMap, heatMetersTypeArr,
partnerTypeDnArr,} from "../utils/tduModelStorage";

export const getAptTypeDnSelector = (state) => {
  return aptTypeDnArr[state.tduRoot.aptTypeDnId];
};

export const getBvAndFilterDnSelector = (state) => {
  return bvAndFilterDnArr[state.tduRoot.bvAndFilterDnId];
};

export const getBranchBalansTypeDnSelector = (state) => {
  return branchBalansTypeDnArr[state.tduRoot.branchBalansTypeDnId];
};

export const getHeatMetersTypeSelector = (state) => {
  return heatMetersTypeArr[state.tduRoot.heatMetersTypeId];
};

export const getPartnerTypeDnSelector = (state) => {
  return partnerTypeDnArr[state.tduRoot.partnerTypeDnId];
};


export const getDesignation = (state) => {

  const st = state.tduRoot;

  let isBoxDes;
  st.isBox === true ? isBoxDes = 'C' : isBoxDes = '';

  let sideDes;
  st.side === 'left' ? sideDes = 'L' : sideDes = 'R';

  const bvAndFilterDn = getBvAndFilterDnSelector(state);

  let partnerDes;
  st.isPartner === true ? partnerDes = `${getPartnerTypeDnSelector(state)}-` : partnerDes = '';

  const branchBalansTypeDn = getBranchBalansTypeDnSelector(state);

  const aptTypeDn = `APT${getAptTypeDnSelector(state).match(/\d+/g)}`;

  let drDes;
  st.isDrainageBranch === true ? drDes = ' DR' : drDes = '';

  let airVentDes;
  st.airVent === 'airvent15' ? airVentDes = ' AA' : airVentDes = '';

  let frDes;
  st.isAddInputFilter === true ? frDes = ' FR' : frDes = '';

  let hpDes;
  getAptTypeDnSelector(state).includes('hp') ? hpDes = ' HP' : hpDes = '';

  const heatMetersType = getHeatMetersTypeSelector(state);
  let heatMetersDes = '';
  if (heatMetersType !== 'insert15') {
    heatMetersDes = ` ${heatMetersType}`;
  }
  if (st.heatMetersLoc === 'input') {
    heatMetersDes += ' 1hm15';
  } else if (st.heatMetersLoc === 'none') {
    heatMetersDes = ' wohm';
  }

  let bracketsDes;
  st.isBrackets === false ? bracketsDes = ' wocl' : bracketsDes = '';

  const designation = `TDU.5${isBoxDes} DN50-${st.branchesNum}${sideDes}-${bvAndFilterDn}-${partnerDes}${aptTypeDn}-${branchBalansTypeDn}${
    drDes}${airVentDes}${frDes}${hpDes}${heatMetersDes}${bracketsDes}`;

  const getCode = (designation) => {
    for (let [key, value] of designationToCodeMap) {
      if (key === designation) { return value; }
    }
    return 'по запросу';
  }

  const code = getCode(designation);

  return({
    designation,
    code,
  });
}