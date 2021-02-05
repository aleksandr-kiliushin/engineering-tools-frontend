import {getDataArr, getNewUnitState, getPSat} from "../utils/circuitUtil";
import {circuitApi,} from "../api/api";
import {saveAs,} from 'file-saver';
import {selectMountedUnitsCodes,} from "./circuitSelectors";

const CHANGE_GENERAL_PARAM_AC  = 'CHANGE_GENERAL_PARAM_AC';
const CHANGE_HOVERED_TARGET_AC = 'CHANGE_HOVERED_TARGET_AC';
const SET_EQUIP_DB_DATA_AC     = 'SET_EQUIP_DB_DATA_AC';
const SET_IS_FETCHING_AC       = 'SET_IS_FETCHING_AC';
const SET_START_EQUIP_AC       = 'SET_START_EQUIP_AC';
const SWITCH_MODEL_AC          = 'SWITCH_MODEL_AC';

// Defines initial equip state.
const isMountedArr       = [false,          false,          true,         true,        false,        false,       false,        false,       ];
const equipAliases       = ['downstream1',  'downstream2',  'supDpr',     'supCv',     'retCv',     'retDpr',     'upstream1',  'upstream2', ];
const positionAliases    = ['Downstream 1', 'Downstream 2', 'Supply DPR', 'Supply CV', 'Return CV', 'Return DPR', 'Upstream 1', 'Upstream 2',];
const valveAliases       = equipAliases.map((alias)        => (alias + 'Valve'));
const controlUnitAliases = equipAliases.map((alias, index) => (alias + ([3, 4,].includes(index) ? 'Drive' : 'Block')));

const initialEquip = {};
for (let i = 0; i < equipAliases.length; i++) {
  initialEquip[equipAliases[i]] = {
    aliases: {
			alias: equipAliases[i],
			controlUnit: controlUnitAliases[i],
			position: positionAliases[i],
			valve: valveAliases[i],
		},
    controlUnit : {id: 0,},
    isMounted   : isMountedArr[i],
    valve       : {id: 0,},
  };
}


// Defines initial generalParams state.
const generalParamsAliases = ['g', 'hexDp', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10', 't1', 't2',];
const generalParamsValues  = [10,  0.15,    8,    8,    8,    0,    0,    0,    0,    6,    6,    6,     150,  70,  ];
const initialGeneralParams = {};
for (let i = 0; i < generalParamsAliases.length; i++) {
  initialGeneralParams[generalParamsAliases[i]] = {alias: generalParamsAliases[i], value: generalParamsValues[i],};
}


const initialState = {
  equip: initialEquip,
  equipDbData: null,
  generalParams: initialGeneralParams,
  hoveredTarget: null,
  isFetching: false,
  fake: 10,
}

const schemeAndChartReducer = (state = initialState, action) => {

  let st;

  switch (action.type) {

    case 'FAKE': {
      st = {...state, fake: state.fake + 1,}
      break;
    }
    
    case CHANGE_GENERAL_PARAM_AC: {
      if (!isNaN(+action.value)) {
        const changedValue = (action.value.endsWith('.')) ? action.value : +action.value;
        st = {...state};
        st.generalParams[action.field].value = changedValue;
      } else {st = state;}
      break;
    }

    case CHANGE_HOVERED_TARGET_AC: {
      st = {...state, hoveredTarget: action.target,};
      break;
    }

    case SET_EQUIP_DB_DATA_AC: {
      st = {...state, equipDbData: action.equipDbData,};
      break;
    }

    case SET_IS_FETCHING_AC: {
      st = {...state, isFetching: action.isFetching,};
      break;
    }

    case SET_START_EQUIP_AC: {
      const startEquip = {...state.equip,};
      for (let i = 0; i < equipAliases.length; i++) {
        const valveDataArr                      = getDataArr(state.equipDbData, equipAliases[i], 'valve'      );
        const controlUnitDataArr                = getDataArr(state.equipDbData, equipAliases[i], 'controlUnit');
        startEquip[equipAliases[i]].valve       = getNewUnitState(null, valveDataArr,       'start');
        startEquip[equipAliases[i]].controlUnit = getNewUnitState(null, controlUnitDataArr, 'start');
      }
      st = {...state, equip: startEquip,};
      break;
    }

    case SWITCH_MODEL_AC: {

      const alias  = action.alias;
      const object = action.object;

      const dataArr = getDataArr(state.equipDbData, alias, object);

      st = {...state,}
      st.equip[alias][object] = getNewUnitState(state.equip[alias][object].id, dataArr, action.direction);

      if (alias === 'supDpr') {
        st.equip.supDpr.isMounted = true;
        st.equip.retDpr.isMounted = false;
      } else if (alias === 'retDpr') {
        st.equip.supDpr.isMounted = false;
        st.equip.retDpr.isMounted = true;
      } else if (alias === 'supCv') {
        st.equip.supCv.isMounted = true;
        st.equip.retCv.isMounted = false;
      } else if (alias === 'retCv') {
        st.equip.supCv.isMounted = false;
        st.equip.retCv.isMounted = true;
      }

      break;
    }

    default:
      return state;
  }


  const t1    = st.generalParams.t1.value;
  const t2    = st.generalParams.t2.value;
  const p1    = st.generalParams.p1.value;
  const p2    = st.generalParams.p2.value;
  const p3    = st.generalParams.p3.value;
  const p8    = st.generalParams.p8.value;
  const p9    = st.generalParams.p9.value;
  const p10   = st.generalParams.p10.value;
  const g     = st.generalParams.g.value;
  const hexDp = st.generalParams.hexDp.value;

  const supCvDp = (st.equip.supCv.isMounted) ? (g / st.equip.supCv.valve.kvs) ** 2 : 0;
  const retCvDp = (st.equip.retCv.isMounted) ? (g / st.equip.retCv.valve.kvs) ** 2 : 0;

  const supDprDp = (st.equip.supDpr.isMounted) ? (p3 - supCvDp - hexDp - retCvDp - p8) : 0;
  const retDprDp = (st.equip.retDpr.isMounted) ? (p3 - supCvDp - hexDp - retCvDp - p8) : 0;

  const downstream1Dp = p1 - p2;
  const downstream2Dp = p2 - p3;
  const upstream1Dp   = p8 - p9;
  const upstream2Dp   = p9 - p10;

  const p4 = p3 - supDprDp;
  const p5 = p4 - supCvDp;
  const p6 = p5 - hexDp;
  const p7 = p6 - retCvDp;

  const pSatSup = getPSat(t1);
  const pSatRet = getPSat(t2);

  const downstream1DpMax = st.equip.downstream1.valve.z * (p1 - pSatSup);
  const downstream2DpMax = st.equip.downstream2.valve.z * (p2 - pSatSup);
  const supDprDpMax      = st.equip.supDpr.valve.z      * (p3 - pSatSup);
  const supCvDpMax       = st.equip.supCv.valve.z       * (p4 - pSatSup);
  const retCvDpMax       = st.equip.retCv.valve.z       * (p6 - pSatRet);
  const retDprDpMax      = st.equip.retDpr.valve.z      * (p7 - pSatRet);
  const upstream1DpMax   = st.equip.upstream1.valve.z   * (p8 - pSatRet);
  const upstream2DpMax   = st.equip.upstream2.valve.z   * (p9 - pSatRet);

  const downstream1V = g * (18.8 / st.equip.downstream1.valve.dn) ** 2;
  const downstream2V = g * (18.8 / st.equip.downstream2.valve.dn) ** 2;
  const supDprV      = g * (18.8 / st.equip.supDpr.valve.dn)      ** 2;
  const supCvV       = g * (18.8 / st.equip.supCv.valve.dn)       ** 2;
  const retCvV       = g * (18.8 / st.equip.retCv.valve.dn)       ** 2;
  const retDprV      = g * (18.8 / st.equip.retDpr.valve.dn)      ** 2;
  const upstream1V   = g * (18.8 / st.equip.upstream1.valve.dn)   ** 2;
  const upstream2V   = g * (18.8 / st.equip.upstream2.valve.dn)   ** 2;

  const supCvAuthority = `${supCvDp.toFixed(2)} > ${(0.5 * (supCvDp + hexDp)).toFixed(2)}`;
  const retCvAuthority = `${retCvDp.toFixed(2)} > ${(0.5 * (retCvDp + hexDp)).toFixed(2)}`;

  const dps              = [downstream1Dp,    downstream2Dp,    supDprDp,     supCvDp,    retCvDp,    retDprDp,     upstream1Dp,    upstream2Dp,];
  const dpMaxs           = [downstream1DpMax, downstream2DpMax, supDprDpMax,  supCvDpMax, retCvDpMax, retDprDpMax,  upstream1DpMax, upstream2DpMax,];
  const vs               = [downstream1V,     downstream2V,     supDprV,      supCvV,     retCvV,     retDprV,      upstream1V,     upstream2V,];

  let refreshedEquip = {};
  for (let i = 0; i < equipAliases.length; i++) {
     const newItem = {
      ...st.equip[equipAliases[i]],
      valve: {...st.equip[equipAliases[i]].valve, dp: dps[i], dpMax: dpMaxs[i], v: vs[i],},
    };
    if ([0, 1, 6, 7,].includes(i)) newItem.isMounted = dps[i];
    refreshedEquip[equipAliases[i]] = newItem;
  }
  refreshedEquip.supCv.valve.authority = supCvAuthority;
  refreshedEquip.retCv.valve.authority = retCvAuthority;

  return {
    ...st,
    equip: refreshedEquip,
    generalParams: {
      ...st.generalParams,
      p4: {...st.generalParams.p4, value: p4,},
      p5: {...st.generalParams.p5, value: p5,},
      p6: {...st.generalParams.p6, value: p6,},
      p7: {...st.generalParams.p7, value: p7,},
    },
  }
}

export const changeGeneralParamAC  = (field,       value            ) => ({type: CHANGE_GENERAL_PARAM_AC,  field,       value,            });
export const changeHoveredTargetAC = (target                        ) => ({type: CHANGE_HOVERED_TARGET_AC, target,                        });
export const setEquipDbDataAC      = (equipDbData                   ) => ({type: SET_EQUIP_DB_DATA_AC,     equipDbData,                   });
export const setIsFetchingAC       = (isFetching                    ) => ({type: SET_IS_FETCHING_AC,       isFetching,                    });
export const setStartEquipAC       = ()                               => ({type: SET_START_EQUIP_AC,                                      });
export const switchModelAC         = (alias,       object, direction) => ({type: SWITCH_MODEL_AC,          alias,       object, direction,});

export const getEquipDbDataAndSetStartEquipState = () => (dispatch) => {
  dispatch(setIsFetchingAC(true));
  circuitApi.getEquipDbData().then((data) => {
    dispatch(setIsFetchingAC(false));
    dispatch(setEquipDbDataAC(data));
    dispatch(setStartEquipAC());
  });
}
export const downloadCircuitCp = () => (dispatch, getState) => {
  const mountedUnitsCodes = selectMountedUnitsCodes(getState());
  circuitApi.downloadCp(mountedUnitsCodes).then((data) => {
    saveAs(data, 'cp.xlsx');
  });
}

export default schemeAndChartReducer;