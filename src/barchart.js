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
    this.createBarChart();
  }
  componentDidUpdate() {
    this.createBarChart()
  }

  createBarChart() {
    var profit = this.props.profit
    var Lasts = this.props.lasts
    var minMargin = this.props.minMargin

    const svg = this.node
    const dataMax = max(profit)
    const yScale = scaleLinear()
    .domain([0, dataMax])
    .range([-300, 300])
    // const yAxis = .scale(yScale)

    //enter
    select(svg)
    .selectAll('rect')
    .data(profit)
    .enter()
    .append('rect')

    //exit
    select(svg)
    .selectAll('rect')
    .data(profit)
    .exit()
    .remove()

    //update
    select(svg)
    .selectAll('rect')
    .attr('height', d => yScale(d))
    .attr('width', 37)
    .attr('x', (d,i) => i * 40)
    .attr('y', d => 300 - yScale(d))
    .style('fill', function(d) {
      if(d > minMargin) {return 'black'}
      else {return 'MidnightBlue'}
    })
  }

  render() {
    return <svg ref={svg => this.node = svg}
     width={600} height={620}></svg>
    }
  }
  export default BarChart;
