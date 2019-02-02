import React, { Component } from 'react';
import * as d3 from 'd3';
import { select } from 'd3';
import './App.css';
import Bar from './Components/Bar';

class App extends Component {
  constructor() {
    super();
  }

  // listener = () => {
  //   d3.select(this).attr()
  // }

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
    var padding = 60;
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

    const margin2 = 60;
    const width2 = 1000 - 2 * margin2;
    const height2 = 600 - 2 * margin2;

    const svg = d3.select('#area2').append('svg');
    const chart = svg
      .append('g')
      .attr('transform', `translate(${margin2}, ${margin2})`);

    const xScale_2 = d3
      .scaleBand()
      .range([0, width2])
      .domain(growth.map(s => s.year))
      .padding(0.2);

    const yScale_2 = d3
      .scaleLinear()
      .range([height2, 0])
      .domain([14, 20]);

    chart.append('g').call(d3.axisLeft(yScale_2));
    chart
      .append('g')
      .attr('transform', `translate(0, ${height2})`)
      .call(d3.axisBottom(xScale_2));

    const barGroups = chart
      .selectAll('svg')
      .data(growth)
      .enter()
      .append('g');
    barGroups
      .append('rect')
      .attr('class', 'bar')
      .attr('x', function(d) {
        return xScale_2(d.year);
      })
      .attr('y', function(d) {
        return yScale_2(d.gdp);
      })
      .attr('height', s => height2 - yScale_2(s.gdp))
      .attr('width', xScale_2.bandwidth())

      // ENTERING
      .on('mouseenter', function(actual, i) {
        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 0.6)
          .attr('x', a => xScale_2(a.year) - 5)
          .attr('width', xScale_2.bandwidth() + 10);

        const y = yScale_2(actual.gdp);
        var line = chart
          .append('line')
          .attr('id', 'limit')
          .attr('x1', 0)
          .attr('y1', y)
          .attr('x2', width2)
          .attr('y2', y);

        barGroups
          .append('text')
          .attr('class', 'divergence')
          .attr('x', a => xScale_2(a.year) + xScale_2.bandwidth() / 2)
          .attr('y', a => yScale_2(a.gdp) + 30)
          .attr('fill', 'white')
          .attr('text-anchor', 'middle')
          .text((a, idx) => {
            const divergence = (a.gdp - actual.gdp).toFixed(1);

            let text = '';
            if (divergence > 0) text += '+';
            text += `${divergence}%`;

            return idx !== i ? text : '';
          });
      })

      // LEAVING
      .on('mouseleave', function() {
        d3.selectAll('.value').attr('opacity', 1);

        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 1)
          .attr('x', a => xScale_2(a.year))
          .attr('width', xScale_2.bandwidth());

        chart.selectAll('#limit').remove();
        chart.selectAll('.divergence').remove();
      });

    chart
      .append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0, ${height2})`)
      .call(
        d3
          .axisBottom()
          .scale(xScale_2)
          .tickSize(-height2, 0, 0)
          .tickFormat('')
      );

    chart
      .append('g')
      .attr('class', 'grid')
      .call(
        d3
          .axisLeft()
          .scale(yScale_2)
          .tickSize(-width2, 0, 0)
          .tickFormat('')
      );

    svg
      .append('text')
      .attr('x', -(height2 / 2) - margin2)
      .attr('y', margin2 / 2.4)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('GDP')
      .attr('fill','white');;

    svg
      .append('text')
      .attr('x', width2 / 2 + margin2)
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .text('Gross Domestic Product in the USA - 10 years')
      .attr('fill','white');

    svg
      .append('text')
      .attr('x', width2 / 2 + margin2)
      .attr('y', 580)
      .attr('text-anchor', 'middle')
      .text('Year')
      .attr('fill','white');

    return <div className="gdp" />;
  }
}

export default App;