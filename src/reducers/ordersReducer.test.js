import { orders } from './orders';

describe('orders reducer', () => {
  it('should return an initial state', () => {
    const expectedResult = []

    const result = orders(undefined, {})

    expect(result).toEqual(expectedResult);
  });

  it('should be able to update state with new orders', () => {

    const expectedResult = [
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

    const result = orders([], {type: 'SET_ORDERS', orders: expectedResult })

    expect(result).toEqual(expectedResult)
  });
});
