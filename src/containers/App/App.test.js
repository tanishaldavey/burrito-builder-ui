import React from 'react';
import App from './App';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../../reducers';
import { getOrders, submitOrder } from '../../apiCalls';

jest.mock('../../apiCalls');

const  ordersInfo = [{
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

describe('App', () => {
  it('should render the correct orders to the page', async () => {

    getOrders.mockResolvedValue(ordersInfo)

    const testStore = createStore(rootReducer)

    const testWrapper = render(
      <Provider store={testStore}>
        <App />
      </Provider>
    )

    testStore.dispatch({
      type: 'SET_ORDERS',
      orders: ordersInfo
    })

    const { getByText, getByRole } = testWrapper

    const heading = getByText('Burrito Builder')
    const customer = getByText('Pat')
    const customer2 = getByText('Sam')


    expect(heading).toBeInTheDocument();
    expect(customer).toBeInTheDocument();
    expect(customer2).toBeInTheDocument();
  })

  it('should add a new order to page after clicking submit', async () => {

    const customerOrder = {
      name: 'Brad',
      ingredients: ['beans', 'steak'],
      id: 3
    }

    const updatedOrdersInfo = [...ordersInfo, customerOrder]

    getOrders.mockResolvedValue(ordersInfo)
    submitOrder.mockResolvedValue(customerOrder)

    const testStore = createStore(rootReducer)

    const testWrapper = render(
      <Provider store={testStore}>
        <App />
      </Provider>)

      testStore.dispatch({
        type: 'SET_ORDERS',
        orders: updatedOrdersInfo
      })

    const { getByText, getByPlaceholderText, getByRole } = testWrapper;

    const beans = getByRole('button', {name: 'beans'})
    const steak = getByRole('button', {name: 'steak'})
    const customer = getByPlaceholderText('Name')
    const submitBtn = getByRole('button', { name: 'Submit Order' })

    fireEvent.change(customer, {target: { value: 'Brad' }})
    fireEvent.click(beans)
    fireEvent.click(steak)
    fireEvent.click(submitBtn)

    const newCustomer = await waitFor(() => getByText('Brad'))
    //may need test id to place on ingredient items being returned in order to test that those specific items are being rendered to the page.

    expect(newCustomer).toBeInTheDocument();
  })

  it('should not submit an order to the page if no ingredients are selected', () => {

    const testStore = createStore(rootReducer)

    const testWrapper = render(
      <Provider store={testStore}>
        <App />
      </Provider>)

      testStore.dispatch({
        type: 'SET_ORDERS',
        orders: []
      })

    const { getByText, getByPlaceholderText, getByRole } = testWrapper;

    const submitBtn = getByRole('button', {name: 'Submit Order'})
    fireEvent.click(submitBtn)

    const errorMsg = getByText('Add at least one ingredient to your order.')
    expect(errorMsg).toBeInTheDocument();
  })
})
