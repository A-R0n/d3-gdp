import React, { Component } from 'react';
import * as d3 from 'd3';
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
    var w = 500,
      w2 = 400;
    var h = 300,
      h2 = 4;

    var padding = 50;
    var barPadding = 2; // <-- New!
    var parseTime = d3.timeParse('%y');
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
    var bar = [-0.3, -2.8, 3.0, 1.7, 2.2, 1.7, 2.6, 2.9, 1.5, 2.3];

    var scale_bar_x = d3
      .scaleBand()
      .domain([
        d3.min(bar, function(d) {
          return d[0];
        }),
        d3.max(bar, function(d) {
          return d[0];
        })
      ])
      .range([0, w2])
      .padding(0.1);

    var scale_bar_y = d3
      .scaleLinear()
      .domain([0, d3.max(bar, d => d.value)])
      .nice()
      .range([h2 - 10, 10]);

    var xScale = d3
      .scaleLinear()
      .domain([
        d3.min(dataset, function(d) {
          return d[0];
        }),
        d3.max(dataset, function(d) {
          return d[0];
        })
        // mindate, maxdate
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
      }); //Set rough # of ticks;
    var yAxis = d3
      .axisLeft(yScale)
      .tickValues([-3, -2, -1, 0, 1, 2, 3, 4])
      .tickFormat(function(n) {
        return n + '%';
      }); //Set rough # of ticks;

      var xAxis = d3
      .axisBottom(xScale)
      .tickValues([2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017])
      .ticks(d3.timeYear())
      .tickFormat(function(n) {
        return n;
      }); //Set rough # of ticks;
    var yAxis = d3
      .axisLeft(yScale)
      .tickValues([-3, -2, -1, 0, 1, 2, 3, 4])
      .tickFormat(function(n) {
        return n + '%';
      }); //Set rough # of ticks;

      var xAxis_bar = d3
      .axisBottom(scale_bar_x)
      .tickValues([2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017])
      .ticks(d3.timeYear())
      .tickFormat(function(n) {
        return n;
      });

      var yAxis_bar = d3
      .axisLeft(scale_bar_y)
      .tickValues([-3, -2, -1, 0, 1, 2, 3, 4])
      .tickFormat(function(n) {
        return n + '%';
      });

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

    svg
      .append('path')
      .datum(dataset)
      .attr('d', line);

    var svg_bar = d3
      .select('body')
      .append('svg')
      .attr('width', w2)
      .attr('height', function(d) {
        return d * 5;
      });

    svg_bar
      .selectAll('rect')
      .data(bar)
      .enter()
      .append('rect')
      .attr('x', function(d, i) {
        return i * (w2 / bar.length);
      })
      .attr('y', function(d) {
        return h2 - d;
      })
      .attr('width', w2 / bar.length - barPadding)
      .attr('height', function(d) {
        return d * 50;
      })
      .attr('fill', 'steelblue');

    svg_bar
      .selectAll('text')
      .data(bar)
      .enter()
      .append('text')
      .text(function(d) {
        return d;
      })
      .attr('x', function(d, i) {
        return i * (w2 / bar.length) + (w2 / bar.length - barPadding) / 2;
      })

      .attr('y', function(d) {
        return (h2 - d * 4 + 20); //15 is now 14
      })
      .attr('font-family', 'sans-serif')
      .attr('font-size', '11px')
      .attr('fill', 'white')
      .attr('text-anchor', 'middle');

    return <div className="gdp">GDP Growth in the USA</div>;
  }
}

export default App;
