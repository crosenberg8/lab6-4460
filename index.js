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
   var width = 1200;

   // Title saying "Transportation Fatalities over Time"
    svg.append('text')
        .attr('x', width/2)
        .attr('y', 50)
        .attr('text-anchor', 'middle')
        .attr('font-size', '30px')
        .text('Transportation Fatalities over Time');
       
    // get the years of the data
    var years = data.map(function (row) {
        return row.Year;
    });

    // create x-scale
    var xscale = d3.scaleBand()
        .domain(years)
        .range([0, width - 150]);

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
    svg.append("text")
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

    /*
    If boolean for trendline is selected (all this logic is within teh filters), then plot trendline. Else, plot the raw data.

    */


    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Total Filter @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    d3.select('#total').on('change', function () {
        this.checked ? displayTotal() : undisplayTotal();
    });

    function displayTotal() {
        var line = d3.line()
        .x(function (d, i) {
            return xscale(year[i]) + 100;
        })
        .y(function (d, i) {
            return yscale(total[i]) + 150;
        });

        svg.append('path')
        .attr('d', line(total))
        .attr('stroke', 'black')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .attr('class', 'total');  
    }
    
    function undisplayTotal() {
        d3.selectAll('.total').remove();
    }

    

    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Car Filter @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    d3.select('#car').on('change', function () {
        this.checked ? displayCar() : undisplayCar();
    });


    function displayCar() {
        var line = d3.line()
        .x(function (d, i) {
            return xscale(year[i]) + 100;
        })
        .y(function (d, i) {
            return yscale(carOccupant[i]) + 150;
        });

        svg.append('path')
        .attr('d', line(carOccupant))
        .attr('stroke', 'red')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .attr('class', 'car');
    }

    function undisplayCar() {
        d3.selectAll('.car').remove();
    }

    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Pedestrian Filter @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    d3.select('#pedestrian').on('change', function () {
        this.checked ? displayPedestrian() : undisplayPedestrian();
    });

    function displayPedestrian() {
        var line = d3.line()
        .x(function (d, i) {
            return xscale(year[i]) + 100;
        })
        .y(function (d, i) {
            return yscale(pedestrian[i]) + 150;
        });

        svg.append('path')
        .attr('d', line(pedestrian))
        .attr('stroke', 'blue')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .attr('class', 'pedestrian');
    }

    function undisplayPedestrian() {
        d3.selectAll('.pedestrian').remove();
    }

    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Motorcycle Filter @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    d3.select('#motorcycle').on('change', function () {
        this.checked ? displayMotorcycle() : undisplayMotorcycle();
    });

    function displayMotorcycle() {
        var line = d3.line()
        .x(function (d, i) {
            return xscale(year[i]) + 100;
        })
        .y(function (d, i) {
            return yscale(motorcycle[i]) + 150;
        });

        svg.append('path')
        .attr('d', line(motorcycle))
        .attr('stroke', 'green')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .attr('class', 'motorcycle');
    }

    function undisplayMotorcycle() {
        d3.selectAll('.motorcycle').remove();
    }

    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Bicycle Filter @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    d3.select('#bicycle').on('change', function () {
        this.checked ? displayBicycle() : undisplayBicycle();
    });

    function displayBicycle() {
        var line = d3.line()
        .x(function (d, i) {
            return xscale(year[i]) + 100;
        })
        .y(function (d, i) {
            return yscale(bicycle[i]) + 150;
        });

        svg.append('path')
        .attr('d', line(bicycle))
        .attr('stroke', 'magenta')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .attr('class', 'bicycle');
    }

    function undisplayBicycle() {
        d3.selectAll('.bicycle').remove();
    }

    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Truck Filter @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    d3.select('#truck').on('change', function () {
        this.checked ? displayTruck() : undisplayTruck();
    });

    function displayTruck() {
        var line = d3.line()
        .x(function (d, i) {
            return xscale(year[i]) + 100;
        })
        .y(function (d, i) {
            return yscale(trucks[i]) + 150;
        });

        svg.append('path')
        .attr('d', line(trucks))
        .attr('stroke', 'orange')
        .attr('stroke-width', 2)
        .attr('fill', 'none')
        .attr('class', 'truck');
    }
    
    function undisplayTruck() {
        d3.selectAll('.truck').remove();
    }

});