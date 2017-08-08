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
    var Lasts = this.props.data.map((obj) => {
      return obj.last
    })

    // var Lasts = setTimeout(randomFunc, 1000)
    const node = this.node
    const dataMax = max(Lasts)
    const yScale = scaleLinear()
    .domain([0, dataMax])
    .range([0, 600])

    //enter
    select(node)
    .selectAll('rect')
    .data(Lasts)
    .enter()
    .append('rect')


    //exit
    select(node)
    .selectAll('rect')
    .data(Lasts)
    .exit()
    .remove()

    //update
    select(node)
    .selectAll('rect')
    .attr('height', d => yScale(d))
    .attr('width', 25)
    .attr('x', (d,i) => i * 25)
    .attr('y', d => 600 - yScale(d))
    .style('fill', function(d) {
      if(d > 99) {return 'green'}
      else {return 'black'}
    })
  }

  render() {
    return <svg ref={node => this.node = node}
      width={500} height={500}></svg>
    }
  }
  export default BarChart;
