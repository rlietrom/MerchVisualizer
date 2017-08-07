import React, { Component } from 'react';
import './App.css';
import {Button} from 'semantic-ui-react'
import BarChart from './barchart'
var axios = require('axios');
import { scaleLinear, max, select } from 'd3'
const uuidv4 = require('uuid/v4')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null
    }
    this.displayFutures = this.displayFutures.bind(this)
  }

  componentWillMount() {
    axios({
      method: 'GET',
      url: 'http://localhost:3000/getfutures'
    })
    .then(resp => {
      console.log('RESP', resp)
      if(resp.data.success) {
        console.log(resp.data.lists);
        this.setState({data: resp.data.lists})
        console.log("THIS STATE DATA", this.state.data)
      } else {
        console.log('not successful /getfutures')
      }
    })
  }

  displayFutures() {
    if(this.state.data) {
      var arr = this.state.data
      return (
        <ul>{arr.map((obj) => {
          return (<li key={uuidv4()}>{obj.month_year + "," + obj.last}</li>)
        })}</ul>
      )
    } else {
      console.log('couldnt find')
    }
  }

  render() {
    return (
      <div className="App">
        <Button
          onClick={() => this.getFutures()}
          >hello
        </Button>
        <BarChart key="123123123" data={this.state.data} />
        {this.displayFutures()}
      </div>
    );
  }
}

export default App;
