import { BaseThunkType, InferActionsTypes } from './store';
import { GeneralParamsType, StateType, EquipType, EquipDbDataType } from './../types/types'
import {getDataArr, getNewUnitState, getStWithCalcs} from "../utils/circuit-util"
import {circuitApi,} from '../api/circuit-api'
import {saveAs,} from 'file-saver'
import {selectMountedUnitsCodes,} from './circuit-selectors'


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
    controlUnit : {id: 0,},// change to 'brain'
    isMounted   : isMountedArr[i],
    valve       : {id: 0,},
  }
})


// Defines initial generalParams state.
const generalParamsAliases = ['g', 'hexDp', 'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10', 't1', 't2',]
const generalParamsValues  = [10,  0.15,    8,    8,    8,    0,    0,    0,    0,    6,    6,    6,     150,  70,  ]


const initialGeneralParams: GeneralParamsType = {}
generalParamsAliases.forEach((alias, i) => {
  initialGeneralParams[alias] = {alias: alias, value: generalParamsValues[i],}
})


// todo: delete 'is mounted'. replace with dp.

const initialState: StateType = {
  equip         : initialEquip,
  equipDbData   : null,
  generalParams : initialGeneralParams,
  hoveredTarget : null,
  isFetching    : false,
}

const circuitReducer = (state: StateType = initialState, action: ActionsTypes): StateType => {

  let st

  switch (action.type) {

    case 'CHANGE_GENERAL_PARAM': {
      if (!isNaN(+action.value) && (+action.value <= 150 || action.field === 'g') && +action.value >= 0) {
        const changedValue = (action.value.endsWith('.')) ? action.value : +action.value
        st = {...state}
        st.generalParams[action.field].value = +changedValue
      } else {
        return state
      }
      return getStWithCalcs(st, equipAliases)
    }

    case 'CHANGE_HOVERED_TARGET': {
      return {...state, hoveredTarget: action.target,}
    }

    case 'SET_EQUIP_DB_DATA': {
      return {...state, equipDbData: action.equipDbData,}
    }

    case 'SET_IS_FETCHING': {
      return {...state, isFetching: action.isFetching,}
    }

    case 'SET_START_EQUIP': {
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

    case 'SWITCH_MODEL': {

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

type ActionsTypes = InferActionsTypes<typeof actions>

type ThunkType = BaseThunkType<ActionsTypes>

export const actions = {
  changeGeneralParam  : (field: string, value: string) => ({type: 'CHANGE_GENERAL_PARAM', field, value} as const),
  changeHoveredTarget : (target: string | null)        => ({type: 'CHANGE_HOVERED_TARGET', target} as const),
  setEquipDbData      : (equipDbData: EquipDbDataType) => ({type: 'SET_EQUIP_DB_DATA', equipDbData} as const),
  setIsFetching       : (isFetching: boolean)          => ({type: 'SET_IS_FETCHING', isFetching} as const),
  setStartEquip       : ()                             => ({type: 'SET_START_EQUIP'} as const),
  switchModel         : (alias: string, object: 'valve' | 'controlUnit', direction: string) => ({type: 'SWITCH_MODEL', alias, object, direction} as const),
}


export const getEquipDbDataAndSetStartEquipState = (): ThunkType => async (dispatch) => {
  dispatch(actions.setIsFetching(true))
  const data = await circuitApi.getEquipDbData()
  dispatch(actions.setIsFetching(false))
  dispatch(actions.setEquipDbData(data))
  dispatch(actions.setStartEquip())
}

export const downloadCircuitCp = (): ThunkType => async (dispatch, getState) => {
  const mountedUnitsCodes = selectMountedUnitsCodes(getState())
  const data = await circuitApi.downloadCp(mountedUnitsCodes)
  saveAs(data, 'cp.xlsx')
}

export default circuitReducer;