d3.csv('transportData.csv').then(function (data) {
    /*
    1. Get the data into a varaible
    2. Get the years of the data
    3. Get the max and min number of fatalities

    */
   // height and width
   var height = 700;
   var width = 1300;

   // Get the data from the row titles "Year"
    var years = data.map(function (row) {
        return row.Year;
    });

    //create x-scale
    var xscale = d3.scaleBand()
        .domain(years)
        .range([0, width - 300]);

    //create y-scale
    var yscale = d3.scaleLinear()
    .domain([0, 36000])
    .range([height/2 + 100, 0]);

    //create y-axis
    var x_axis = d3.axisBottom()
        .scale(xscale);

    //create y-axis
    var y_axis = d3.axisLeft()
        .scale(yscale);

    // Add the x axis to the svg
    d3.select('svg')
        .append('g')
        .attr('transform', 'translate(100, 600)')
        .call(x_axis);

    // Add the y axis to the svg
    d3.select('svg')
        .append('g')
        .attr('transform', 'translate(100, 150)')
        .call(y_axis);
    
    d3.selectAll('text')
        .attr('transform', 'translate(-10, 0)rotate(-45)')
        .style('text-anchor', 'end');
});