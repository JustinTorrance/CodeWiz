import React, { Component } from 'react';
import './styles/main.scss';
import Card from './Card.js'


class Filters extends Component {
  constructor() {
    super();
  }

  navigateHome(e) {
    e.preventDefault();
    const { takeHome } = this.props;
    takeHome();
  }

  resetCards(e) {
    e.preventDefault();
    const { clearStorage } = this.props;
    clearStorage(); 
  }

  filterCards(e) {
    e.preventDefault();
    const filterQuery = e.target.value;
    const { fetchStorage } = this.props;
    fetchStorage(filterQuery);
  }

  render() {
    return (
      <form className='filter-btn-section'>
        <button onClick={e => this.filterCards(e)} value='correctCardsStorage' className='view-correct-btn'>Show Correct Cards</button>
        <button onClick={e => this.filterCards(e)} value='incorrectCardsStorage' className='view-incorrect-btn'>Show Incorrect Cards</button>
        <button onClick={e => this.resetCards(e)} value='resetCards' className='reset-btn'>Reset Cards</button>
        <button onClick={e => this.navigateHome(e)} value='home' className='home-btn'>Home</button>
      </form>
    )
  }
}

export default Filters;