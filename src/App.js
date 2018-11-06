import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CardContainer from './CardContainer.js';
import Filters from './Filters.js'

class App extends Component {
  constructor() {
    super();
    this.state = {
      filteredQuestions: [],
      scopeQuestions: [],
      contextQuestions: [],
      prototypeMethodQuestions: [],
      scopeSelected: false,
      contextSelected: false,
      prototypeSelected: false,
      filterSelected: false

    }
    this.renderQuestions = this.renderQuestions.bind(this);
    this.fetchStorage = this.fetchStorage.bind(this);
  }

  componentDidMount() {
    const url = 'http://memoize-datasets.herokuapp.com/api/v1/codewizcategories';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const { contextQuestions, scopeQuestions, prototypeMethodQuestions } = data.codeWizCategories
        const contextQuestionsPlus = contextQuestions.map((question) => {
          return Object.assign({}, question, {category: "context"})
        });
        const scopeQuestionsPlus = scopeQuestions.map((question) => {
          return Object.assign({}, question, {category: "scope"})
        });
        const prototypeMethodQuestionsPlus = prototypeMethodQuestions.map((question) => {
          return Object.assign({}, question, {category: "prototype"})
        });

         this.setState({
          contextQuestions: contextQuestionsPlus,
          scopeQuestions: scopeQuestionsPlus,
          prototypeMethodQuestions: prototypeMethodQuestionsPlus
         })
      })
      .catch(error => console.log(error))
  }
  //setting state for 3 different keys in this.state
  //setState updates this.state
  // this.state.contextQuestions

  renderQuestions(e) {
    if (e.target.name === 'scope') {
      this.setState({
        scopeSelected: !this.state.scopeSelected
      }) 
    } else if (e.target.name === 'context') {
      this.setState({
        contextSelected: !this.state.contextSelected
      }) 
    } else {
      this.setState({
        prototypeSelected: !this.state.prototypeSelected
      }) 
    }
  }

  fetchStorage(query) {
    const parsedQuery = JSON.parse(localStorage.getItem(query));
    this.setState({
      filteredQuestions: parsedQuery,
      filterSelected: true
      // scopeSelected: false,
      // contextSelected: false,
      // prototypeSelected: false
    })
  }

  render() {
    if (this.state.filterSelected && this.state.scopeSelected) {
      return ( <CardContainer questions={this.state.filteredQuestions.filter((question) => {
        return question.category === 'scope';
      })} />
      )
    } else if (this.state.filterSelected && this.state.contextSelected) {
      return ( <CardContainer questions={this.state.filteredQuestions.filter((question) => {
        return question.category === 'context';
      })} />
      )
    } else if (this.state.filterSelected && this.state.prototypeSelected) {
      return ( <CardContainer questions={this.state.filteredQuestions.filter((question) => {
        return question.category === 'prototype';
      })} />
      )
    } else if (this.state.scopeSelected) { 
      return (  <div className='card-page'>
                  <CardContainer questions={this.state.scopeQuestions} />
                  <Filters fetchStorage={this.fetchStorage}/>
                </div>)
    } else if (this.state.contextSelected) { 
      return ( <div className='card-page'>
                  <CardContainer questions={this.state.contextQuestions} />
                  <Filters fetchStorage={this.fetchStorage}/>
                </div>) 
    } else if (this.state.prototypeSelected) { 
      return ( <div className='card-page'>
                  <CardContainer questions={this.state.prototypeMethodQuestions} />
                  <Filters fetchStorage={this.fetchStorage}/>
                </div>)  
    } else {   
      return (
        <div className="App">
          <div className='landing-wrapper'>
            <h1>What Do You Want To Study?</h1>
            <button name='scope' onClick={this.renderQuestions} className='scope-btn'>Scope</button>
            <button name='context' onClick={this.renderQuestions} className='context-btn'>Context</button>
            <button name='prototype' onClick={this.renderQuestions} className='prototype-btn'>Prototype Methods</button>
  {/*store above is props. I'm creating a prop and passing it. A prop is basically a variable/attribute*/ } 
          </div>
        </div>
    );
  }
}
}

export default App;

//If contextSelected, and clicks view all correct cards: 
// show filter cards IF they are in the contextSelected array AND in correctCardsStorage


