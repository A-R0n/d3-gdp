# USA GDP from 2007 - 2017
A scatterplot and an interactive bar graph displaying GDP in the United States using D3.js in a React application. 

### Prerequisites
$ npm install --save d3

### Summary
1. Create an svg element in index.html with d3 select('name_of_div') to return the first matching element.
2. .append('g') will apply padding to the svg.
3. .attr() will style the element.
4. .data(dataset) will loop through the data values in a variable called 'dataset'. It is up to you what to name this variable. The code is executed one time for every index in the dataset.
5. .enter() will create a reference to a placeholder that will look at the DOM and compare it with the new elements being appended.
6. .append('circle') will create an svg circle for every item in the dataset. These will be the points that make up the scatterplot.
7. .text('quantity') will make a label called 'quantity'. Put this on the x-axis scale with .attr('x', w / 1.2) and .attr('y', 285).
8. Create the axes with .axisBottom() for the x-axis and .axisLeft() for the y-axis. To scale them, I recommend using the .scaleLinear() for both axes on the scatterplot and .scaleBand() specifically for the x-axis on the bar graph. This one is nice because it adjusts to the width of the rectangle (that is made with .append('rect'). Specify the domain and range for each method using javascript min and max math methods in case the data changes for whatever reason. Note: To scale the y-axis with range, your first argument will be the height of the element and your second argument will be 0 because it's the origin of the element is the upper left-hand corner (0, 0).
9. The interactivity with the bar graph is made possible through the mouseenter and mouseleave functions with d3.select(this). When the mouse hovers over a bar, the opacity of it changes relative to the others  and a horizontal line appears at its max (CSS). The divergence between the other bars is measured by subtracting its y value to all the other y values, which is displayed on each bar with .text().


### Authors
Aaron Estes

### Acknowledgments
Máté Huszárik
