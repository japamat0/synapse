import { combineReducers } from 'redux';
import appReducer from './Containers/App/reducer';
import loginReducer from './Containers/LoginPage/reducer';
import registerReducer from './Containers/RegisterPage/reducer';
import accountsReducer from './Containers/AccountsPage/reducer';

/**
 * combines all reducers
 */
const rootReducer = combineReducers({
  global: appReducer,
  login: loginReducer,
  register: registerReducer,
  accounts: accountsReducer,
});

export default rootReducer;