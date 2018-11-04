import React, { Component } from 'react';
import './styles/main.scss';

class Card extends Component {
  constructor() {
    super();
    this.state = {
      answeredCorrectly: null,
      checked: ''
    }
    this.submitAnswer = this.submitAnswer.bind(this);
    this.changeRadio = this.changeRadio.bind(this);
    this.setCorrectToStorage = this.setCorrectToStorage.bind(this);
    this.setIncorrectToStorage = this.setIncorrectToStorage.bind(this);
  }


  submitAnswer(e) {
    e.preventDefault();
    if (this.state.checked === 'true') {
      this.setState({
        answeredCorrectly: true
      }) 
      this.setCorrectToStorage(this.props.card)

    } else {
      this.setState({
        answeredCorrectly: false
      })
      this.setIncorrectToStorage(this.props.card)
    }
  }

  setCorrectToStorage(card) {
    var correctCards = [];
    if (JSON.parse(localStorage.getItem("correctCardsStorage"))) {
      correctCards = JSON.parse(localStorage.getItem("correctCardsStorage")); 
      correctCards.push(card);
      localStorage.setItem('correctCardsStorage', JSON.stringify(correctCards));
    } else {
      correctCards.push(card);
      localStorage.setItem('correctCardsStorage', JSON.stringify(correctCards));
    }
  }

  setIncorrectToStorage(card) {
    var incorrectCards = [];
    if (JSON.parse(localStorage.getItem("incorrectCardsStorage"))) {
      incorrectCards = JSON.parse(localStorage.getItem("incorrectCardsStorage")); 
      incorrectCards.push(card);
      localStorage.setItem('incorrectCardsStorage', JSON.stringify(incorrectCards));
    } else {
      incorrectCards.push(card);
      localStorage.setItem('incorrectCardsStorage', JSON.stringify(incorrectCards));
    }
  }

  changeRadio(e) {
    this.setState({
      checked: e.target.className
    })
  }

  render() {
    return(
      <div className='card-wrapper'>
        <section className='question-section'>
          <h1>{ this.props.card.question }</h1>
        </section>

        <section className='answer-section'>
          <form>
            <ul>
            { this.props.card.answers.map((answer) => {
              return (
                <li>
                  <input 
                    type='radio' 
                    value={ answer.answer }
                    name='radio' 
                    onChange={ e => this.changeRadio(e) }
                    className={ answer.isCorrect.toString() } 
                    />
                  { answer.answer }
                </li>  
              )
            }) } 
            </ul>
            <button type='submit' onClick={e => this.submitAnswer(e)} className='submit-btn'>Submit Answer</button>
          </form>
        </section>
      </div> 
    )
  }


}



export default Card;