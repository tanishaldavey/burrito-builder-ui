import React from 'react';
import App from './App';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../../reducers';
import { getOrders, submitOrder } from '../../apiCalls';

jest.mock('../../apiCalls');

let testStore, testWrapper, orders;

beforeEach(() => {
  testStore = createStore(rootReducer)

  testWrapper = render(
    <Provider store={testStore}>
      <App />
    </Provider>
  )

  orders = [{
            "id": 1,
            "name": "Pat",
            "ingredients": [
                "beans",
                "lettuce",
                "carnitas",
                "queso fresco",
                "jalapeno"
            ]
        },
        {
            "id": 2,
            "name": "Sam",
            "ingredients": [
                "steak",
                "pico de gallo",
                "lettuce",
                "carnitas",
                "queso fresco",
                "jalapeno"
            ]
        }]
})

describe('App', () => {
  it.skip('should render the correct orders to the page', async () => {

    getOrders.mockResolvedValue(orders)

    const { getByText } = testWrapper;


    const heading = getByText('Burrito Builder')
    const customer = await waitFor(() => getByText('Pat'))

    expect(heading).toBeInTheDocument();
    expect(customer).toBeInTheDocument();
  })

  it('should add a new order to page after clicking submit', async () => {
    // const { getByText, getByPlaceholderText, getByRole } = testWrapper;

    // const beans = getByRole('button', {name: 'beans'})
    // const steak = getByRole('button', {name: 'steak'})
    // fireEvent.click(beans)
    // fireEvent.click(steak)

    //Create sample order of one object
    // submitOrder.mockResolvedValue()
  })

  it('should not submit an order to the page if no ingredients are selected', () => {
    // const { getByText, getByPlaceholderText, getByRole } = testWrapper;

    // const submitBtn = getByRole('button', {name: 'Submit Order'})
    // fireEvent.click(submitBtn)

    // const errorMsg = getByText('Add at least one ingredient to your order.')
    // expect(errorMsg).toBeInTheDocument();
  })
})
