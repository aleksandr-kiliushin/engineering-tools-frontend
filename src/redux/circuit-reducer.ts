import { GeneralParamsType, StateType, EquipType } from './../types/types';
import {getDataArr, getNewUnitState, getStWithCalcs} from "../utils/circuit-util"
import {circuitApi,} from "../api/api"
import {saveAs,} from 'file-saver'
import {selectMountedUnitsCodes,} from "./circuit-selectors"


const CHANGE_GENERAL_PARAM  = 'circuit/CHANGE_GENERAL_PARAM'
const CHANGE_HOVERED_TARGET = 'circuit/CHANGE_HOVERED_TARGET'
const SET_EQUIP_DB_DATA     = 'circuit/SET_EQUIP_DB_DATA'
const SET_IS_FETCHING       = 'circuit/SET_IS_FETCHING'
const SET_START_EQUIP       = 'circuit/SET_START_EQUIP'
const SWITCH_MODEL          = 'circuit/SWITCH_MODEL'

// Defines initial equip state.
const isMountedArr    = [0,              0,              1,            1,           0,           0,            0,            0,           ]
const equipAliases    = ['downstream1',  'downstream2',  'supDpr',     'supCv',     'retCv',     'retDpr',     'upstream1',  'upstream2', ]
const positionAliases = ['Downstream 1', 'Downstream 2', 'Supply DPR', 'Supply CV', 'Return CV', 'Return DPR', 'Upstream 1', 'Upstream 2',]



const initialEquip: EquipType = {}
equipAliases.forEach((alias, i) => {
  initialEquip[equipAliases[i]] = {
    aliases: {
			alias       : alias,
			controlUnit : alias + 'Brain',
      position    : positionAliases[i],
			valve       : alias + 'Valve',
		},
    controlUnit : {id: 0,},
    isMounted   : isMountedArr[i],
    valve       : {id: 0,},
  }
})


// Defines initial generalParams state.
const generalParamsAliases = ['g', 'hexDp', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10', 't1', 't2',]
const generalParamsValues  = [10,  0.15,    8,    8,    8,    0,    0,    0,    0,    6,    6,    6,     150,  70,  ]


const initialGeneralParams: GeneralParamsType = {}
generalParamsAliases.forEach((alias, i) => {
  initialGeneralParams[generalParamsAliases[i]] = {alias: alias, value: generalParamsValues[i],}
})




const initialState: StateType = {
  equip         : initialEquip,
  equipDbData   : null,
  generalParams : initialGeneralParams,
  hoveredTarget : '',
  isFetching    : false,
}

const circuitReducer = (state: StateType = initialState, action: any): StateType => {

  let st

  switch (action.type) {

    case CHANGE_GENERAL_PARAM: {
      if (!isNaN(+action.value) && (+action.value <= 150 || action.field === 'g') && +action.value >= 0) {
        const changedValue = (action.value.endsWith('.')) ? action.value : +action.value
        st = {...state}
        st.generalParams[action.field].value = changedValue
      } else {
        return state
      }
      return getStWithCalcs(st, equipAliases)
    }

    case CHANGE_HOVERED_TARGET: {
      return {...state, hoveredTarget: action.target,}
    }

    case SET_EQUIP_DB_DATA: {
      return {...state, equipDbData: action.equipDbData,}
    }

    case SET_IS_FETCHING: {
      return {...state, isFetching: action.isFetching,}
    }

    case SET_START_EQUIP: {
      const startEquip = {...state.equip,}
      for (let i = 0; i < equipAliases.length; i++) {
        const valveDataArr                      = getDataArr(state.equipDbData, equipAliases[i], 'valve')
        const controlUnitDataArr                = getDataArr(state.equipDbData, equipAliases[i], 'controlUnit')
        startEquip[equipAliases[i]].valve       = getNewUnitState(0, valveDataArr, 'start')
        startEquip[equipAliases[i]].controlUnit = getNewUnitState(0, controlUnitDataArr, 'start')
      }
      st = {...state, equip: startEquip,};
      return getStWithCalcs(st, equipAliases);
    }

    case SWITCH_MODEL: {

      const alias: string = action.alias;
      const object: 'valve' | 'controlUnit' = action.object;

      const dataArr = getDataArr(state.equipDbData, alias, object);

      st = {...state,}
      st.equip[alias][object] = getNewUnitState(state.equip[alias][object].id, dataArr, action.direction)

      if (alias === 'supDpr') {
        st.equip.supDpr.isMounted = 1
        st.equip.retDpr.isMounted = 0
      } else if (alias === 'retDpr') {
        st.equip.supDpr.isMounted = 0
        st.equip.retDpr.isMounted = 1
      } else if (alias === 'supCv') {
        st.equip.supCv.isMounted = 1
        st.equip.retCv.isMounted = 0
      } else if (alias === 'retCv') {
        st.equip.supCv.isMounted = 0
        st.equip.retCv.isMounted = 1
      }

      return getStWithCalcs(st, equipAliases)
    }

    default:
      return state
  }
}


type ChangeGeneralParamActionType = {
  type  : typeof CHANGE_GENERAL_PARAM
  field : string
  value : string
}
export const changeGeneralParam = (field: string, value: string): ChangeGeneralParamActionType => ({
  type: CHANGE_GENERAL_PARAM, field, value,
})

type ChangeHoveredTargetActionType = {
  type   : typeof CHANGE_HOVERED_TARGET
  target : string
}
export const changeHoveredTarget = (target: string): ChangeHoveredTargetActionType => ({
  type: CHANGE_HOVERED_TARGET, target,
})

type SetEquipDbDataActionType = {
  type        : typeof SET_EQUIP_DB_DATA
  equipDbData : any
}
export const setEquipDbData = (equipDbData: any): SetEquipDbDataActionType => ({
  type: SET_EQUIP_DB_DATA, equipDbData,
})

type SetIsFetchingActionType = {
  type       : typeof SET_IS_FETCHING
  isFetching : boolean
}
export const setIsFetching = (isFetching: boolean): SetIsFetchingActionType => ({
  type: SET_IS_FETCHING, isFetching,
})

type SetStartEquipActionType = {
  type: typeof SET_START_EQUIP
}
export const setStartEquip = (): SetStartEquipActionType => ({
  type: SET_START_EQUIP,
})

type SwitchModelActionType = {
  type      : typeof SWITCH_MODEL
  alias     : string
  object    : string
  direction : string
}
export const switchModel = (alias: string, object: string, direction: string): SwitchModelActionType => ({
  type: SWITCH_MODEL, alias, object, direction,
})

export const getEquipDbDataAndSetStartEquipState = () => async (dispatch: any) => {
  dispatch(setIsFetching(true));
  const data = await circuitApi.getEquipDbData();
  dispatch(setIsFetching(false));
  dispatch(setEquipDbData(data));
  dispatch(setStartEquip());
}
export const downloadCircuitCp = () => async (dispatch: any, getState: any) => {
  const mountedUnitsCodes = selectMountedUnitsCodes(getState());
  const data = await circuitApi.downloadCp(mountedUnitsCodes);
  saveAs(data, 'cp.xlsx');
}

export default circuitReducer;