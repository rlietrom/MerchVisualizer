import React, {Component} from 'react'
import {Button, Input, Form, Group} from 'semantic-ui-react'

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
            <Form.Field>
              <label>spot/quote</label>
              <Input
                width={6}
                placeholder='.86'
                onChange={(e) => this.setState({quote: e.target.value})}/>
              <label>minimum profit margin</label>
              <Input
                width={3}
                placeholder='.08'
                onChange={(e) => this.setState({minMargin: e.target.value})}/>
              <label>expected cost per month</label>
              <Input
                width={3}
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
