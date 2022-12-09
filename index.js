d3.csv('transportData.csv').then(function (data) {
    /*
    1. Get the data into a varaible
    2. Get the years of the data
    3. Get the max and min number of fatalities
    */
    
   

   //select svg
   var svg = d3.select('svg')

   // height and width
   var height = 700;
   var width = 1300;

   // Get the data from the row titles "Year"
    var years = data.map(function (row) {
        return row.Year;
    });

    // create x-scale
    var xscale = d3.scaleBand()
        .domain(years)
        .range([0, width - 300]);

    // create y-scale
    var yscale = d3.scaleLinear()
        .domain([0, 55000])
        .range([height/2 + 100, 0]);

    // create y-axis
    var x_axis = d3.axisBottom()
        .scale(xscale);

    // create y-axis
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
    
    // x-axis label
    svg.append("text")      // text label for the x axis
        .attr("x", width/2)
        .attr("y", height - 50)
        .style("text-anchor", "middle")
        .text("Year");

    //rotate text
    d3.selectAll('g')
        .selectAll('text')
        .attr('transform', 'translate(-10, 0)rotate(-45)')
        .style('text-anchor', 'end');

    // Add the y-axis label
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 20)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Number of Fatalities");

    var year = data.map(function (row) {
        return row.Year;
    });

    var carOccupant = data.map(function (row) {
        return row.Car_Occupant;
    });

    var pedestrian = data.map(function(row) {
        return row.Pedestrian;
    })

    var motorcycle = data.map(function(row) {
        return row.Motorcycle;
    })

    var bicycle = data.map(function(row) {
        return row.Bicycle;
    })

    var trucks = data.map(function(row) {
        return row.Trucks;
    })

    var total = data.map(function(row) {
        return row.Total;
    })
   

    var line = d3.line()
        .x(function (d, i) {
            return xscale(year[i]) + 100;
        })
        .y(function (d, i) {
            return yscale(carOccupant[i]) + 150;
        });

    var line2 = d3.line()
        .x(function (d, i) {
            return xscale(year[i]) + 100;
        })
        .y(function (d, i) {
            return yscale(pedestrian[i]) + 150;
        });

    var line3 = d3.line()
        .x(function (d, i) {
            return xscale(year[i]) + 100;
        })
        .y(function (d, i) {
            return yscale(motorcycle[i]) + 150;
        });

    var line4 = d3.line()
        .x(function (d, i) {
            return xscale(year[i]) + 100;
        })
        .y(function (d, i) {
            return yscale(bicycle[i]) + 150;
        });

    var line5 = d3.line()
        .x(function (d, i) {
            return xscale(year[i]) + 100;
        })
        .y(function (d, i) {
            return yscale(trucks[i]) + 150;
        });

    var line6 = d3.line()
        .x(function (d, i) {
            return xscale(year[i]) + 100;
        })
        .y(function (d, i) {
            return yscale(total[i]) + 150;
        });


    svg.append('path')
        .attr('d', line(carOccupant))
        .attr('stroke', 'red')
        .attr('stroke-width', 2)
        .attr('fill', 'none');

    svg.append('path')
        .attr('d', line2(pedestrian))
        .attr('stroke', 'blue')
        .attr('stroke-width', 2)
        .attr('fill', 'none');

    svg.append('path')
        .attr('d', line3(motorcycle))
        .attr('stroke', 'green')
        .attr('stroke-width', 2)
        .attr('fill', 'none');

    svg.append('path')
        .attr('d', line4(bicycle))
        .attr('stroke', 'magenta')
        .attr('stroke-width', 2)
        .attr('fill', 'none');

    svg.append('path')
        .attr('d', line5(trucks))
        .attr('stroke', 'orange')
        .attr('stroke-width', 2)
        .attr('fill', 'none');

    svg.append('path')
        .attr('d', line6(total))
        .attr('stroke', 'black')
        .attr('stroke-width', 2)
        .attr('fill', 'none');   






});