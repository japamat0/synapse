import { all } from 'redux-saga/effects';
import { loginSagas } from './Containers/LoginPage/saga';
import { registerSagas } from './Containers/RegisterPage/saga';
import { accountsSagas } from './Containers/AccountsPage/saga';


/**
 * Combine all sagas
 */
export default function* rootSaga() {
  yield all([
    ...loginSagas,
    ...registerSagas,
    ...accountsSagas,
  ]);
}