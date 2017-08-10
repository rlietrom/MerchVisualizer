import React, { Component } from 'react';
// import './App.css';
import {Button, Form, Input, List, Header, Grid, Segment} from 'semantic-ui-react'
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
  }

  componentWillMount() {
    axios({
      method: 'GET',
      // url: 'http://localhost:3000/getfutures'
      url: 'https://merch-visualizer.herokuapp.com/'
    })
    .then(resp => {
      if(resp.data.success) {
        var lasts = resp.data.lists.map((obj) => { return obj.last*.01 })
        console.log('LASTS', lasts)
        var profits = lasts.map((future, index) => {
          var physical;
          var months = index + 1
          if(this.state.quote) {physical = this.state.quote}
          else {physical = this.state.spot}
          return future - physical - (this.state.costs*months)
        })
        console.log('PROFITSWILLMOUNT', profits)
        this.setState({profitsArr: profits, lasts:lasts})
      } else {
        console.log('not successful /getfutures')
      }
    })
  }

  changeCosts(e) {
    this.setState({costs: e.target.value})
  }

  changeMinMargin(e) {
    this.setState({minMargin: e.target.value})
  }

  changeQuote(e) {
    this.setState({quote: e.target.value})
  }

  calculateProfit() {
    var profits = this.state.lasts.map((future, index) => {
      var physical;
      var months = index + 1
      if(this.state.quote) {physical = this.state.quote}
      else {physical = this.state.spot}
      console.log('FUTURE, PHYS, COSTS', future, physical, this.state.costs, months)
      return future - physical - (this.state.costs*months)
    })
    console.log('PROFITS', profits)
    this.setState({profitsArr: profits})
  }

  settingsContainer() {
    return (
      <Grid centered columns={2} divided>
        <Grid.Row
          // padded relaxed stackable
          >
          <Grid.Column width={4} >
            <Segment>Settings
              <Form>
                <Form.Field>
                  <label>spot/quote</label>
                  <Form.Input
                    placeholder='.91'
                    onChange={(e) => this.changeQuote(e)}/>
                    <label>minimum profit margin</label>
                    <Form.Input
                      placeholder='.08'
                      onChange={(e) => this.changeMinMargin(e)}/>
                      <label>cost per month</label>
                      <Form.Input
                        placeholder='.02'
                        onChange={(e) => this.changeCosts(e)}/>
                        <Form.Button
                          basic
                          type='submit'
                          onClick={() => this.calculateProfit()}>Apply</Form.Button>
                        </Form.Field>
                      </Form>
                    </Segment>
                  </Grid.Column>
                  <Grid.Column width={12}>
                    <Segment>
                      <BarChart
                        key="123123123"
                        profit={this.state.profitsArr}
                        lasts={this.state.lasts}
                        minMargin={this.state.minMargin}
                      />
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            )
          }

          render() {
            return (
            <div className="App">
              {this.settingsContainer()}
            </div>
          )
          }
        }
        export default App;
