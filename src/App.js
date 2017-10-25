import React, { Component } from 'react';
// import './App.css';
import {Button, Form, Input, List, Header, Grid, Image, Segment, Radio, Checkbox, Icon, Popup, Statistic, Modal} from 'semantic-ui-react'
import BarChart from './barchart'
import ReChart from './reChart'
import Settings from './settings'
import _ from 'underscore'
var axios = require('axios');


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      spot: .85,
      quote: null,
      minMargin: .05,
      transportationCost: .0078,
      inAndOut: 0.00158,
      costs: .003,
      data: [],
      fut: false,
      prof: true,
      marg: true,
      dollarsPerPound: true,
      open: false,
      // radio: '$/lb'
    }
    // this.changeUnits = this.changeUnits.bind(this)
    this.calculateProfit = this.calculateProfit.bind(this)
    this.settingsContainer = this.settingsContainer.bind(this)
    // this.handleRadioChange = this.handleRadioChange.bind(this)
    // this.handleRadioChange2 = this.handleRadioChange2.bind(this)
  }

  componentWillMount() {
    axios({
      method: 'GET',
      url: 'http://localhost:3000/getfutures'
      // url: 'https://merch-visualizer.herokuapp.com/getfutures'
    })
    .then(resp => {
      if(resp.data.success) {
        var lists = resp.data.lists
        var profitBefore;
        var profitMax = 0
        var profitMaxMonth;
        var newArr = lists.map((future, index) => {
          var physical;
          var months = index + 1
          if(this.state.quote) {physical = this.state.quote}
          else {physical = this.state.spot}
          future.last = future.last*.01
          var actualProfit = future.last - physical - (this.state.transportationCost + this.state.costs*months)
          var label =  future.month_year.substring(0, 3)
          var margProfit;
          if(index === 0) {margProfit = actualProfit}
          else {margProfit = actualProfit - profitBefore}
          profitBefore = actualProfit
          var minMargin = this.state.minMargin
          future.minMargin = minMargin
          future.profit = actualProfit
          future.marginal_profit = margProfit
          future.month_year = label
          return future
        })
        console.log('newArr', newArr)
        this.setState({data: newArr, profitMax: profitMax, profitMaxMonth: profitMaxMonth, open: true})
      } else {
        console.log('not successful /getfutures')
      }
    })
  }

  componentDidMount() {
  }

  changeCosts(e) {
    var costs = parseFloat(e.target.value)
    this.setState({costs: costs})
  }
  changeMinMargin(e) {
    var minMargin = parseFloat(e.target.value)
    this.setState({minMargin: minMargin})
  }
  changeQuote(e) {
    var quote = parseFloat(e.target.value)
    this.setState({quote: quote})
  }
  changeTransportationCost(e) {
    var transportationCost = parseFloat(e.target.value)
    if(this.state.radio === '$/lb') {
      console.log('transportationCost', transportationCost)
    this.setState({transportationCost: transportationCost})
    }
    else {
      transportationCost = transportationCost/41000
      console.log('transportation cost / 41000', transportationCost)
      this.setState({transportationCost: transportationCost})
    }
  }

  changeInAndOut(e) {
    var inAndOut = parseFloat(e.target.value)
    this.setState({inAndOut: inAndOut})
  }

  calculateProfit(e) {
    e.preventDefault()
    var updatedArr = this.state.data.map((future, index) => {
      var physical;
      var months = index + 1
      if(this.state.quote) {physical = this.state.quote}
      else {physical = this.state.spot}
      if(this.state.radio === '$/lb')
      future["profit"] = future["last"] - physical - (this.state.transportationCost + this.state.costs*months)
      future["marginal_profit"] = (future["profit"])/months
      future["minMargin"] = this.state.minMargin
      return future
    })
    this.setState({data: updatedArr})
  }

  // handleChange(e, {value}) {
  //   this.setState({value})
  // }

  // handleRadioChange() {
  //   console.log('radio: $')
  //   this.setState({radio: '$'})
  // }
  //
  // handleRadioChange2() {
  //   console.log('radio: $/lb')
  //   this.setState({radio: '$/lb'})
  // }

  changeUnits(e) {
    if(this.state.dollarsPerPound) {
      console.log('TRUEEE')
      var mappedData = this.state.data.map((month) => {
        month["profit"] = month["profit"]*41000
        month["marginal_profit"] = month["marginal_profit"]*41000
        month["last"] = month["last"]*41000
        month["minMargin"] = month["minMargin"]*41000
        return month
      })
      console.log('MAPPED DATA', mappedData)
      this.setState({data: mappedData, dollarsPerPound: false})
    } else {
      console.log('TRUEEE')
      var unmappedData = this.state.data.map((month) => {
        month["profit"] = month["profit"]/41000
        month["marginal_profit"] = month["marginal_profit"]/41000
        month["last"] = month["last"]/41000
        month["minMargin"] = month["minMargin"]/41000
        return month
      })
      console.log('UNMAPPED DATA', unmappedData)
      this.setState({data: unmappedData, dollarsPerPound: true})
    }
  }

  modal() {
    console.log('MODAL')
    return (
      <Modal dimmer='blurring' open={this.state.open}>
        <Modal.Header textAlign='center'>You're about to enter Merch Visualizer</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Header>Preface</Header>
            <p>Last year, I bought a semi-truck sized load of milk powder, sold futures against it, stored the load in a warehouse for six months, and made $4,465 of profit. </p>
            <Header>Why and how?</Header>
            <List>
              <List.Item>1. The market was inefficient and small.</List.Item>
              <List.Item>2. I was in the right place at the right time.</List.Item>
            </List>
            <Header>What if we could make this arbitrage available to anyone with investing dollars?</Header>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button labelPosition='right' content="Enter" onClick={() => this.setState({open: !this.state.open})}></Button>
        </Modal.Actions>
      </Modal>
    )
  }


  settingsContainer() {
    return (
      <Grid centered columns={2} divided padded={true}>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Segment size='mini' compact={false} textAlign='center'>
              <Image size='medium' centered={true} src='http://res.cloudinary.com/dbcjaputq/image/upload/v1503092750/logo_nwc3ei.png'></Image>
              <Header as='h5'>A tool for quickly examining milk powder cash and carry opportunities. Brought to you by OG Merchants.</Header>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={3} >
            <Segment textAlign='right'>
              <Header.Content as='h3'>Settings</Header.Content>
              <Form>
                <Grid.Row>
                  {/* <Form.Field label='$' checked={this.state.radio === '$'} control={Radio} onChange={() => this.handleRadioChange()}></Form.Field> */}
                  {/* <Form.Field label='$/lb' checked={this.state.radio === '$/lb'} control={Radio} onChange={() => this.handleRadioChange2()}></Form.Field> */}
                </Grid.Row>
                <Form.Field>
                  <label>spot/quote</label>
                  <Form.Input
                    placeholder={'$0.85'}
                    // textAlign='right'
                    // value={this.state.spot}
                    onChange={(e) => this.changeQuote(e)}/>
                    <label>minimum profit margin</label>
                    <Form.Input
                      placeholder={'$0.08'}
                      onChange={(e) => this.changeMinMargin(e)}/>
                      <label>transportation costs</label>
                      <Form.Input
                        placeholder={'$0.0078'}
                        onChange={(e) => this.changeTransportationCost(e)}/>
                        <label>in & out fee</label>
                        <Form.Input
                          placeholder={'$0.00158'}
                          onChange={(e) => this.changeInAndOut(e)}/>
                        <label>cost per month</label>
                        <Form.Input
                          placeholder='.003'
                          onChange={(e) => this.changeCosts(e)}/>
                          <Form.Button
                            basic
                            type='submit'
                            onClick={(e) => this.calculateProfit(e)}>Apply</Form.Button>
                          </Form.Field>
                        </Form>
                        <Popup
                          trigger={<Button circular={true} size='medium' basic compact={true}>?</Button>}
                          content={<List bulleted>
                            <List.Item>Calculations are based on a 41,000 lb load size</List.Item>
                            <List.Item>Placeholders represent fixed (paperwork, 'in & out' fees for warehouses) and variable costs (monthly warehouse fees) from my personal experience but it's up to each user to do their own research</List.Item>
                            <List.Item>The daily spot price is a good place to start, but I suggest calling suppliers to get real quotes on product</List.Item></List>}
                            basic
                          />
                        </Segment>
                        <Segment textAlign='right'>
                          <p>View <a target="_blank" href="https://youtu.be/P57drjkXgFk">tutorial.</a> </p>
                          <p>Questions? Email me at rlietrom@gmail.com</p>
                        </Segment>
                      </Grid.Column>
                      <Grid.Column width={10} stretched={true}>
                        <Segment>
                          <Form>
                            <Form.Group inline>
                              <label>View</label>
                              <Form.Checkbox label='Futures' value='fut' checked={this.state.fut} onChange={() => this.setState({fut: !this.state.fut})} />
                              <Form.Checkbox label='Profit' value='prof' checked={this.state.prof} onChange={() => this.setState({prof: !this.state.prof})}/>
                              <Form.Checkbox label='Marginal Profit' value='marg' checked={this.state.marg} onChange={() => this.setState({marg:!this.state.marg})} />
                              <Form.Checkbox
                                slider
                                defaultChecked
                                label='$/lb'
                                onClick={(e) => this.changeUnits(e)} >
                              </Form.Checkbox>
                              <Popup
                                trigger={<Button circular={true} size='medium' basic compact={true}>?</Button>}
                                content={<List bulleted>
                                  <List.Item>Prices update with each page refresh and reflect futures contract prices from the CME</List.Item>
                                  <List.Item>When a month's profit is larger than your required margin, its bar will turn bright green</List.Item>
                                </List>}
                              />
                            </Form.Group>
                          </Form>
                          {this.state.data.length > 0 ?
                            <ReChart
                              dollarsPerPound={this.state.dollarsPerPound}
                              fut={this.state.fut}
                              prof={this.state.prof}
                              marg={this.state.marg}
                              data={this.state.data}
                            /> : <div> {this.state.data} </div>}
                          </Segment>
                        </Grid.Column>
                        {/* <Grid.Column width={3}>
                      </Grid.Column> */}
                    </Grid.Row>
                  </Grid>
                )
              }

              render() {
                console.log('this.state.radio', this.state.radio)
                return (
                  <div className="App">
                    {this.modal()}
                    {this.settingsContainer()}
                  </div>
                )
              }
            }
            export default App;
