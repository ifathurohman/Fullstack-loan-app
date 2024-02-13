export const shippingReducer = (state = {shipping: false}, action) => {
  switch (action.type) {
    case 'SHIPPING':
      return {
        shipping: action.payload,
      };
    default:
      return state;
  }
};
