import React, { Component } from 'react';
import {ResponsiveContainer, BarChart, Bar, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, Statistic} from 'recharts'


class ReChart extends Component{
  constructor(props){
    super(props)
    this.state = {
    }
  }

  render () {
    var data = this.props.data
    data.map((month) => {
      month.last = parseFloat(month.last.toFixed(5))
      month.marginal_profit = parseFloat(month.marginal_profit.toFixed(5))
      month.profit = parseFloat(month.profit.toFixed(5))
    })
    console.log('DATA in RECHART', data)
    var value = this.props.value
    var fut = this.props.fut
    var prof = this.props.prof
    var marg = this.props.marg
    var dollarsPerPound = this.props.dollarsPerPound
    return (
      <div>
        <ResponsiveContainer width='100%' height='100%' aspect={1.6}>
          <BarChart
            margin={{top: 10, right: 10, left: 10, bottom: 10}}
            data={data}
            barCategoryGap={4}
            >
              <XAxis dataKey='month_year' type='category' tickCount={14} interval={0}/>
              <YAxis unit='$' type='number'/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip separator=': $'/>
              <Legend />
              <ReferenceLine y={0} stroke='#000'/>
              {fut ? <Bar dataKey='last' fill='black' /> : null}
              {prof ?
                <Bar dataKey='profit' >
                  {
                    data.map((month, index) => (
                      <Cell fill={(month.profit > month.minMargin) ? '#4dffa6' : '#404040'} />
                    ))
                  }
                </Bar> : null}
                {marg ? <Bar dataKey='marginal_profit' fill='#298378' /> : null}
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      }
    }
    export default ReChart;
