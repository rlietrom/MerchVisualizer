import React, {Component} from 'react'
import {max, select, scaleLinear} from 'd3'
import * as d3 from 'd3'


class BarChart extends Component {
  constructor(props){
    super(props)
    this.state = {
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
    // array of numbers
    var Lasts = this.props.lasts
    var minMargin = this.props.minMargin
    console.log('LASTS, PROFIT', Lasts, profit)

    var margin = {top: 30, right: 10, bottom: 50, left: 50}
    var width = 600
    var height = 600
    const svg = this.node
    const dataMax = max(profit)
    const yScale = scaleLinear()
      .domain([0, dataMax + .2])
      .range([300, height])
    const xScale = d3.scaleOrdinal()
      // .rangeRoundBands([0, width], 0.2, 0.2)
      // .domain([0, Lasts.length])
      .domain([Lasts.month_year])
    var yValue = function(d) {return d[0]}
    var xValue = function(d) {return d[1]}
    var rectangle = select(svg).selectAll('rect').data(profit)
    var yAxis = d3.axisLeft(yScale);
    var xAxis = d3.axisBottom(xScale)
    var xRoundBands = 0.2
    //enter
    rectangle
      .enter()
      .append('rect')

    //exit
    rectangle
      .exit()
      .remove()

    //update bars
    select(svg)
      .selectAll('rect')
      .attr('height', d => yScale(d))
      .attr('width', 37)
      .attr('x', (d,i) => i * (width/Lasts.length))
      .attr('y', d =>  height - yScale(d))
      .style('fill', function(d) {
        if(d > minMargin) {return 'black'}
        else {return 'MidnightBlue'}
      })

    //x axis
    select(svg)
      .attr("width", width + margin.left + margin.right)
    .append('g')
      // .attr('transform', 'translate(' + margin.left + margin.right + ')')
      .call(xAxis)

    // xScale
    //   .rangeRoundBands([0, width - margin.left - margin.right], xRoundBands)

    select(svg)
      .attr("height", height)
    .append("g")
      .call(yAxis);
  }

  render() {
    return <svg ref={svg => this.node = svg}
     width={600} height={620}></svg>
    }
  }
  export default BarChart;
