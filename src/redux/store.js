import { createStore, combineReducers } from 'redux';
import tduRootReducer from './tduRoot-reducer';
import schemeAndChartReducer from "./schemeAndChart-reducer";

const reducers = combineReducers({
  tduRoot: tduRootReducer,
  schemeAndChart: schemeAndChartReducer,
});

const store = createStore(reducers);

window.store = store;

export default store;