import React, { Component } from 'react';
import * as d3 from 'd3';
import {select, scaleBand, scaleLinear} from 'd3';

export default class Bar extends Component {
  constructor() {
    super();

    this.state = {
      dataset2: [
        { year: 2008, growth: -0.3 },
        { year: 2009, growth: -2.8 },
        { year: 2010, growth: 3.0 },
        { year: 2011, growth: 1.7 },
        { year: 2012, growth: 2.2 },
        { year: 2013, growth: 1.7 },
        { year: 2014, growth: 2.6 },
        { year: 2015, growth: 2.9 },
        { year: 2016, growth: 1.5 },
        { year: 2017, growth: 2.3 }
      ]
    };
  }


  render() {
    // BAR GRAPH
    const svg = select('#area2');
    const width2 = +svg.attr('width');
    const height2 = +svg.attr('height');
    svg.selectAll('rect')
    .data(this.state.dataset2.map((elem) => elem.year))
    .enter()
    .append('rect')
    .attr("class", "special")
    .attr('width', 300)
    .attr('height', 300)
    return (
      <svg
        
      />
    );
  }
}
