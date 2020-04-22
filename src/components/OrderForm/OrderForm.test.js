import React from 'react';
import OrderForm from './OrderForm';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../../reducers';

let testStore, testWrapper;

beforeEach(() => {
  testStore = createStore(rootReducer)

  testWrapper = render(
    <Provider store={testStore}>
      <OrderForm />
    </Provider>
  )
})

describe('Form', () => {
  it('should render the correct form elements to the page', () => {
    const { getByText, getByPlaceholderText, getByRole } = testWrapper;

    const name = getByPlaceholderText('Name')
    const button = getByRole('button', {name: 'Submit Order'})
    const beans = getByRole('button', {name: 'beans'})
    const steak = getByRole('button', {name: 'steak'})
    const carnitas = getByRole('button', {name: 'carnitas'})
    const sofritas = getByRole('button', {name: 'sofritas'})
    const orderInfo = getByText('Order: Nothing selected')

    expect(name).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(beans).toBeInTheDocument();
    expect(steak).toBeInTheDocument();
    expect(carnitas).toBeInTheDocument();
    expect(sofritas).toBeInTheDocument();
    expect(orderInfo).toBeInTheDocument();
  });

  it('should update order info when the button is clicked on', () => {

    const { getByText, getByPlaceholderText, getByRole } = testWrapper;
    const button = getByRole('button', {name: 'Submit Order'})
    const beans = getByRole('button', {name: 'beans'})
    const steak = getByRole('button', {name: 'steak'})
    const carnitas = getByRole('button', {name: 'carnitas'})
    const sofritas = getByRole('button', {name: 'sofritas'})

    fireEvent.click(beans)
    fireEvent.click(steak)

    const orderInfo = getByText('Order: beans, steak')

    expect(orderInfo).toBeInTheDocument()
  })
});
