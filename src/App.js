import React, { Component } from 'react';
import './App.css';
import {Button, Form, Input, List, Header} from 'semantic-ui-react'
import BarChart from './barchart'
import Settings from './settings'
var axios = require('axios');
import { scaleLinear, max, select } from 'd3'
const uuidv4 = require('uuid/v4')

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      spot: .85,
      quote: null,
      minMargin: .08,
      costs: .003,
      profitsArr: [],
      lasts: [],
    }
    this.settingsContainer = this.settingsContainer.bind(this)
    this.calculateProfit = this.calculateProfit.bind(this)
    this.showProfit = this.showProfit.bind(this)
  }

  componentWillMount() {
    axios({
      method: 'GET',
      url: 'http://localhost:3000/getfutures'
      // url: 'https://merch-visualizer.herokuapp.com/'
    })
    .then(resp => {
      if(resp.data.success) {
        var lasts = resp.data.lists.map((obj) => { return obj.last*.01 })
        var profits = lasts.map((future, index) => {
          var physical;
          var months = index + 1
          if(this.state.quote) {physical = this.state.quote}
          else {physical = this.state.spot}
          return future - physical - (this.state.costs*months)
        })
        this.setState({profitsArr: profits, lasts:lasts})
      } else {
        console.log('not successful /getfutures')
      }
    })
  }

  changeCosts(e) {
    this.setState({costs: e.target.value})
    this.calculateProfit()
  }

  changeMinMargin(e) {
    this.setState({minMargin: e.target.value})
    this.calculateProfit()
  }

  changeQuote(e) {
    this.setState({quote: e.target.value})
    this.calculateProfit()
  }

  calculateProfit() {
    var profits = this.state.lasts.map((future, index) => {
      var physical;
      var months = index + 1
      if(this.state.quote) {physical = this.state.quote}
      else {physical = this.state.spot}
      return future - physical - (this.state.costs*months)
    })
    this.setState({profitsArr: profits})
  }

  settingsContainer() {
    return (
      <div>
        <Form>
          <Form.Field inline>
            <label>spot/quote</label>
            <Input
              placeholder='.91'
              onChange={(e) => this.changeCosts(e)}/>
              <label>minimum profit margin</label>
              <Input
                placeholder='.08'
                onChange={(e) => this.changeMinMargin(e)}/>
                <label>expected cost per month</label>
              <Input
                placeholder='.02'
                onChange={(e) => this.changeCosts(e)}/>
            </Form.Field>
          </Form>
        </div>
        )
      }
        showProfit() {
          return (
            <div>
              <Header>Profits</Header>
              <List>
                {this.state.profitsArr.map((profit) =>
                  <List.Item>{profit}</List.Item>
                )
              }
              </List>
            </div>
          )
        }


        render() {
          console.log('RENDER', this.state.profitsArr, this.state.lasts)
          return (
            <div className="App">
              <Button
                onClick={() => this.getFutures()}
                >hello
              </Button>
              <BarChart
                key="123123123"
                profit={this.state.profitsArr}
                lasts={this.state.lasts}
                minMargin={this.state.minMargin}
              />
              {this.settingsContainer()}
              {this.showProfit()}
            </div>
          );
        }
      }

      export default App;
