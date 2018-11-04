import React, { Component } from 'react';
import './styles/main.scss';
import Card from './Card.js'


class Filters extends Component {
  constructor() {
    super();

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
        <button onClick={e => this.filterCards(e)} value='correctCardsStorage' className='view-correct-btn'>View Correct Cards</button>
        <button onClick={e => this.filterCards(e)} value='incorrectCardStorage' className='view-incorrect-btn'>View Incorrect Cards</button>
        <button onClick={e => this.filterCards(e)} value='all' className='view-all-btn'>View All Cards</button>
      </form>
    )
  }





}

export default Filters;