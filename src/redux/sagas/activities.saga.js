import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchActivityTypes() {
    try {
      const activityTypes = yield axios.get('/api/activities/types');
      yield put({
        type: 'SET_ACTIVITY_TYPES',
        payload: activityTypes.data
      });
    } catch (error) {
      console.log('fetchActivityTypes error:', error);
    }
}

function* fetchActivities() {
    try {
      const activities = yield axios.get('/api/activities');
      yield put({
        type: 'SET_ACTIVITIES',
        payload: activities.data
      });
    } catch (error) {
      console.log('fetchActivities error:', error);
    }
}

function* postActivity(action) {
    try {
        const response = yield axios({
            method: 'POST',
            url: '/api/activities',
            data: action.payload
        })
        yield fetchActivities()
    }
    catch (error) {
        console.error('activity Item POST failed:', error)
    }
}

function* deleteActivity(action) {
    try {
        const response = yield axios({
            method: 'DELETE',
            url: `/api/activities/${action.payload}`
        })
        yield fetchActivities()
    }
    catch (error) {
        console.error('activity Item DELETE failed:', error)
    }
}

function* editActivity(action) {
    try {
        const response = yield axios({
            method: 'PUT',
            url: `/api/activities/${action.payload.id}`,
            data: action.payload
        })
        yield fetchActivities()
    }
    catch (error) {
        console.error('activity Item EDIT failed:', error)
    }
}

  function* activitiesSaga() {
    yield takeLatest('SAGA/FETCH_ACTIVITY_TYPES', fetchActivityTypes);
    yield takeLatest('SAGA/POST_ACTIVITY', postActivity);
    yield takeLatest('SAGA/FETCH_ACTIVITIES', fetchActivities);
    yield takeLatest('SAGA/DELETE_ACTIVITY', deleteActivity);
    yield takeLatest('SAGA/EDIT_ACTIVITY', editActivity);
  }

export default activitiesSaga;