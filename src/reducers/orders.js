export const orders = (state = [], action) => {
  switch (action.type) {
    case 'SET_ORDERS':
      return action.orders;
    case 'UPDATE_ORDER':
      return [...state, action.order]
    default:
      return state;
  }
};
