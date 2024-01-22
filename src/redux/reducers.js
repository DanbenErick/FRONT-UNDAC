const initialState = {
  routes: [],
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ROUTES':
      return {
        ...state,
        routes: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
