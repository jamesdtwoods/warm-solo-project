const weather = (state = {}, action) => {
    switch (action.type) {
      case 'SET_WEATHER':
        return action.payload;
      default:
        return state;
    }
};

export default weather;