import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import tduRootReducer from './tduRoot-reducer';
import circuitReducer from "./circuit-reducer";
import thunkMw from 'redux-thunk';

const reducers = combineReducers({
  tduRoot: tduRootReducer,
  circuit: circuitReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMw)));

export default store;