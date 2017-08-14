import React, { Component } from 'react';
import {BarChart, Bar, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell} from 'recharts'


class ReChart extends Component{
  constructor(props){
    super(props)
    this.state = {
    }
  }

	render () {
    var data = this.props.data
    console.log('DATA in RECHART', data)
    var value = this.props.value
    var fut = this.props.fut
    var prof = this.props.prof
    var marg = this.props.marg
    var dollarsPerPound = this.props.dollarsPerPound
    return (
      <div>
    	<BarChart
        width={700}
        height={450}
        margin={{top: 10, right: 10, left: 10, bottom: 10}}
        data={data}
        barCategoryGap={4}
        >
       <XAxis dataKey='month_year' type='category' tickCount={14}/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
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
         {marg ? <Bar dataKey='margProfit' fill='#D3D3D3' /> : null}
     </BarChart>
     </div>
    );
  }
}
  export default ReChart;
