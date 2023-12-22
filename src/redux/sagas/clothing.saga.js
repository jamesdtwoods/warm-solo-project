import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchClothingTypes() {
    try {
      const clothingTypes = yield axios.get('/api/clothes');
      yield put({
        type: 'SET_CLOTHING_TYPES',
        payload: clothingTypes.data
      });
    } catch (error) {
      console.log('fetchClothingTypes error:', error);
    }
  }

  function* clothingSaga() {
    yield takeLatest('SAGA/FETCH_CLOTHING_TYPES', fetchClothingTypes);
  }

export default clothingSaga;
