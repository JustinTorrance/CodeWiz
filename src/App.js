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
         this.setState({
          contextQuestions: contextQuestions,
          scopeQuestions: scopeQuestions,
          prototypeMethodQuestions: prototypeMethodQuestions
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
    const parsedQuery = JSON.parse(localStorage.getItem(query))
    console.log(parsedQuery);
    this.setState({
      filteredQuestions: parsedQuery,
      filterSelected: true,
      scopeSelected: false,
      contextSelected: false,
      prototypeSelected: false
    })
  }

  render() {
    if (this.state.filterSelected) {
      return ( <CardContainer questions={this.state.filteredQuestions} />
      )
    } else if (this.state.scopeSelected) { 
      return (  <div className='card-page'>
                  <CardContainer questions={this.state.scopeQuestions} />
                  <Filters fetchStorage={this.fetchStorage}/>
                </div>

  )
    } else if (this.state.contextSelected) { 
      return ( <CardContainer questions={this.state.contextQuestions} /> )
    } else if (this.state.prototypeSelected) { 
      return ( <CardContainer questions={this.state.prototypeMethodQuestions} /> )
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


