import { fork } from 'redux-saga/effects';
import watchFetchAllUsers from './fetch_use/fetchAll';
import watchFetchUserByUsername from './fetch_use/fetchByUsername';
import watchFetchReposByUsername from './fetch_use/fetchAllByUsername';

export default function* rootSaga() {
    yield fork(watchFetchAllUsers);
    yield fork(watchFetchUserByUsername);
    yield fork(watchFetchReposByUsername);
}