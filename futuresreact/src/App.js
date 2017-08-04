import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import {Button} from 'semantic-ui-react'
var axios = require('axios');
// import $ from 'jquery';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null
    }
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: 'http://localhost:3000/getfutures'
    })
    .then(resp => {
      console.log(resp)

    })
  }

  getFutures() {
  }
  
  render() {
    return (
      <div className="App">
        <Button
          onClick={() => this.getFutures()}
          >hello</Button>
      </div>
    );
  }
}

export default App;
