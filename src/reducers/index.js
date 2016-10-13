import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import errorMessage from './errorMessage';
import entities from './entities';
import counter from './counter';


const rootReducer = combineReducers({
  routing: routerReducer,
  errorMessage,
  entities,
  counter,
});

export default rootReducer;
