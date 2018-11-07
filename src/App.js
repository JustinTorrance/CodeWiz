import React, { Component } from 'react';
import CardContainer from './CardContainer.js';
import Filters from './Filters.js'
import './App.css';
import './styles/main.scss';

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
    })
  }

  render() {
    const { filterSelected, filteredQuestions, scopeSelected, contextSelected, prototypeSelected, contextQuestions, scopeQuestions, prototypeMethodQuestions } = this.state;
    if (filterSelected && scopeSelected) {
      return ( <CardContainer questions={filteredQuestions.filter((question) => {
        return question.category === 'scope' })} />)
    } else if (filterSelected && contextSelected) {
      return ( <CardContainer questions={filteredQuestions.filter((question) => {
        return question.category === 'context' })} /> )
    } else if (filterSelected && prototypeSelected) {
      return ( <CardContainer questions={filteredQuestions.filter((question) => {
        return question.category === 'prototype' })} /> )
    } else if (scopeSelected) { 
      return (  <div className='card-page'>
                  <CardContainer  filterSelected={filterSelected}
                                  questions={scopeQuestions} />
                  <Filters fetchStorage={this.fetchStorage}/>
                </div>)
    } else if (contextSelected) { 
      return ( <div className='card-page'>
                  <CardContainer  filterSelected={filterSelected}
                                  questions={contextQuestions} />
                  <Filters fetchStorage={this.fetchStorage}/>
                </div>) 
    } else if (prototypeSelected) { 
      return ( <div className='card-page'>
                  <CardContainer  filterSelected={filterSelected}
                                  questions={prototypeMethodQuestions} />
                  <Filters fetchStorage={this.fetchStorage}/>
                </div>)  
    } else {   
      return (
        <div className="App">
          <div className='landing-wrapper'>
            <h1>What Do You Want To Study?</h1>
            <button name='scope' onClick={this.renderQuestions} className='scope-btn btn'>Scope</button>
            <button name='context' onClick={this.renderQuestions} className='context-btn btn'>Context</button>
            <button name='prototype' onClick={this.renderQuestions} className='prototype-btn btn'>Prototype Methods</button>
          </div>
        </div>
    );
  }
}
}

export default App;
