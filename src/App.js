import React, { Component } from 'react';
import * as d3 from 'd3';
import * as axis from 'd3-axis';
import './App.css';


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
    var w = 500;
    var h = 300;
    var padding = 50;
    var barPadding = 1; // <-- New!
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
    console.log(d3.scaleTime)
    var xScale = d3
      .scaleTime()
      .domain([
        d3.min(dataset, function(d) {
          return new Date(parseInt(d[0]));
        }),
        d3.max(dataset, function(d) {
          return new Date(parseInt(d[0]));
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

    var rScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(dataset, function(d) {
          return d[1];
        })
      ])
      .range([2, 5]);

    var xAxis = d3.axisBottom(xScale).ticks(10); //Set rough # of ticks;
    var yAxis = d3.axisLeft(yScale).ticks(5) //Set rough # of ticks;
    // var formatAsPercentage = d3.format('.1%');
    // yAxis.tickFormat(formatAsPercentage);
    
    


    // d3.select('body')
    //   .selectAll('div') // selects p tags that dont exist yet
    //   .data(dataset) // counts and parses data values
    //   .enter() // creates a placeholder element and compares the data with the DOM
    //   .append('div') //takes the placeholder selection created by enter and inserts the parameter into the DOM
    //   // .text("New paragraph!"); // creates the paragraph tags x amount of times
    //   // .text(function(d) {
    //   //   return d;
    //   // }) // goes to each item in the dataset
    //   // .style('color', 'red') //colors the text red
    //   .attr('class', 'bar')
    //   .style('height', function(d) {
    //     var barHeight = d * 5; //Scale up by factor of 5
    //     return barHeight + 'px';
    //   });
    var svg = d3
      .select('body')
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

    return <div className="gdp">GDP Growth in the USA</div>;
  }
}

export default App;
