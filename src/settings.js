import React, {Component} from 'react'
import {Button, Input, Form} from 'semantic-ui-react'

export default class Settings extends Component {
  constructor(props){
    super(props)
    this.state = {
      spot: .89,
      quote: null,
      minMargin: null,
      expectedCosts: null
    }
    this.settingsContainer = this.settingsContainer.bind(this)
  }

  componentDidMount() {
  }
  componentDidUpdate() {
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
      <div>
      <h1>Settings</h1>
      {this.settingsContainer()}
      </div>
    )
  }
}
