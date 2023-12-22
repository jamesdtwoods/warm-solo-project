import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchClothingTypes() {
    try {
      const clothingTypes = yield axios.get('/api/clothes/types');
      yield put({
        type: 'SET_CLOTHING_TYPES',
        payload: clothingTypes.data
      });
    } catch (error) {
      console.log('fetchClothingTypes error:', error);
    }
}

function* fetchClothingItems() {
    try {
      const clothingItems = yield axios.get('/api/clothes');
      yield put({
        type: 'SET_CLOTHES',
        payload: clothingItems.data
      });
    } catch (error) {
      console.log('fetchClothingItems error:', error);
    }
}

function* postClothingItem(action) {
    try {
        const response = yield axios({
            method: 'POST',
            url: '/api/clothes',
            data: action.payload
        })
        yield fetchClothingItems()
    }
    catch (error) {
        console.error('Clothing Item POST failed:', error)
    }
}

function* deleteClothingItem(action) {
    try {
        const response = yield axios({
            method: 'DELETE',
            url: `/api/clothes/${action.payload}`
        })
        yield fetchClothingItems()
    }
    catch (error) {
        console.error('Clothing Item DELETE failed:', error)
    }
}

  function* clothingSaga() {
    yield takeLatest('SAGA/FETCH_CLOTHING_TYPES', fetchClothingTypes);
    yield takeLatest('SAGA/POST_CLOTHING_ITEM', postClothingItem);
    yield takeLatest('SAGA/FETCH_CLOTHES', fetchClothingItems);
    yield takeLatest('SAGA/DELETE_CLOTHING_ITEM', deleteClothingItem);
  }

export default clothingSaga;
