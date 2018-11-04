import React, { Component } from 'react';
import './styles/main.scss';
import  Card from './Card.js'


export default function CardContainer(props) {
  let questionsArr = props.questions.map((question) => {
    return (<Card card={ question }/>)
  })
  return (
    <div className='card-container'>
      { questionsArr }
    </div>
  )
}

