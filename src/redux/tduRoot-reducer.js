import { aptTypeDnArr, branchBalansTypeDnArr, bvAndFilterDnArr, heatMetersTypeArr, partnerTypeDnArr } from "../utils/tduModelStorage";

const ADD_BRANCH = 'ADD_BRANCH';
const ADD_TDU_TO_BASKET = 'ADD_TDU_TO_BASKET';
const REMOVE_BRANCH = 'REMOVE_BRANCH';
const SWITCH_AIR_VENT = 'SWITCH_AIR_VENT';
const SWITCH_APT_TYPE_DN = 'SWITCH_APT';
const SWITCH_BRANCH_BALANS_TYPE_DN = 'SWITCH_BRANCH_BALANS_TYPE_DN';
const SWITCH_BV_AND_FILTER_DN = 'SWITCH_BV_AND_FILTER_DN';
const SWITCH_HEAT_METERS_LOC = 'SWITCH_HEAT_METERS_LOC';
const SWITCH_HEAT_METERS_TYPE = 'SWITCH_HEAT_METERS_TYPE';
const SWITCH_IS_ADD_INPUT_FILTER = 'SWITCH_IS_ADD_INPUT_FILTER';
const SWITCH_IS_BOX = 'SWITCH_IS_BOX';
const SWITCH_IS_BRACKETS = 'SWITCH_IS_BRACKETS';
const SWITCH_IS_DRAINAGE_BRANCH = 'SWITCH_IS_DRAINAGE_BRANCH';
const SWITCH_IS_PARTNER = 'SWITCH_IS_PARTNER';
const SWITCH_PARTNER_TYPE_DN = 'SWITCH_PARTNER_TYPE_DN';
const SWITCH_SIDE = 'SWITCH_SIDE';

const initialState = {
  airVent: 'maevsky15',
  aptTypeDnId: 1,
  bvAndFilterDnId: 1,
  branchesNum: 4,
  branchBalansTypeDnId: 0,
  isAddInputFilter: false,
  isBox: false,
  isBrackets: true,
  isDrainageBranch: false,
  isPartner: true,
  side: 'left',
  heatMetersLoc: 'branches',
  heatMetersTypeId: 0,
  partnerTypeDnId: 1,
  basketArr: [],
};

const tduRootReducer = (state = initialState, action) => {
  switch(action.type) {

    case ADD_BRANCH: {
      let newBranchesNumb;
      state.branchesNum === 12 ? newBranchesNumb = 12 : newBranchesNumb = state.branchesNum + 1;
      return {
        ...state,
        branchesNum: newBranchesNumb,
      }
    }
    case ADD_TDU_TO_BASKET: {

      // const newTduToBasket = action.newTduToBasket;
      // const newBasketArr = [
      //   ...state.basketArr,

      // ]

      return {
        ...state,
        basketArr: [...state.basketArr, action.newTduToBasket,],
      }
    }
    case REMOVE_BRANCH: {
      let newBranchesNumb;
      state.branchesNum === 2 ? newBranchesNumb = 2 : newBranchesNumb = state.branchesNum - 1;
      return {
        ...state,
        branchesNum: newBranchesNumb,
      }
    }
    case SWITCH_AIR_VENT: {
      let newAirVent;
      state.airVent === 'maevsky15' ? newAirVent = 'airvent15' : newAirVent = 'maevsky15';
      return {
        ...state,
        airVent: newAirVent,
      }
    }
    case SWITCH_APT_TYPE_DN: {
      let id;
      state.aptTypeDnId === aptTypeDnArr.length-1 ? id = 0 : id = state.aptTypeDnId + 1;
      return {
        ...state,
        aptTypeDnId: id,
      }
    }
    case SWITCH_BRANCH_BALANS_TYPE_DN: {
      let id;
      state.branchBalansTypeDnId === branchBalansTypeDnArr.length-1 ? id = 0 : id = state.branchBalansTypeDnId + 1;
      return {
        ...state,
        branchBalansTypeDnId: id,
      }
    }
    case SWITCH_BV_AND_FILTER_DN: {
      let id;
      state.bvAndFilterDnId === bvAndFilterDnArr.length-1 ? id = 0 : id = state.bvAndFilterDnId + 1;
      return {
        ...state,
        bvAndFilterDnId: id,
      }
    }
    case SWITCH_HEAT_METERS_LOC: {
      let newLoc;
      switch(state.heatMetersLoc) {
        case 'branches': newLoc = 'input'; break;
        case 'input': newLoc = 'none'; break;
        case 'none': newLoc = 'branches'; break;
        default:
      }
      return {
        ...state,
        heatMetersLoc: newLoc,
      }
    }
    case SWITCH_HEAT_METERS_TYPE: {
      let id;
      state.heatMetersTypeId === heatMetersTypeArr.length-1 ? id = 0 : id = state.heatMetersTypeId + 1;
      return {
        ...state,
        heatMetersTypeId: id,
      }
    }
    case SWITCH_IS_ADD_INPUT_FILTER: {
      let newIsAddInputFilter;
      state.isAddInputFilter === true ? newIsAddInputFilter = false : newIsAddInputFilter = true;
      return {
        ...state,
        isAddInputFilter: newIsAddInputFilter,
      }
    }
    case SWITCH_IS_BOX: {
      let newIsBox;
      state.isBox === true ? newIsBox = false : newIsBox = true;
      return {
        ...state,
        isBox: newIsBox,
      }
    }
    case SWITCH_IS_BRACKETS: {
      let newBracketsState;
      state.isBrackets === true ? newBracketsState = false : newBracketsState = true;
      return {
        ...state,
        isBrackets: newBracketsState,
      }
    }
    case SWITCH_IS_DRAINAGE_BRANCH: {
      let newIsDrainageBranch;
      state.isDrainageBranch === true ? newIsDrainageBranch = false : newIsDrainageBranch = true;
      return {
        ...state,
        isDrainageBranch: newIsDrainageBranch,
      }
    }
    case SWITCH_IS_PARTNER: {
      let newIsPartner;
      state.isPartner === true ? newIsPartner = false : newIsPartner = true;
      return {
        ...state,
        isPartner: newIsPartner,
      }
    }
    case SWITCH_PARTNER_TYPE_DN: {
      let id;
      state.partnerTypeDnId === partnerTypeDnArr.length-1 ? id = 0 : id = state.partnerTypeDnId + 1;
      return {
        ...state,
        partnerTypeDnId: id,
      }
    }
    case SWITCH_SIDE: {
      let newSide;
      state.side === 'left' ? newSide = 'right' : newSide = 'left';
      return {
        ...state,
        side: newSide,
      }
    }
    default:
      return state;
  }
}

export const addBranch = () => ({ type: ADD_BRANCH, });
export const addTduToBasket = (newTduToBasket) => ({ type: ADD_TDU_TO_BASKET, newTduToBasket, });
export const removeBranch = () => ({ type: REMOVE_BRANCH, });
export const switchAirVent = () => ({ type: SWITCH_AIR_VENT, });
export const switchAptTypeDn = () => ({ type: SWITCH_APT_TYPE_DN, });
export const switchBranchBalansTypeDn = () => ({ type: SWITCH_BRANCH_BALANS_TYPE_DN, });
export const switchBvAndFilterDn = () => ({ type: SWITCH_BV_AND_FILTER_DN, });
export const switchHeatMetersLoc = () => ({ type: SWITCH_HEAT_METERS_LOC, });
export const switchHeatMetersType = () => ({ type: SWITCH_HEAT_METERS_TYPE, });
export const switchIsAddInputFilter = () => ({ type: SWITCH_IS_ADD_INPUT_FILTER, });
export const switchIsBox = () => ({ type: SWITCH_IS_BOX, });
export const switchIsBrackets = () => ({ type: SWITCH_IS_BRACKETS, });
export const switchIsDrainageBranch = () => ({ type: SWITCH_IS_DRAINAGE_BRANCH, });
export const switchIsPartner = () => ({ type: SWITCH_IS_PARTNER, });
export const switchPartnerTypeDn = () => ({ type: SWITCH_PARTNER_TYPE_DN, });
export const switchSide = () => ({ type: SWITCH_SIDE, });

export default tduRootReducer;