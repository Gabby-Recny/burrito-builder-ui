import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    console.log('PROPS LINE 5 ORDER FORM', props)
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
    console.log(this.state.ingredients)
  }


  handleSubmit = e => {
    e.preventDefault();
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
        {console.log(ingredient)}
        <button 
            key={ingredient}
            name={ingredient} 
            value={ingredient} 
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

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
