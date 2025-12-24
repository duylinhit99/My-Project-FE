const intalState = {
  tongQty: 0,
};
// nhận vào state hiện tại và action
const cartReducer = (state = intalState, action) => {
  switch (action.type) {
    case 'UPDATE_TONG_QTY':
      return {
        ...state,
        tongQty: action.payload,
      };
    default:
      return state;
  }
};
export default cartReducer;
