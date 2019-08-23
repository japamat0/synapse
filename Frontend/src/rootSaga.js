import { all } from 'redux-saga/effects';
import { loginSagas } from './Containers/LoginPage/saga';

export default function* rootSaga() {
  yield all([
    ...loginSagas,
  ])
}