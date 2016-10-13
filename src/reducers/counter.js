import { createReducer } from 'utils';
import {
  INCREMENT,
  DECREMENT,
} from 'constants';


const initialState = 0;

export default createReducer(initialState, {
  [INCREMENT]: state => state + 1,
  [DECREMENT]: state => state - 1,
});
