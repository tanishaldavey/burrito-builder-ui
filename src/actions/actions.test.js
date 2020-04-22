import * as actions from '.';

describe('actions', () => {
  it('should have a type of SET_ORDERS', () => {
    const orders = [
      {
        name: 'Monica',
        ingredients: ['steak', 'carnitas'],
        id: 4
      },
      {
        name: 'Frankie',
        ingredients: ['queso', 'sofritas'],
        id: 6
      }
    ]

    const expectedAction = {
      type: 'SET_ORDERS',
      orders: orders
    }

    const result = actions.setOrders(orders)

    expect(result).toEqual(expectedAction);
  });
});
