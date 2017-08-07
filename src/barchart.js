import React, {Component} from 'react'
import { max, select, scaleLinear} from 'd3'


class BarChart extends Component {
  constructor(props){
      super(props)
      this.state = {
        lasts: null
      }
      this.createBarChart = this.createBarChart.bind(this)
   }

   componentDidMount() {

     var Lasts = this.props.data.map((obj) => {
       return obj.last
     })
     this.setState({lasts: Lasts})
     this.createBarChart()
   }

   componentWillMount() {

   }

   componentDidUpdate() {
     this.createBarChart()
   }

   createBarChart() {
     const node = this.node
     const dataMax = max(this.state.lasts)
     const xScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, 300])

      select(node)
        .selectAll('rect')
        .data(this.state.lasts)
        .enter()
        .append('rect')

     select(node)
        .selectAll('rect')
        .data(this.state.lasts)
        .exit()
        .remove()

      select(node)
        .selectAll('rect')
        .data(this.state.lasts)
        .style('fill', '#fe9922')
        .attr('y', (d,i) => i * 25)
        .attr('x', d => 200 - xScale(d))
        .attr('width', d => xScale(d))
        .attr('height', 25)
   }

   render() {
     return <svg ref={node => this.node = node}
    width={500} height={500}></svg>
   }
}
export default BarChart
