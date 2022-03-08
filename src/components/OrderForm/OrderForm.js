import React, { Component } from 'react';
import { postNewOrder } from '../../apiCalls';
import './Form.css'

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: []
    };
  }
  handleNameChange = (event) => {
    this.setState({
      name: event.target.value,
    })
  }
  
  handleIngredientChange = (event) => {
    event.preventDefault()
    this.setState({
      ingredients: [...this.state.ingredients, event.target.value]
    })
  }
  
  handleSubmit = e => {
    e.preventDefault();
    const newOrder = {
      id: Date.now(),
      ...this.state
    }

    postNewOrder(newOrder)
      .then(this.props.addNewOrder(newOrder))
      .catch(err => console.log(err))
    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <>
        <button
            key={ingredient}
            name={ingredient} 
            value={ingredient} 
            className='ingredient-btns'
            onClick={(e) => this.handleIngredientChange(e)}
            >
            {ingredient}
          </button>
        </>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p className='add-ingredients'>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button 
          onClick={e => this.handleSubmit(e)}
          disabled={!this.state.name || !this.state.ingredients}
          className='submit-button' 
          >
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
