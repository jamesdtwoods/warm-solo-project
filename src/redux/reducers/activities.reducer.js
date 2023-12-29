import { combineReducers } from 'redux';

const activityType = (state = [], action) => {
    switch (action.type) {
      case 'SET_ACTIVITY_TYPES':
        return action.payload;
      default:
        return state;
    }
  };

const activityList = (state = [], action) => {
    switch (action.type) {
      case 'SET_ACTIVITIES':
        return action.payload;
      default:
        return state;
    }
};

const selectedActivity = (state = {}, action) => {
    switch (action.type) {
      case 'SET_ACTIVITY':
        return action.payload;
      default:
        return state;
    }
};

export default combineReducers({
    activityType,
    activityList,
    selectedActivity
});
