import { combineReducers } from 'redux';

const clothingTypeReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_CLOTHING_TYPES':
        return action.payload;
      default:
        return state;
    }
  };

const clothingListReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_CLOTHES':
        return action.payload;
      default:
        return state;
    }
};

export default combineReducers({
    clothingTypeReducer,
    clothingListReducer
});
