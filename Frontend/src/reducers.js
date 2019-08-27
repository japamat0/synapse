import { combineReducers } from 'redux';
import appReducer from './Containers/App/reducer';
import loginReducer from './Containers/LoginPage/reducer';
import registerReducer from './Containers/RegisterPage/reducer';

const rootReducer = combineReducers({
  global: appReducer,
  login: loginReducer,
  register: registerReducer,
});

export default rootReducer;