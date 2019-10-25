import { takeLatest, put } from "redux-saga/effects";
const { API_ROUTES, API_KEY } = require('../config/index');


function* fetchUsersApiSaga(){
    yield put({type: "FETCH_USERS_API_SAGA_START"})

   const apiResponse = yield fetch(API_ROUTES ,{
        headers: {
            "Content-Type": "application/json",
            "x-api-key": API_KEY
        }
    })

    const users = yield apiResponse.json()

    yield put({type: "FETCH_USERS_API_SAGA_SUCCESS", payload: users})
}

export default function* watchFetchUsersApiSaga(){
    yield takeLatest("FETCH_USERS_API", fetchUsersApiSaga)
}

