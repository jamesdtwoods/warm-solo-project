import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchWeather(action) {
    try {
      const weather = yield axios({
        method: 'GET',
        url: `/api/weather/${action.payload}`
      })
      yield put({
        type: 'SET_WEATHER',
        payload: weather.data
      });
    } catch (error) {
      console.log('fetchWeather error:', error);
    }
}

function* weatherSaga () {
    yield takeLatest('SAGA/FETCH_WEATHER', fetchWeather);
};

export default weatherSaga;