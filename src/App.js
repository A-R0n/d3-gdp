import React, { Component } from 'react';
import * as d3 from 'd3';
import { select } from 'd3';
import './App.css';
import Bar from './Components/Bar';

class App extends Component {
  constructor() {
    super();

    this.state = {
      growth: [
        { year: 2007, gdp: 14.452 },
        { year: 2008, gdp: 14.713 },
        { year: 2009, gdp: 14.449 },
        { year: 2010, gdp: 14.992 },
        { year: 2011, gdp: 15.543 },
        { year: 2012, gdp: 16.197 },
        { year: 2013, gdp: 16.785 },
        { year: 2014, gdp: 17.522 },
        { year: 2015, gdp: 18.219 },
        { year: 2016, gdp: 18.707 },
        { year: 2017, gdp: 19.485 }
      ]
    };
  }

  render() {
    var w = 500,
      w2 = 400;
    var h = 300,
      h2 = 4;
    var growth = [
      { year: 2007, gdp: 14.452 },
      { year: 2008, gdp: 14.713 },
      { year: 2009, gdp: 14.449 },
      { year: 2010, gdp: 14.992 },
      { year: 2011, gdp: 15.543 },
      { year: 2012, gdp: 16.197 },
      { year: 2013, gdp: 16.785 },
      { year: 2014, gdp: 17.522 },
      { year: 2015, gdp: 18.219 },
      { year: 2016, gdp: 18.707 },
      { year: 2017, gdp: 19.485 }
    ];
    var padding = 50;
    var barPadding = 2; // <-- New!
    var dataset = [
      [2008, -0.3],
      [2009, -2.8],
      [2010, 3.0],
      [2011, 1.7],
      [2012, 2.2],
      [2013, 1.7],
      [2014, 2.6],
      [2015, 2.9],
      [2016, 1.5],
      [2017, 2.3]
    ];

    var xScale = d3
      .scaleLinear()
      .domain([
        d3.min(dataset, function(d) {
          return d[0];
        }),
        d3.max(dataset, function(d) {
          return d[0];
        })
      ])
      .range([padding, w - padding * 2]);

    var yScale = d3
      .scaleLinear()
      .domain([
        d3.min(dataset, function(d) {
          return d[1] - 1;
        }),
        d3.max(dataset, function(d) {
          return d[1] + 1;
        })
      ])
      .range([h - padding, padding]);

    var line = d3
      .line()
      .x(function(d) {
        return xScale(d[0]);
      })
      .y(function(d) {
        return yScale(d[1]);
      })
      .curve(d3.curveLinear);

    // d3.select('body').append('code').text('Line path data: ' + line(dataset));

    var rScale = d3
      .scaleLinear()
      .domain([
        -6,
        d3.max(dataset, function(d) {
          return d[1];
        })
      ])
      .range([2, 5]);

    var xAxis = d3
      .axisBottom(xScale)
      .tickValues([2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017])
      .ticks(d3.timeYear())
      .tickFormat(function(n) {
        return n;
      });
    var yAxis = d3
      .axisLeft(yScale)
      .tickValues([-3, -2, -1, 0, 1, 2, 3, 4])
      .tickFormat(function(n) {
        return n + '%';
      });

    var svg = d3
      .select('#area1')
      .append('svg')
      .attr('width', w)
      .attr('height', h);
    svg
      .selectAll('circle')
      .data(dataset)
      .enter()
      .append('circle')
      .attr('fill', function(d) {
        return 'rgb(0, 0, ' + d * 10 + ')';
      })
      .attr('cx', function(d) {
        return xScale(d[0]);
      })
      .attr('cy', function(d) {
        return yScale(d[1]);
      })
      .attr('r', function(d) {
        return rScale(d[1]);
      })
      .attr('width', w / dataset.length - barPadding)
      .attr('height', function(d) {
        return d; // <-- Times four!
      });
    svg
      .selectAll('text')
      .data(dataset)
      .enter()
      .append('text')
      .text(function(d) {
        return d[0] + ',' + d[1];
      })
      .attr('x', function(d) {
        return xScale(d[0]);
      })
      .attr('y', function(d) {
        return yScale(d[1]);
      })
      .attr('font-family', 'sans-serif')
      .attr('font-size', '11px')
      .attr('fill', 'red');

    svg
      .append('g')
      .attr('class', 'axis') //Assign "axis" class
      .attr('transform', 'translate(0,' + (h - padding) + ')')
      .call(xAxis);

    svg
      .append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(' + padding + ',0)')
      .call(yAxis);

    svg
      .append('path')
      .datum(dataset)
      .attr('d', line);

    // BAR GRAPH

    // const margin = 50;
    var margin = { top: 60, right: 20, bottom: 30, left: 50 };

    const width = 450;
    const height = 250;

    const svg = d3.select('#area2');
    const chart = svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const xScale_2 = d3
      .scaleBand()
      .rangeRound([margin.left, width])
      .domain([2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017]);

    chart
      .selectAll()
      .data(growth)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('fill', 'teal')
      .attr('x', function(d) {
        return xScale_2(d.year);
      })
      .attr('width', xScale_2.bandwidth())
      .attr('y', function(d) {
        return yScale(d.gdp);
      })
      .attr('height', function(d) {
        return height - yScale(d.gdp);
      })
      .attr('transform', `translate(${50}, ${height})`);

    chart
      .append('g')
      .attr('transform', 'translate(' + padding + ',0)')
      .call(d3.axisLeft(yScale));
    chart
      .append('g')
      .attr('transform', 'translate(0,' + (h - padding) + ')')
      .call(d3.axisBottom(xScale_2));

    return <div className="gdp" />;
  }
}

export default App;
