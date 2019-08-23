import { combineReducers } from 'redux';
import appReducer from './Containers/App/reducer';

const rootReducer = combineReducers({
  global: appReducer,
});

export default rootReducer;