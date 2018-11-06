import React from 'react';
import './styles/main.scss';
import  Card from './Card.js'

export default function CardContainer(props) {
  let questionsArr;
  
  if (JSON.parse(localStorage.getItem("correctCardsStorage"))) {
    let correctCards = JSON.parse(localStorage.getItem("correctCardsStorage")).map((card) => card.question)
      questionsArr = props.questions.filter((card) => !correctCards.includes(card.question))
      .map((question) => {
        return (<Card card={ question }/>)
      })
  } else {
     questionsArr = props.questions.map((question) => {
      return (<Card card={ question }/>)
    })
  }
    
  return (
    <div className='card-container'>
      { questionsArr }
    </div>
  )
}