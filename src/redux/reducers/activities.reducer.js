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

const activityListByWeather = (state = [], action) => {
  switch (action.type) {
    case 'SET_ACTIVITIES_BY_WEATHER':
      return action.payload;
    default:
      return state;
  }
};

// const selectedActivity = (state = {}, action) => {
//     switch (action.type) {
//       case 'SET_ACTIVITY':
//         return action.payload;
//       default:
//         return state;
//     }
// };

const selectedActivity = (state = {}, action) => {
  if (action.type === 'SET_ACTIVITY') {
    return action.payload
  } else if (action.type === 'MODIFY_ACTIVITY') {
    const editedProperty = action.payload.property
    const newValue = action.payload.newValue
    return {...state, [editedProperty]: newValue}
  } 
  return state;
};

export default combineReducers({
    activityType,
    activityList,
    activityListByWeather,
    selectedActivity
});
