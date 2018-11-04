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
    // this.setToStorage = this.setToStorage.bind(this);
  }


  submitAnswer(e) {
    e.preventDefault();
    if (this.state.checked === 'true') {
      console.log('card:', this.question)
      this.setState({
        answeredCorrectly: true
      }) 
      // localStorage.setItem("storedCardArray", JSON.stringify(newArray));

    } else {
      console.log('incorrect')
      this.setState({
        answeredCorrectly: false
      })
    }
    // this.setToStorage()
  }

  // setToStorage() {
  // }

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