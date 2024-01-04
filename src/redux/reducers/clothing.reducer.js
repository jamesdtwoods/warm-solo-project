import { combineReducers } from 'redux';

const clothingType = (state = [], action) => {
    switch (action.type) {
      case 'SET_CLOTHING_TYPES':
        return action.payload;
      default:
        return state;
    }
  };

const clothingList = (state = [], action) => {
    switch (action.type) {
      case 'SET_CLOTHES':
        return action.payload;
      default:
        return state;
    }
};

const selectedItem = (state = {}, action) => {
  if (action.type === 'SET_CLOTHING_ITEM') {
    return action.payload
  } else if (action.type === 'MODIFY_CLOTHING_ITEM') {
    const editedProperty = action.payload.property
    const newValue = action.payload.newValue
    return {...state, [editedProperty]: newValue}
  } 
  return state;
};

export default combineReducers({
    clothingType,
    clothingList,
    selectedItem
});
