import { all } from 'redux-saga/effects';
import { loginSagas } from './Containers/LoginPage/saga';
import { registerSagas } from './Containers/RegisterPage/saga';

export default function* rootSaga() {
  yield all([
    ...loginSagas,
    ...registerSagas,
  ])
}