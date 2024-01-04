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
  } else if (action.type === 'MODIFY_CLOTHING_ITEM_NAME') {
    return {...state, name: action.payload}
  } else if (action.type === 'MODIFY_CLOTHING_ITEM_DESCRIPTION') {
    return {...state, description: action.payload}
  } else if (action.type === 'MODIFY_CLOTHING_ITEM_TYPE') {
    return {...state, clothing_type_id: action.payload}
  }
  return state;
  // if (action.type === 'SET_CLOTHING_ITEM') {
  //   return action.payload
  // } else if (action.type === 'MODIFY_CLOTHING_ITEM') {
  //     const newValue = action.payload.newValue
  //     const editedProperty = action.payload.property
  //     return {...state, [editedProperty]: newValue}
  // }
  // return state;
};

export default combineReducers({
    clothingType,
    clothingList,
    selectedItem
});
