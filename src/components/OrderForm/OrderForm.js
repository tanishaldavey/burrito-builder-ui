import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateOrder } from '../../actions';
import { submitOrder } from '../../apiCalls';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: [],
      error: ''
    };
  }

  handleNameChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleIngredientChange = e => {
    e.preventDefault();
    this.setState({ingredients: [...this.state.ingredients, e.target.name]});
    this.setState({ error: '' })
  }

  handleSubmit = e => {
    if (this.state.ingredients.length > 0) {
      const orderInfo = {
        name: this.state.name,
        ingredients: this.state.ingredients
      }
      submitOrder(orderInfo)
        .then(data => this.props.updateOrder(data))
    } else {
      e.preventDefault()
      this.setState({ error: 'Add at least one ingredient to your order.' })
    }
    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
      {this.state.error && <p>{this.state.error}</p>}
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateOrder: (name, order) => dispatch( updateOrder(name, order) )
})

export default connect(null, mapDispatchToProps)(OrderForm);
