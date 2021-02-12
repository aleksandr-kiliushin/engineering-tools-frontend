import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import tduRootReducer from './tduRoot-reducer'
import circuitReducer from './circuit-reducer'
import thunkMw from 'redux-thunk'

const rootReducer = combineReducers({
  tduRoot: tduRootReducer,
  circuit: circuitReducer,
});

type RootReducerType = typeof rootReducer
export type RootState = ReturnType<RootReducerType>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMw)))

export default store