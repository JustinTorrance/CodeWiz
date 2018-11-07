import React, { Component } from 'react';
import './styles/main.scss';

class Card extends Component {
  constructor() {
    super();
    this.state = {
      answeredCorrectly: null,
      correct: ''
    }
    this.submitAnswer = this.submitAnswer.bind(this);
    this.setClassName = this.setClassName.bind(this);
    this.setCorrectToStorage = this.setCorrectToStorage.bind(this);
    this.setIncorrectToStorage = this.setIncorrectToStorage.bind(this);
    this.changeToCorrect = this.changeToCorrect.bind(this);
  }

  submitAnswer(e) {
    e.preventDefault();
    if (this.state.correct === 'true') {
      this.changeToCorrect(e)
    } else if (this.state.correct === 'false') {
      this.changeToIncorrect(e)
    }
  }

  changeToCorrect(e) {
    this.setState({
      answeredCorrectly: true
    }) 
    e.target.closest('.card-wrapper').classList.toggle('correct')
    this.setCorrectToStorage(this.props.card)
  }

  changeToIncorrect(e) {
    this.setState({
      answeredCorrectly: false  
    })
    e.target.closest('.card-wrapper').classList.toggle('incorrect')
    this.setIncorrectToStorage(this.props.card)
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

  setClassName(e) {
    this.setState({
      correct: e.target.className
    })
  }

  render() {
    if (this.state.answeredCorrectly) {
      return(
        <div className='card-wrapper'>
        <section className='question-section'>
          <h3>{ this.props.card.question }</h3>
        </section>
        <section className='answer-section'>
          <div className='answer-div'>
            { this.props.card.answers.filter((answer) => {
              if (answer.isCorrect)
              return (
                <p> { answer.answer } </p> 
              )
              }).map(answer => answer.answer)
            }
            <p className='correctResult'> That's correct! </p>
          </div>
        </section>
      </div> 
      )
    } else if (this.state.answeredCorrectly === false) {
      return(
        <div className='card-wrapper'>
          <section className='question-section'>
            <h3>{ this.props.card.question }</h3>
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
                      onChange={ e => this.setClassName(e) }
                      className={ answer.isCorrect.toString() } 
                      />
                    { answer.answer }
                  </li>  
                )
              })} 
              </ul>
              <p className='incorrectResult'>That's incorrect. Try again!</p>
              <button type='submit' onClick={e => this.submitAnswer(e)} className='submit-btn'>Submit Answer</button>
            </form>
          </section>
        </div> 
      )
    } else {
    return(
      <div className='card-wrapper'>
        <section className='question-section'>
          <h3>{ this.props.card.question }</h3>
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
                    onChange={ e => this.setClassName(e) }
                    className={ answer.isCorrect.toString() } 
                    />
                  { answer.answer }
                </li>  
              )
            })} 
            </ul>
            <button type='submit' onClick={e => this.submitAnswer(e)} className='submit-btn'>Submit Answer</button>
          </form>
        </section>
      </div> 
      )
    }
  }
}

export default Card;