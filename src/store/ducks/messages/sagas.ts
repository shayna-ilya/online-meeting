import { call, put, takeEvery } from 'redux-saga/effects';
import { addMessage, getAllMessages } from './actions';
import { callApi } from '../../../utils/api';
import { MessageDTO } from './types';

function* addMessageSaga(action: ReturnType<typeof addMessage.request>): Generator {
  try {
    const response = yield call(callApi, 'post', '/message/add', action.payload);
    yield put(addMessage.success(response as MessageDTO));
  } catch (e) {
    yield put(addMessage.failure(e));
  }
}

function* getAllMessagesSaga(action: ReturnType<typeof getAllMessages.request>): Generator {
  try {
    const response = yield call(callApi, 'get', '/message/messages');
    yield put(getAllMessages.success(response as MessageDTO[]));
  } catch (e) {
    yield put(getAllMessages.failure(e));
  }
}

export function* watchMessagesSagas() {
  yield takeEvery(addMessage.request, addMessageSaga);
  yield takeEvery(getAllMessages.request, getAllMessagesSaga);
}
