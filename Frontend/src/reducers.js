import { combineReducers } from 'redux';
import appReducer from './Containers/App/reducer';
import loginReducer from './Containers/LoginPage/reducer';

const rootReducer = combineReducers({
  global: appReducer,
  login: loginReducer,
});

export default rootReducer;