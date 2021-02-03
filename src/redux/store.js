import {createStore, combineReducers, applyMiddleware} from 'redux';
import tduRootReducer from './tduRoot-reducer';
import schemeAndChartReducer from "./schemeAndChart-reducer";
import thunkMw from 'redux-thunk';

const reducers = combineReducers({
  tduRoot: tduRootReducer,
  schemeAndChart: schemeAndChartReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMw));

window.store = store;

export default store;