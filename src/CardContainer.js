import React from 'react';
import './styles/main.scss';
import  Card from './Card.js';

export default function CardContainer({filterSelected, questions}) {
  let questionsArr;

  const getLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
  }
  
  if (getLocalStorage("correctCardsStorage") && filterSelected === false) {
    let correctCards = getLocalStorage("correctCardsStorage").map((card) => card.question)
      questionsArr = questions.filter((card) => !correctCards.includes(card.question))
      .map((question) => {
        return (<Card card={ question }/>)
      })
  } else {
     questionsArr = questions.map((question) => {
      return (<Card card={ question }/>)
    })
  }
    
  return (
    <div className='card-container'>
      { questionsArr }
    </div>
  )
}