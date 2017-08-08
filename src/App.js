import React, { Component } from 'react';
import './App.css';
import {Button, Form, Input} from 'semantic-ui-react'
import BarChart from './barchart'
import Settings from './settings'
var axios = require('axios');
import { scaleLinear, max, select } from 'd3'
const uuidv4 = require('uuid/v4')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      spot: .89,
      quote: null,
      minMargin: null,
      expectedCosts: null
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

  settingsContainer() {
    return (
      <div>
        <Form>
            <Form.Field inline>
              <label>spot/quote</label>
              <Input
                placeholder='.91'
                onChange={(e) => this.setState({quote: e.target.value})}/>
              <label>minimum profit margin</label>
              <Input
                placeholder='.08'
                onChange={(e) => this.setState({minMargin: e.target.value})}/>
              <label>expected cost per month</label>
              <Input
                placeholder='.02'
                onChange={(e) => this.setState({expectedCosts: e.target.value})}/>
            </Form.Field>
          </Form>
      </div>
    )
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
        {this.settingsContainer()}
      </div>
    );
  }
}

export default App;
